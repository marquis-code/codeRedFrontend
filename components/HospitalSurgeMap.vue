<template>
    <div class="relative w-full h-full">
      <!-- Mapbox Map Container -->
      <div ref="mapContainer" class="w-full h-full rounded-lg overflow-hidden"></div>
      
      <!-- Loading Overlay -->
      <div v-if="loading" class="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-4 text-gray-700 font-medium">Loading map data...</p>
        </div>
      </div>
      
      <!-- Connection Status -->
      <div 
        v-if="!isConnected" 
        class="absolute top-4 right-4 bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-md"
      >
        Not connected to surge data
      </div>
      
      <!-- Surge Count Badge -->
      <div 
        v-if="surgeEvents.length > 0" 
        class="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full shadow-md"
      >
        {{ surgeEvents.length }} {{ surgeEvents.length === 1 ? 'surge' : 'surges' }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import { useSurgeWebSocket } from '@/composables/useSurgeWebSocket'
  import mapboxgl from 'mapbox-gl'
  import { useRuntimeConfig } from '#app'
  
  // Props
  const props = defineProps({
    hospitalId: {
      type: String,
      required: true
    },
    hospitalLocation: {
      type: Object,
      required: true,
      validator: (value: any) => {
        return typeof value.lat === 'number' && typeof value.lng === 'number'
      }
    },
    mapOptions: {
      type: Object,
      default: () => ({
        zoom: 14
      })
    }
  })
  
  // Refs
  const mapContainer = ref<HTMLElement | null>(null)
  const map = ref<mapboxgl.Map | null>(null)
  const surgeMarkers = ref<mapboxgl.Marker[]>([])
  const loading = ref(true)
  const config = useRuntimeConfig()
  
  // Use the surge websocket composable
  const { 
    initializeSocket, 
    isConnected, 
    surgeEvents, 
    subscribeToHospitalSurges 
  } = useSurgeWebSocket()
  
  // Initialize Mapbox Map
  const initializeMap = () => {
    if (!mapContainer.value) return
    
    mapboxgl.accessToken = config.public.mapboxAccessToken
    // Create the map
    map.value = new mapboxgl.Map({
      container: mapContainer.value,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [props.hospitalLocation.lng, props.hospitalLocation.lat],
      ...props.mapOptions
    })
    
    map.value.on('load', () => {
      // Add hospital marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([props.hospitalLocation.lng, props.hospitalLocation.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Hospital Location</h3>'))
        .addTo(map.value!)

      // Add heatmap source and layer
      map.value!.addSource('surges', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      })

      map.value!.addLayer({
        id: 'surges-heat',
        type: 'heatmap',
        source: 'surges',
        maxzoom: 15,
        paint: {
          'heatmap-weight': 1,
          'heatmap-intensity': 1,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 255, 255, 0)',
            0.2, 'rgba(0, 255, 255, 1)',
            0.4, 'rgba(0, 127, 255, 1)',
            0.6, 'rgba(0, 0, 255, 1)',
            0.8, 'rgba(63, 0, 91, 1)',
            1, 'rgba(255, 0, 0, 1)'
          ],
          'heatmap-radius': 20,
          'heatmap-opacity': 0.7
        }
      })

      loading.value = false
    })
  }
  
  // Update surge markers on the map
  const updateSurgeMarkers = () => {
    if (!map.value || !map.value.getSource('surges')) return
    
    // Clear existing markers
    surgeMarkers.value.forEach(marker => marker.remove())
    surgeMarkers.value = []
    
    // Create heatmap data points
    const features = surgeEvents.value.map(event => {
      const lat = event.surge.latitude || 0
      const lng = event.surge.longitude || 0
      
      // Create a new marker for each surge
      const el = document.createElement('div')
      el.className = 'surge-marker'
      el.style.width = '16px'
      el.style.height = '16px'
      el.style.backgroundColor = '#ef4444'
      el.style.borderRadius = '50%'
      el.style.border = '1px solid #b91c1c'
      el.style.opacity = '0.8'

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold text-gray-900">Surge Event</h3>
          <p class="text-sm text-gray-600">Time: ${new Date(event.timestamp).toLocaleString()}</p>
          <p class="text-sm text-gray-600">Type: ${event.surge.emergencyType || 'Visit'}</p>
          <p class="text-sm text-gray-600">Status: ${event.surge.status || 'pending'}</p>
        </div>
      `)
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.value!)
      
      surgeMarkers.value.push(marker)
      
      return {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      }
    })
    
    // Update heatmap data
    const source = map.value.getSource('surges') as mapboxgl.GeoJSONSource
    source.setData({
      type: 'FeatureCollection',
      features: features as any
    })
  }
  
  // Connect to websocket and subscribe to hospital surges
  const connectAndSubscribe = async () => {
    try {
      // Initialize socket connection
      initializeSocket()
      
      // Wait for connection to be established
      if (!isConnected.value) {
        await new Promise<void>((resolve) => {
          const checkConnection = setInterval(() => {
            if (isConnected.value) {
              clearInterval(checkConnection)
              resolve()
            }
          }, 500)
          
          // Timeout after 5 seconds
          setTimeout(() => {
            clearInterval(checkConnection)
            if (!isConnected.value) {
              console.error('Timed out waiting for socket connection')
              resolve() // Resolve anyway to continue
            }
          }, 5000)
        })
      }
      
      // Subscribe to hospital surges
      if (isConnected.value) {
        await subscribeToHospitalSurges(props.hospitalId)
      }
    } catch (error) {
      console.error('Failed to connect and subscribe:', error)
    }
  }
  
  // Lifecycle hooks
  onMounted(() => {
    initializeMap()
    // Connect to websocket and subscribe to hospital surges
    connectAndSubscribe()
  })
  
  // Watch for changes in surge events to update markers
  watch(surgeEvents, () => {
    updateSurgeMarkers()
  }, { deep: true })
  
  // Clean up on unmount
  onUnmounted(() => {
    surgeMarkers.value.forEach(marker => marker.remove())
    if (map.value) map.value.remove()
  })
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>