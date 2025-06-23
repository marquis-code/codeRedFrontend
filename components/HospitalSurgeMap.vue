<template>
    <div class="relative w-full h-full">
      <!-- Google Map Container -->
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
  import * as google from 'googlemaps'
  
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
        zoom: 14,
        mapTypeId: 'roadmap',
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
      })
    }
  })
  
  // Refs
  const mapContainer = ref<HTMLElement | null>(null)
  const map = ref<google.maps.Map | null>(null)
  const hospitalMarker = ref<google.maps.Marker | null>(null)
  const surgeMarkers = ref<google.maps.Marker[]>([])
  const heatmap = ref<google.maps.visualization.HeatmapLayer | null>(null)
  const loading = ref(true)
  
  // Use the surge websocket composable
  const { 
    initializeSocket, 
    isConnected, 
    surgeEvents, 
    subscribeToHospitalSurges 
  } = useSurgeWebSocket()
  
  // Initialize Google Map
  const initializeMap = () => {
    if (!mapContainer.value) return
    
    // Create the map
    map.value = new google.maps.Map(mapContainer.value, {
      center: props.hospitalLocation,
      ...props.mapOptions
    })
    
    // Add hospital marker
    hospitalMarker.value = new google.maps.Marker({
      position: props.hospitalLocation,
      map: map.value,
      title: 'Hospital Location',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#3b82f6', // Blue
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#1d4ed8',
        scale: 10
      },
      zIndex: 10
    })
    
    // Initialize heatmap layer
    heatmap.value = new google.maps.visualization.HeatmapLayer({
      map: map.value,
      data: [],
      radius: 20,
      opacity: 0.7,
      gradient: [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ]
    })
    
    loading.value = false
  }
  
  // Update surge markers on the map
  const updateSurgeMarkers = () => {
    if (!map.value) return
    
    // Clear existing markers
    surgeMarkers.value.forEach(marker => marker.setMap(null))
    surgeMarkers.value = []
    
    // Create heatmap data points
    const heatmapData = surgeEvents.value.map(event => {
      const lat = event.surge.latitude || 0
      const lng = event.surge.longitude || 0
      
      // Create a new marker for each surge
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map.value!,
        title: `Surge at ${new Date(event.timestamp).toLocaleString()}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#ef4444', // Red
          fillOpacity: 0.8,
          strokeWeight: 1,
          strokeColor: '#b91c1c',
          scale: 8
        },
        animation: google.maps.Animation.DROP,
        zIndex: 5
      })
      
      // Add click listener to show info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold text-gray-900">Surge Event</h3>
            <p class="text-sm text-gray-600">Time: ${new Date(event.timestamp).toLocaleString()}</p>
            <p class="text-sm text-gray-600">Type: ${event.surge.emergencyType || 'Visit'}</p>
            <p class="text-sm text-gray-600">Status: ${event.surge.status || 'pending'}</p>
          </div>
        `
      })
      
      marker.addListener('click', () => {
        infoWindow.open(map.value!, marker)
      })
      
      surgeMarkers.value.push(marker)
      
      // Return heatmap data point
      return new google.maps.LatLng(lat, lng)
    })
    
    // Update heatmap data
    if (heatmap.value && heatmapData.length > 0) {
      heatmap.value.setData(heatmapData)
    }
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
    // Initialize map when component is mounted
    if (window.google && window.google.maps) {
      initializeMap()
    } else {
      // Google Maps API not loaded yet, wait for it
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps)
          initializeMap()
        }
      }, 100)
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkGoogleMaps)
        if (!window.google || !window.google.maps) {
          console.error('Google Maps API not loaded')
          loading.value = false
        }
      }, 10000)
    }
    
    // Connect to websocket and subscribe to hospital surges
    connectAndSubscribe()
  })
  
  // Watch for changes in surge events to update markers
  watch(surgeEvents, () => {
    updateSurgeMarkers()
  }, { deep: true })
  
  // Clean up on unmount
  onUnmounted(() => {
    // Clear markers
    if (hospitalMarker.value) {
      hospitalMarker.value.setMap(null)
    }
    
    surgeMarkers.value.forEach(marker => marker.setMap(null))
    
    if (heatmap.value) {
      heatmap.value.setMap(null)
    }
  })
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>