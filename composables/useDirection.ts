import { ref, computed } from "vue"
import { useRuntimeConfig } from "#app"
import type { MedicalFacility } from "./useGoogleMaps"
import type { LocationData } from "./useGeolocation"
import { google } from "googlemaps"

export interface DirectionStep {
  instruction: string
  distance: string
  duration: string
  maneuver?: string
  startLocation: { lat: number; lng: number }
  endLocation: { lat: number; lng: number }
}

export interface RouteInfo {
  distance: string
  duration: string
  durationInTraffic?: string
  steps: DirectionStep[]
  overview_polyline: string
  warnings?: string[]
  copyrights?: string
}

export interface DirectionsResult {
  routes: RouteInfo[]
  status: string
  origin: { lat: number; lng: number }
  destination: { lat: number; lng: number }
  travelMode: google.maps.TravelMode
}

export const useDirections = () => {
  const config = useRuntimeConfig()
  const directionsService = ref<google.maps.DirectionsService | null>(null)
  const directionsRenderer = ref<google.maps.DirectionsRenderer | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentDirections = ref<DirectionsResult | null>(null)
  const selectedRouteIndex = ref(0)
  const travelMode = ref<google.maps.TravelMode>(google.maps.TravelMode.DRIVING)

  // Initialize directions service
  const initializeDirections = () => {
    if (window.google && window.google.maps) {
      directionsService.value = new google.maps.DirectionsService()
      directionsRenderer.value = new google.maps.DirectionsRenderer({
        suppressMarkers: false,
        draggable: false,
        routeIndex: selectedRouteIndex.value,
      })
    }
  }

  // Get directions between two points
  const getDirections = async (
    origin: LocationData,
    destination: MedicalFacility,
    mode: google.maps.TravelMode = google.maps.TravelMode.DRIVING,
  ): Promise<DirectionsResult> => {
    if (!directionsService.value) {
      initializeDirections()
    }

    if (!directionsService.value) {
      throw new Error("Google Maps not loaded")
    }

    isLoading.value = true
    error.value = null
    travelMode.value = mode

    const request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(origin.lat, origin.lng),
      destination: new google.maps.LatLng(destination.location.lat, destination.location.lng),
      travelMode: mode,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
      provideRouteAlternatives: true,
    }

    return new Promise((resolve, reject) => {
      directionsService.value!.route(request, (result, status) => {
        isLoading.value = false

        if (status === google.maps.DirectionsStatus.OK && result) {
          const directionsResult: DirectionsResult = {
            routes: result.routes.map((route) => ({
              distance: route.legs[0].distance?.text || "",
              duration: route.legs[0].duration?.text || "",
              durationInTraffic: route.legs[0].duration_in_traffic?.text,
              steps: route.legs[0].steps.map((step) => ({
                instruction: step.instructions.replace(/<[^>]*>/g, ""), // Remove HTML tags
                distance: step.distance?.text || "",
                duration: step.duration?.text || "",
                maneuver: step.maneuver,
                startLocation: {
                  lat: step.start_location.lat(),
                  lng: step.start_location.lng(),
                },
                endLocation: {
                  lat: step.end_location.lat(),
                  lng: step.end_location.lng(),
                },
              })),
              overview_polyline: route.overview_polyline,
              warnings: route.warnings,
              copyrights: route.copyrights,
            })),
            status,
            origin: { lat: origin.lat, lng: origin.lng },
            destination: { lat: destination.location.lat, lng: destination.location.lng },
            travelMode: mode,
          }

          currentDirections.value = directionsResult
          resolve(directionsResult)
        } else {
          const errorMessage = getDirectionsErrorMessage(status)
          error.value = errorMessage
          reject(new Error(errorMessage))
        }
      })
    })
  }

  // Display directions on map
  const displayDirections = (map: google.maps.Map, routeIndex = 0) => {
    if (!directionsRenderer.value || !currentDirections.value) return

    selectedRouteIndex.value = routeIndex
    directionsRenderer.value.setRouteIndex(routeIndex)
    directionsRenderer.value.setMap(map)

    // Create a new directions request to display
    const request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(currentDirections.value.origin.lat, currentDirections.value.origin.lng),
      destination: new google.maps.LatLng(
        currentDirections.value.destination.lat,
        currentDirections.value.destination.lng,
      ),
      travelMode: currentDirections.value.travelMode,
      unitSystem: google.maps.UnitSystem.METRIC,
      provideRouteAlternatives: true,
    }

    directionsService.value?.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        directionsRenderer.value?.setDirections(result)
      }
    })
  }

  // Clear directions from map
  const clearDirections = () => {
    if (directionsRenderer.value) {
      directionsRenderer.value.setMap(null)
    }
    currentDirections.value = null
    selectedRouteIndex.value = 0
    error.value = null
  }

  // Get error message for directions status
  const getDirectionsErrorMessage = (status: google.maps.DirectionsStatus): string => {
    switch (status) {
      case google.maps.DirectionsStatus.NOT_FOUND:
        return "One or more locations could not be found"
      case google.maps.DirectionsStatus.ZERO_RESULTS:
        return "No route could be found between the origin and destination"
      case google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED:
        return "Too many waypoints were provided"
      case google.maps.DirectionsStatus.INVALID_REQUEST:
        return "Invalid directions request"
      case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
        return "Service has received too many requests"
      case google.maps.DirectionsStatus.REQUEST_DENIED:
        return "Service denied use of the directions service"
      case google.maps.DirectionsStatus.UNKNOWN_ERROR:
        return "Unknown error occurred"
      default:
        return "Failed to get directions"
    }
  }

  // Get travel mode icon
  const getTravelModeIcon = (mode: google.maps.TravelMode): string => {
    switch (mode) {
      case google.maps.TravelMode.DRIVING:
        return "🚗"
      case google.maps.TravelMode.WALKING:
        return "🚶"
      case google.maps.TravelMode.BICYCLING:
        return "🚴"
      case google.maps.TravelMode.TRANSIT:
        return "🚌"
      default:
        return "📍"
    }
  }

  // Get maneuver icon
  const getManeuverIcon = (maneuver?: string): string => {
    if (!maneuver) return "➡️"

    switch (maneuver.toLowerCase()) {
      case "turn-left":
        return "↪️"
      case "turn-right":
        return "↩️"
      case "turn-slight-left":
        return "↖️"
      case "turn-slight-right":
        return "↗️"
      case "turn-sharp-left":
        return "⬅️"
      case "turn-sharp-right":
        return "➡️"
      case "uturn-left":
      case "uturn-right":
        return "🔄"
      case "straight":
        return "⬆️"
      case "ramp-left":
        return "🛣️"
      case "ramp-right":
        return "🛣️"
      case "merge":
        return "🔀"
      case "fork-left":
      case "fork-right":
        return "🍴"
      case "ferry":
        return "⛴️"
      case "roundabout-left":
      case "roundabout-right":
        return "🔄"
      default:
        return "➡️"
    }
  }

  // Computed properties
  const selectedRoute = computed(() => {
    if (!currentDirections.value || !currentDirections.value.routes[selectedRouteIndex.value]) {
      return null
    }
    return currentDirections.value.routes[selectedRouteIndex.value]
  })

  const hasAlternativeRoutes = computed(() => {
    return currentDirections.value && currentDirections.value.routes.length > 1
  })

  return {
    // State
    isLoading,
    error,
    currentDirections,
    selectedRouteIndex,
    travelMode,
    directionsRenderer,

    // Computed
    selectedRoute,
    hasAlternativeRoutes,

    // Methods
    initializeDirections,
    getDirections,
    displayDirections,
    clearDirections,
    getTravelModeIcon,
    getManeuverIcon,
  }
}
