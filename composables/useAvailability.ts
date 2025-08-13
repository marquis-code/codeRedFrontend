import { ref, computed, onUnmounted } from "vue"
import type { MedicalFacility } from "./useGoogleMaps"

export type AvailabilityStatus = "available" | "busy" | "emergency-only" | "closed" | "unknown"

export interface AvailabilityData {
  status: AvailabilityStatus
  waitTime?: number // in minutes
  capacity?: {
    current: number
    maximum: number
    percentage: number
  }
  emergencyStatus?: {
    isEmergencyRoom: boolean
    emergencyWaitTime?: number
    traumaLevel?: 1 | 2 | 3 | 4
  }
  lastUpdated: number
  nextUpdate?: number
  confidence: number // 0-1, how reliable this data is
}

export interface AvailabilityPattern {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  hour: number // 0-23
  typicalStatus: AvailabilityStatus
  typicalWaitTime: number
  confidence: number
}

export const useAvailability = () => {
  const availabilityData = ref<Map<string, AvailabilityData>>(new Map())
  const availabilityPatterns = ref<Map<string, AvailabilityPattern[]>>(new Map())
  const isUpdating = ref(false)
  const lastGlobalUpdate = ref<number>(0)
  const updateInterval = ref<NodeJS.Timeout | null>(null)

  // Simulated real-time availability factors
  const getTimeBasedFactor = (): number => {
    const now = new Date()
    const hour = now.getHours()
    const dayOfWeek = now.getDay()

    // Peak hours: 8-10 AM, 2-4 PM, 6-8 PM
    const isPeakHour = (hour >= 8 && hour <= 10) || (hour >= 14 && hour <= 16) || (hour >= 18 && hour <= 20)

    // Weekend factor
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Night factor (10 PM - 6 AM)
    const isNight = hour >= 22 || hour <= 6

    let factor = 0.5 // Base factor

    if (isPeakHour) factor += 0.3
    if (isWeekend) factor += 0.1
    if (isNight) factor -= 0.2

    return Math.max(0.1, Math.min(0.9, factor))
  }

  const getSeasonalFactor = (): number => {
    const now = new Date()
    const month = now.getMonth()

    // Flu season (October - March)
    const isFluSeason = month >= 9 || month <= 2

    // Summer (June - August) - typically less busy
    const isSummer = month >= 5 && month <= 7

    let factor = 0.5

    if (isFluSeason) factor += 0.2
    if (isSummer) factor -= 0.1

    return Math.max(0.2, Math.min(0.8, factor))
  }

  const getWeatherFactor = (): number => {
    // In a real app, this would use weather API
    // Simulating weather impact on medical facility usage
    const weatherConditions = ["clear", "rainy", "stormy", "snowy", "extreme"]
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]

    switch (randomWeather) {
      case "stormy":
      case "extreme":
        return 0.8 // More accidents, higher usage
      case "snowy":
        return 0.7 // Accidents and cold-related issues
      case "rainy":
        return 0.6 // Some accidents
      default:
        return 0.5 // Normal conditions
    }
  }

  const calculateAvailability = (facility: MedicalFacility): AvailabilityData => {
    const now = Date.now()
    const timeFactor = getTimeBasedFactor()
    const seasonalFactor = getSeasonalFactor()
    const weatherFactor = getWeatherFactor()

    // Facility type factor
    const isHospital = facility.types.includes("hospital")
    const isEmergencyRoom = facility.types.includes("hospital") && facility.name.toLowerCase().includes("emergency")
    const isUrgentCare =
      facility.name.toLowerCase().includes("urgent") || facility.name.toLowerCase().includes("clinic")

    let facilityFactor = 0.5
    if (isHospital) facilityFactor += 0.2
    if (isEmergencyRoom) facilityFactor += 0.3
    if (isUrgentCare) facilityFactor -= 0.1

    // Combine all factors
    const combinedFactor = (timeFactor + seasonalFactor + weatherFactor + facilityFactor) / 4

    // Add some randomness for realism
    const randomFactor = 0.8 + Math.random() * 0.4 // 0.8 - 1.2
    const finalFactor = combinedFactor * randomFactor

    // Determine status based on final factor
    let status: AvailabilityStatus
    let waitTime = 0
    let capacity = { current: 0, maximum: 100, percentage: 0 }

    if (finalFactor < 0.3) {
      status = "available"
      waitTime = Math.floor(Math.random() * 15) + 5 // 5-20 minutes
      capacity = {
        current: Math.floor(Math.random() * 30) + 10,
        maximum: 100,
        percentage: Math.floor(Math.random() * 30) + 10,
      }
    } else if (finalFactor < 0.6) {
      status = "busy"
      waitTime = Math.floor(Math.random() * 45) + 30 // 30-75 minutes
      capacity = {
        current: Math.floor(Math.random() * 30) + 60,
        maximum: 100,
        percentage: Math.floor(Math.random() * 30) + 60,
      }
    } else if (finalFactor < 0.8) {
      status = "emergency-only"
      waitTime = Math.floor(Math.random() * 120) + 60 // 1-3 hours
      capacity = {
        current: Math.floor(Math.random() * 15) + 85,
        maximum: 100,
        percentage: Math.floor(Math.random() * 15) + 85,
      }
    } else {
      // Very rare - facility temporarily closed
      status = Math.random() > 0.95 ? "closed" : "busy"
      waitTime = status === "closed" ? 0 : Math.floor(Math.random() * 180) + 120 // 2-5 hours
      capacity = {
        current: status === "closed" ? 0 : Math.floor(Math.random() * 10) + 90,
        maximum: 100,
        percentage: status === "closed" ? 0 : Math.floor(Math.random() * 10) + 90,
      }
    }

    const emergencyStatus = isEmergencyRoom
      ? {
          isEmergencyRoom: true,
          emergencyWaitTime: Math.floor(Math.random() * 60) + 15, // 15-75 minutes
          traumaLevel: (Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4,
        }
      : undefined

    return {
      status,
      waitTime,
      capacity,
      emergencyStatus,
      lastUpdated: now,
      nextUpdate: now + (5 + Math.random() * 10) * 60 * 1000, // 5-15 minutes
      confidence: 0.7 + Math.random() * 0.3, // 0.7-1.0
    }
  }

  const updateFacilityAvailability = (facility: MedicalFacility): AvailabilityData => {
    const availability = calculateAvailability(facility)
    availabilityData.value.set(facility.id, availability)
    return availability
  }

  const getFacilityAvailability = (facilityId: string): AvailabilityData | null => {
    return availabilityData.value.get(facilityId) || null
  }

  const updateAllAvailabilities = (facilities: MedicalFacility[]) => {
    isUpdating.value = true

    facilities.forEach((facility) => {
      updateFacilityAvailability(facility)
    })

    lastGlobalUpdate.value = Date.now()
    isUpdating.value = false
  }

  const getAvailabilityColor = (status: AvailabilityStatus): string => {
    switch (status) {
      case "available":
        return "text-emerald-600"
      case "busy":
        return "text-yellow-600"
      case "emergency-only":
        return "text-orange-600"
      case "closed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getAvailabilityBadgeClass = (status: AvailabilityStatus): string => {
    switch (status) {
      case "available":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "busy":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "emergency-only":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "closed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAvailabilityIcon = (status: AvailabilityStatus): string => {
    switch (status) {
      case "available":
        return "✅"
      case "busy":
        return "🟡"
      case "emergency-only":
        return "🚨"
      case "closed":
        return "🔴"
      default:
        return "❓"
    }
  }

  const getWaitTimeText = (waitTime?: number): string => {
    if (!waitTime || waitTime === 0) return "No wait"
    if (waitTime < 60) return `${waitTime} min wait`
    const hours = Math.floor(waitTime / 60)
    const minutes = waitTime % 60
    return minutes > 0 ? `${hours}h ${minutes}m wait` : `${hours}h wait`
  }

  const getCapacityText = (capacity?: AvailabilityData["capacity"]): string => {
    if (!capacity) return "Capacity unknown"
    if (capacity.percentage < 50) return "Low capacity"
    if (capacity.percentage < 80) return "Moderate capacity"
    return "High capacity"
  }

  const isDataStale = (availability: AvailabilityData): boolean => {
    const now = Date.now()
    const maxAge = 15 * 60 * 1000 // 15 minutes
    return now - availability.lastUpdated > maxAge
  }

  const shouldUpdate = (availability: AvailabilityData): boolean => {
    const now = Date.now()
    return availability.nextUpdate ? now >= availability.nextUpdate : isDataStale(availability)
  }

  // Start real-time updates
  const startRealTimeUpdates = (facilities: MedicalFacility[]) => {
    if (updateInterval.value) return

    updateInterval.value = setInterval(() => {
      facilities.forEach((facility) => {
        const current = availabilityData.value.get(facility.id)
        if (!current || shouldUpdate(current)) {
          updateFacilityAvailability(facility)
        }
      })
    }, 30000) // Update every 30 seconds
  }

  const stopRealTimeUpdates = () => {
    if (updateInterval.value) {
      clearInterval(updateInterval.value)
      updateInterval.value = null
    }
  }

  // Generate historical patterns (simulated)
  const generateAvailabilityPatterns = (facility: MedicalFacility): AvailabilityPattern[] => {
    const patterns: AvailabilityPattern[] = []

    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        const isWeekend = day === 0 || day === 6
        const isPeakHour = (hour >= 8 && hour <= 10) || (hour >= 14 && hour <= 16) || (hour >= 18 && hour <= 20)
        const isNight = hour >= 22 || hour <= 6

        let typicalStatus: AvailabilityStatus = "available"
        let typicalWaitTime = 15

        if (isNight && !facility.types.includes("hospital")) {
          typicalStatus = "closed"
          typicalWaitTime = 0
        } else if (isPeakHour) {
          typicalStatus = "busy"
          typicalWaitTime = 45
        } else if (isWeekend) {
          typicalStatus = Math.random() > 0.6 ? "busy" : "available"
          typicalWaitTime = typicalStatus === "busy" ? 30 : 20
        }

        patterns.push({
          dayOfWeek: day,
          hour,
          typicalStatus,
          typicalWaitTime,
          confidence: 0.8 + Math.random() * 0.2,
        })
      }
    }

    availabilityPatterns.value.set(facility.id, patterns)
    return patterns
  }

  // Computed properties
  const availableFacilities = computed(() => {
    const available: string[] = []
    availabilityData.value.forEach((data, id) => {
      if (data.status === "available") {
        available.push(id)
      }
    })
    return available
  })

  const emergencyFacilities = computed(() => {
    const emergency: string[] = []
    availabilityData.value.forEach((data, id) => {
      if (data.emergencyStatus?.isEmergencyRoom) {
        emergency.push(id)
      }
    })
    return emergency
  })

  const averageWaitTime = computed(() => {
    let totalWait = 0
    let count = 0

    availabilityData.value.forEach((data) => {
      if (data.waitTime && data.status !== "closed") {
        totalWait += data.waitTime
        count++
      }
    })

    return count > 0 ? Math.round(totalWait / count) : 0
  })

  // Cleanup on unmount
  onUnmounted(() => {
    stopRealTimeUpdates()
  })

  return {
    // State
    availabilityData,
    availabilityPatterns,
    isUpdating,
    lastGlobalUpdate,

    // Computed
    availableFacilities,
    emergencyFacilities,
    averageWaitTime,

    // Methods
    updateFacilityAvailability,
    getFacilityAvailability,
    updateAllAvailabilities,
    getAvailabilityColor,
    getAvailabilityBadgeClass,
    getAvailabilityIcon,
    getWaitTimeText,
    getCapacityText,
    isDataStale,
    shouldUpdate,
    startRealTimeUpdates,
    stopRealTimeUpdates,
    generateAvailabilityPatterns,
  }
}
