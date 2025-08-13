import { ref, computed } from "vue"
import { useRuntimeConfig } from "#app"

export interface LocationData {
  lat: number
  lng: number
  accuracy?: number
  timestamp?: number
  address?: string
  city?: string
  country?: string
}

export interface LocationPermission {
  state: "granted" | "denied" | "prompt" | "unknown"
  canRequest: boolean
}

export const useGeolocation = () => {
  const config = useRuntimeConfig()
  const location = ref<LocationData | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  const permission = ref<LocationPermission>({ state: "unknown", canRequest: true })
  const watchId = ref<number | null>(null)
  const locationHistory = ref<LocationData[]>([])
  const isTracking = ref(false)

  // Computed properties
  const hasLocation = computed(() => location.value !== null)
  const locationAccuracy = computed(() => {
    if (!location.value?.accuracy) return "unknown"
    if (location.value.accuracy <= 10) return "high"
    if (location.value.accuracy <= 50) return "medium"
    return "low"
  })

  const locationAge = computed(() => {
    if (!location.value?.timestamp) return null
    const ageMs = Date.now() - location.value.timestamp
    const ageMinutes = Math.floor(ageMs / 60000)
    if (ageMinutes < 1) return "just now"
    if (ageMinutes < 60) return `${ageMinutes}m ago`
    const ageHours = Math.floor(ageMinutes / 60)
    return `${ageHours}h ago`
  })

  // Check permission status
  const checkPermission = async (): Promise<LocationPermission> => {
    if (!navigator.permissions) {
      permission.value = { state: "unknown", canRequest: true }
      return permission.value
    }

    try {
      const result = await navigator.permissions.query({ name: "geolocation" as PermissionName })
      permission.value = {
        state: result.state as "granted" | "denied" | "prompt",
        canRequest: result.state !== "denied",
      }

      // Listen for permission changes
      result.addEventListener("change", () => {
        permission.value.state = result.state as "granted" | "denied" | "prompt"
        permission.value.canRequest = result.state !== "denied"
      })

      return permission.value
    } catch (err) {
      permission.value = { state: "unknown", canRequest: true }
      return permission.value
    }
  }

  // Geocode coordinates to address
  const geocodeLocation = async (lat: number, lng: number): Promise<Partial<LocationData>> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.public.googleGeocodeKey}`,
      )
      const data = await response.json()

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0]
        const addressComponents = result.address_components

        const getComponent = (types: string[]) => {
          const component = addressComponents.find((comp: any) =>
            comp.types.some((type: string) => types.includes(type)),
          )
          return component?.long_name || ""
        }

        return {
          address: result.formatted_address,
          city: getComponent(["locality", "administrative_area_level_2"]),
          country: getComponent(["country"]),
        }
      }
    } catch (err) {
      console.warn("Geocoding failed:", err)
    }
    return {}
  }

  // Get current location with enhanced options
  const getCurrentLocation = async (
    options: {
      enableHighAccuracy?: boolean
      timeout?: number
      maximumAge?: number
      includeAddress?: boolean
    } = {},
  ): Promise<LocationData> => {
    const {
      enableHighAccuracy = true,
      timeout = 15000,
      maximumAge = 300000, // 5 minutes
      includeAddress = true,
    } = options

    return new Promise(async (resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMsg = "Geolocation is not supported by this browser"
        error.value = errorMsg
        reject(new Error(errorMsg))
        return
      }

      // Check permission first
      await checkPermission()

      isLoading.value = true
      error.value = null

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const coords: LocationData = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: Date.now(),
            }

            // Geocode if requested
            if (includeAddress) {
              const addressData = await geocodeLocation(coords.lat, coords.lng)
              Object.assign(coords, addressData)
            }

            location.value = coords

            // Add to history
            locationHistory.value.unshift(coords)
            if (locationHistory.value.length > 10) {
              locationHistory.value = locationHistory.value.slice(0, 10)
            }

            isLoading.value = false
            resolve(coords)
          } catch (err) {
            isLoading.value = false
            const errorMsg = "Failed to process location data"
            error.value = errorMsg
            reject(new Error(errorMsg))
          }
        },
        (err) => {
          let errorMessage = "Unable to retrieve your location"

          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = "Location access denied. Please enable location permissions in your browser settings."
              permission.value.state = "denied"
              permission.value.canRequest = false
              break
            case err.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable. Please check your GPS or internet connection."
              break
            case err.TIMEOUT:
              errorMessage = "Location request timed out. Please try again."
              break
          }

          error.value = errorMessage
          isLoading.value = false
          reject(new Error(errorMessage))
        },
        {
          enableHighAccuracy,
          timeout,
          maximumAge,
        },
      )
    })
  }

  // Start continuous location tracking
  const startTracking = async (
    options: {
      enableHighAccuracy?: boolean
      timeout?: number
      maximumAge?: number
      includeAddress?: boolean
      interval?: number
    } = {},
  ) => {
    if (isTracking.value) return

    const {
      enableHighAccuracy = true,
      timeout = 10000,
      maximumAge = 60000, // 1 minute for tracking
      includeAddress = false,
      interval = 30000, // Update every 30 seconds
    } = options

    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported")
    }

    isTracking.value = true
    error.value = null

    watchId.value = navigator.geolocation.watchPosition(
      async (position) => {
        try {
          const coords: LocationData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now(),
          }

          if (includeAddress) {
            const addressData = await geocodeLocation(coords.lat, coords.lng)
            Object.assign(coords, addressData)
          }

          location.value = coords

          // Add to history
          locationHistory.value.unshift(coords)
          if (locationHistory.value.length > 50) {
            locationHistory.value = locationHistory.value.slice(0, 50)
          }
        } catch (err) {
          console.warn("Failed to process tracked location:", err)
        }
      },
      (err) => {
        console.warn("Location tracking error:", err)
        error.value = `Tracking error: ${err.message}`
      },
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
      },
    )
  }

  // Stop location tracking
  const stopTracking = () => {
    if (watchId.value !== null) {
      navigator.geolocation.clearWatch(watchId.value)
      watchId.value = null
    }
    isTracking.value = false
  }

  // Calculate distance between two points
  const calculateDistance = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = toRadians(point2.lat - point1.lat)
    const dLng = toRadians(point2.lng - point1.lng)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(point1.lat)) * Math.cos(toRadians(point2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180)
  }

  // Set location manually (for testing or user input)
  const setManualLocation = async (lat: number, lng: number, includeAddress = true) => {
    isLoading.value = true
    error.value = null

    try {
      const coords: LocationData = {
        lat,
        lng,
        timestamp: Date.now(),
      }

      if (includeAddress) {
        const addressData = await geocodeLocation(lat, lng)
        Object.assign(coords, addressData)
      }

      location.value = coords
      locationHistory.value.unshift(coords)

      isLoading.value = false
      return coords
    } catch (err) {
      isLoading.value = false
      error.value = "Failed to set manual location"
      throw err
    }
  }

  // Get location from address (geocoding)
  const getLocationFromAddress = async (address: string): Promise<LocationData> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${config.public.googleGeocodeKey}`,
      )
      const data = await response.json()

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0]
        const coords: LocationData = {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          address: result.formatted_address,
          timestamp: Date.now(),
        }

        location.value = coords
        locationHistory.value.unshift(coords)

        return coords
      } else {
        throw new Error("Address not found")
      }
    } catch (err) {
      error.value = "Failed to find location for address"
      throw err
    }
  }

  // Clear location data
  const clearLocation = () => {
    location.value = null
    error.value = null
    stopTracking()
  }

  // Clear location history
  const clearHistory = () => {
    locationHistory.value = []
  }

  return {
    // State
    location,
    error,
    isLoading,
    permission,
    isTracking,
    locationHistory,

    // Computed
    hasLocation,
    locationAccuracy,
    locationAge,

    // Methods
    getCurrentLocation,
    checkPermission,
    startTracking,
    stopTracking,
    calculateDistance,
    setManualLocation,
    getLocationFromAddress,
    geocodeLocation,
    clearLocation,
    clearHistory,
  }
}
