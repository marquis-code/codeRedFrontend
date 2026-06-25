import { ref } from "vue"
import mapboxgl from "mapbox-gl"
import { useRuntimeConfig } from "#app"
import { useAvailability } from "@/composables/useAvailability"

export interface MedicalFacility {
  id: string
  name: string
  address: string
  location: {
    lat: number
    lng: number
  }
  rating: number
  types: string[]
  photos?: string[]
  phoneNumber?: string
  website?: string
  openingHours?: string[]
  availability: "available" | "busy" | "emergency-only" | "closed" | "unknown"
  distance?: number
  placeId: string
}

export const useMapbox = () => {
  const config = useRuntimeConfig()
  const map = ref<mapboxgl.Map | null>(null)
  const mapElement = ref<HTMLElement | null>(null)
  const isLoaded = ref(false)
  const facilities = ref<MedicalFacility[]>([])
  const selectedFacility = ref<MedicalFacility | null>(null)
  const userLocation = ref<{lat: number, lng: number} | null>(null)
  const markers = ref<mapboxgl.Marker[]>([])

  const { updateFacilityAvailability, getFacilityAvailability, startRealTimeUpdates } = useAvailability()

  const initializeMap = async (element: HTMLElement, center: {lat: number, lng: number}) => {
    try {
      mapboxgl.accessToken = config.public.mapboxAccessToken as string

      map.value = new mapboxgl.Map({
        container: element,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [center.lng, center.lat],
        zoom: 14,
      })

      // Add user location marker
      const el = document.createElement('div')
      el.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" fill="#ffffff"/>
        </svg>
      `
      
      new mapboxgl.Marker(el)
        .setLngLat([center.lng, center.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText('Your Location'))
        .addTo(map.value)

      userLocation.value = center
      isLoaded.value = true

      // Search for medical facilities
      await searchMedicalFacilities(center)
    } catch (error) {
      console.error("Error initializing map:", error)
    }
  }

  // Haversine formula to calculate distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  const searchMedicalFacilities = async (location: {lat: number, lng: number}) => {
    if (!map.value) return

    try {
      // Use Mapbox Geocoding API for hospital search
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?country=ng&proximity=${location.lng},${location.lat}&access_token=${config.public.mapboxAccessToken}`)
      const data = await response.json()

      if (data && data.features) {
        const medicalFacilities = data.features.map((place: any, index: number) => {
          const lat = place.center[1]
          const lng = place.center[0]
          const distance = calculateDistance(location.lat, location.lng, lat, lng)

          const facility: MedicalFacility = {
            id: place.id || `facility-${index}`,
            name: place.text || "Medical Facility",
            address: place.place_name || "Address not available",
            location: { lat, lng },
            rating: 0, // Mapbox doesn't provide rating directly in geocoding
            types: place.place_type || [],
            availability: "unknown",
            distance: Math.round(distance * 10) / 10,
            placeId: place.id || "",
          }

          updateFacilityAvailability(facility)
          return facility
        })

        facilities.value = medicalFacilities.sort((a, b) => (a.distance || 0) - (b.distance || 0))
        startRealTimeUpdates(medicalFacilities)
        addMarkersToMap(medicalFacilities)
      }
    } catch (error) {
      console.error("Error searching medical facilities:", error)
    }
  }

  const addMarkersToMap = (facilitiesList: MedicalFacility[]) => {
    if (!map.value) return

    markers.value.forEach((marker) => marker.remove())
    markers.value = []

    facilitiesList.forEach((facility) => {
      const availability = getFacilityAvailability(facility.id)
      const status = availability?.status || "unknown"

      const color = status === "available"
                  ? "#10b981"
                  : status === "busy"
                    ? "#f59e0b"
                    : status === "emergency-only"
                      ? "#f97316"
                      : status === "closed"
                        ? "#ef4444"
                        : "#6b7280"

      const el = document.createElement('div')
      el.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="${color}" stroke="#ffffff" stroke-width="2"/>
          <path d="M16 8v8m0 0v8m0-8h8m-8 0H8" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `

      const marker = new mapboxgl.Marker(el)
        .setLngLat([facility.location.lng, facility.location.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(facility.name))
        .addTo(map.value!)

      el.addEventListener("click", () => {
        selectedFacility.value = facility
        map.value?.panTo([facility.location.lng, facility.location.lat])
        map.value?.setZoom(16)
      })

      markers.value.push(marker)
    })
  }

  const selectFacility = (facility: MedicalFacility) => {
    selectedFacility.value = facility
    if (map.value) {
      map.value.panTo([facility.location.lng, facility.location.lat])
      map.value.setZoom(16)
    }
  }

  const clearSelection = () => {
    selectedFacility.value = null
    if (map.value && userLocation.value) {
      map.value.panTo([userLocation.value.lng, userLocation.value.lat])
      map.value.setZoom(14)
    }
  }

  return {
    map,
    mapElement,
    isLoaded,
    facilities,
    selectedFacility,
    userLocation,
    initializeMap,
    searchMedicalFacilities,
    selectFacility,
    clearSelection,
    getFacilityAvailability,
  }
}
