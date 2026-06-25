import { ref, computed } from "vue"
import { useRuntimeConfig } from "#app"
import type { MedicalFacility } from "./useMapbox"
import mapboxgl from "mapbox-gl"

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
  overview_polyline: string // In Mapbox, we can store GeoJSON coordinates here or standard polyline
  geometry: any // GeoJSON LineString
  warnings?: string[]
  copyrights?: string
}

export interface DirectionsResult {
  routes: RouteInfo[]
  status: string
  origin: { lat: number; lng: number }
  destination: { lat: number; lng: number }
  travelMode: string
}

export const useDirections = () => {
  const config = useRuntimeConfig()
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentDirections = ref<DirectionsResult | null>(null)
  const selectedRouteIndex = ref(0)
  const travelMode = ref<string>('driving')
  const mapRef = ref<mapboxgl.Map | null>(null)

  const initializeDirections = () => {
    // Mapbox doesn't require initializing a service like Google.
  }

  const formatDistance = (meters: number) => {
    if (meters < 1000) return `${Math.round(meters)} m`
    return `${(meters / 1000).toFixed(1)} km`
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.round(seconds / 60)
    if (mins < 60) return `${mins} min`
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return `${hours} h ${remainingMins} min`
  }

  const getDirections = async (
    origin: { lat: number; lng: number },
    destination: MedicalFacility,
    mode: string = 'driving'
  ): Promise<DirectionsResult> => {
    isLoading.value = true
    error.value = null
    travelMode.value = mode

    try {
      const coords = `${origin.lng},${origin.lat};${destination.location.lng},${destination.location.lat}`
      const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${coords}?geometries=geojson&steps=true&alternatives=true&access_token=${config.public.mapboxAccessToken}`
      
      const response = await fetch(url)
      const data = await response.json()

      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const directionsResult: DirectionsResult = {
          routes: data.routes.map((route: any) => ({
            distance: formatDistance(route.distance),
            duration: formatDuration(route.duration),
            steps: route.legs[0].steps.map((step: any) => ({
              instruction: step.maneuver.instruction,
              distance: formatDistance(step.distance),
              duration: formatDuration(step.duration),
              maneuver: step.maneuver.type,
              startLocation: {
                lng: step.maneuver.location[0],
                lat: step.maneuver.location[1],
              },
              endLocation: {
                lng: step.maneuver.location[0],
                lat: step.maneuver.location[1],
              },
            })),
            geometry: route.geometry,
            overview_polyline: "",
          })),
          status: 'OK',
          origin,
          destination: destination.location,
          travelMode: mode,
        }

        currentDirections.value = directionsResult
        isLoading.value = false
        return directionsResult
      } else {
        throw new Error(data.message || "Failed to fetch directions")
      }
    } catch (err: any) {
      isLoading.value = false
      error.value = err.message || "Unknown error"
      throw err
    }
  }

  const displayDirections = (map: mapboxgl.Map, routeIndex = 0) => {
    if (!currentDirections.value || !currentDirections.value.routes[routeIndex]) return

    mapRef.value = map
    selectedRouteIndex.value = routeIndex

    const route = currentDirections.value.routes[routeIndex]
    
    if (map.getSource('route')) {
      (map.getSource('route') as mapboxgl.GeoJSONSource).setData(route.geometry)
    } else {
      map.addSource('route', {
        type: 'geojson',
        data: route.geometry
      })
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 5,
          'line-opacity': 0.75
        }
      })
    }

    // Fit map to route bounds
    const coordinates = route.geometry.coordinates
    const bounds = coordinates.reduce((b: mapboxgl.LngLatBounds, coord: any) => {
      return b.extend(coord)
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]))

    map.fitBounds(bounds, {
      padding: 50
    })
  }

  const clearDirections = () => {
    if (mapRef.value && mapRef.value.getSource('route')) {
      mapRef.value.removeLayer('route')
      mapRef.value.removeSource('route')
    }
    currentDirections.value = null
    selectedRouteIndex.value = 0
    error.value = null
  }

  const getTravelModeIcon = (mode: string): string => {
    switch (mode) {
      case 'driving': return "🚗"
      case 'walking': return "🚶"
      case 'cycling': return "🚴"
      default: return "📍"
    }
  }

  const getManeuverIcon = (maneuver?: string): string => {
    if (!maneuver) return "➡️"
    switch (maneuver.toLowerCase()) {
      case "turn": return "↪️"
      case "depart": return "⬆️"
      case "arrive": return "📍"
      case "merge": return "🔀"
      case "roundabout": return "🔄"
      default: return "➡️"
    }
  }

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
    isLoading,
    error,
    currentDirections,
    selectedRouteIndex,
    travelMode,
    selectedRoute,
    hasAlternativeRoutes,
    initializeDirections,
    getDirections,
    displayDirections,
    clearDirections,
    getTravelModeIcon,
    getManeuverIcon,
  }
}
