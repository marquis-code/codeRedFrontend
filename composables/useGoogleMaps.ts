import { ref } from "vue"
import { Loader } from "@googlemaps/js-api-loader"
import { useRuntimeConfig } from "#app" // Import useRuntimeConfig
import { useAvailability } from "@/composables/useAvailability" // Import availability system

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

export const useGoogleMaps = () => {
  const config = useRuntimeConfig()
  const map = ref(null)
  const mapElement = ref(null)
  const isLoaded = ref(false)
  const facilities = ref([])
  const selectedFacility = ref(null)
  const userLocation = ref(null)
  const markers = ref([])
  const google = window.google // Declare google variable

  const { updateFacilityAvailability, getFacilityAvailability, startRealTimeUpdates } = useAvailability()

  const loader = new Loader({
    apiKey: config.public.googleMapsKey as string,
    version: "weekly",
    libraries: ["places", "geometry"],
  })

  const initializeMap = async (element, center) => {
    try {
      await loader.load()

      map.value = new google.maps.Map(element, {
        center,
        zoom: 14,
        styles: [
          {
            featureType: "poi.medical",
            elementType: "geometry",
            stylers: [{ color: "#10b981" }],
          },
          {
            featureType: "poi.medical",
            elementType: "labels.text.fill",
            stylers: [{ color: "#065f46" }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      })

      // Add user location marker
      new google.maps.Marker({
        position: center,
        map: map.value,
        title: "Your Location",
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 12),
        },
      })

      userLocation.value = center
      isLoaded.value = true

      // Search for medical facilities
      await searchMedicalFacilities(center)
    } catch (error) {
      console.error("Error initializing map:", error)
    }
  }

  const searchMedicalFacilities = async (location) => {
    if (!map.value) return

    const service = new google.maps.places.PlacesService(map.value)

    const request = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: 5000, // 5km radius
      type: "hospital" as any, // Cast to any to avoid type error
      keyword: "medical clinic hospital emergency",
    }

    return new Promise<void>((resolve) => {
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const medicalFacilities = results.slice(0, 15).map((place, index) => {
            // Calculate distance
            const distance =
              google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(location.lat, location.lng),
                place.geometry!.location!,
              ) / 1000 // Convert to km

            const facility = {
              id: place.place_id || `facility-${index}`,
              name: place.name || "Medical Facility",
              address: place.vicinity || "Address not available",
              location: {
                lat: place.geometry!.location!.lat(),
                lng: place.geometry!.location!.lng(),
              },
              rating: place.rating || 0,
              types: place.types || [],
              photos: place.photos?.slice(0, 3).map((photo) => photo.getUrl({ maxWidth: 400, maxHeight: 300 })),
              phoneNumber: place.formatted_phone_number,
              website: place.website,
              openingHours: place.opening_hours?.weekday_text,
              distance: Math.round(distance * 10) / 10,
              placeId: place.place_id || "",
            }

            updateFacilityAvailability(facility)

            return facility
          })

          facilities.value = medicalFacilities.sort((a, b) => (a.distance || 0) - (b.distance || 0))

          startRealTimeUpdates(medicalFacilities)

          addMarkersToMap(medicalFacilities)
        }
        resolve()
      })
    })
  }

  const addMarkersToMap = (facilities) => {
    if (!map.value) return

    markers.value.forEach((marker) => marker.setMap(null))
    markers.value = []

    facilities.forEach((facility) => {
      const availability = getFacilityAvailability(facility.id)
      const status = availability?.status || "unknown"

      const marker = new google.maps.Marker({
        position: facility.location,
        map: map.value,
        title: facility.name,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="${
                status === "available"
                  ? "#10b981"
                  : status === "busy"
                    ? "#f59e0b"
                    : status === "emergency-only"
                      ? "#f97316"
                      : status === "closed"
                        ? "#ef4444"
                        : "#6b7280"
              }" stroke="#ffffff" stroke-width="2"/>
              <path d="M16 8v8m0 0v8m0-8h8m-8 0H8" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16),
        },
      })

      marker.addListener("click", () => {
        selectedFacility.value = facility
        map.value?.panTo(facility.location)
        map.value?.setZoom(16)
      })

      markers.value.push(marker)
    })
  }

  const selectFacility = (facility) => {
    selectedFacility.value = facility
    if (map.value) {
      map.value.panTo(facility.location)
      map.value.setZoom(16)
    }
  }

  const clearSelection = () => {
    selectedFacility.value = null
    if (map.value && userLocation.value) {
      map.value.panTo(userLocation.value)
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
