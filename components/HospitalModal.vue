<template>
    <div class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50" @click.self="$emit('close')">
      <div class="min-h-screen px-4 text-center">
        <div class="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div class="flex items-center justify-between p-6 border-b">
            <div class="flex items-center gap-4">
              <div v-if="hospital.isCodeRed" class="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                CODE RED
              </div>
              <h2 class="text-2xl font-bold text-gray-900">
                {{ hospital.hospitalName || hospital.name }}
              </h2>
            </div>
            <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
  
          <div class="p-6 max-h-[70vh] overflow-y-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <h3 class="text-lg font-semibold mb-2">Hospital Information</h3>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <span class="font-medium">Status:</span>
                      <span class="px-2 py-1 rounded text-sm" :class="availabilityClass">
                        {{ hospital.availability || 'Unknown' }}
                      </span>
                    </div>
                    
                    <div v-if="hospital.address || hospital.vicinity">
                      <span class="font-medium">Address:</span>
                      <p class="text-gray-600">{{ hospital.address || hospital.vicinity }}</p>
                    </div>
                    
                    <div v-if="hospital.distance">
                      <span class="font-medium">Distance:</span>
                      <span class="text-gray-600">{{ hospital.distance.toFixed(1) }} km away</span>
                    </div>
                    
                    <div v-if="hospital.rating">
                      <span class="font-medium">Rating:</span>
                      <span class="text-gray-600">⭐ {{ hospital.rating }}</span>
                      <span v-if="hospital.user_ratings_total" class="text-sm text-gray-500">
                        ({{ hospital.user_ratings_total }} reviews)
                      </span>
                    </div>
                    
                    <div v-if="hospital.phone">
                      <span class="font-medium">Phone:</span>
                      <a :href="`tel:${hospital.phone}`" class="text-blue-600 hover:underline">
                        {{ hospital.phone }}
                      </a>
                    </div>
                    
                    <div v-if="hospital.website">
                      <span class="font-medium">Website:</span>
                      <a :href="hospital.website" target="_blank" class="text-blue-600 hover:underline">
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
  
                <div v-if="hospital.bedAvailability" class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">Bed Availability</h4>
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    <div v-for="(count, type) in hospital.bedAvailability" :key="type">
                      <span class="font-medium">{{ formatBedType(type) }}:</span>
                      <span class="ml-1">{{ count }}</span>
                    </div>
                  </div>
                </div>
  
                <div v-if="hospital.specialities && hospital.specialities.length > 0">
                  <h4 class="font-semibold mb-2">Specialities</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="speciality in hospital.specialities" 
                      :key="speciality"
                      class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                    >
                      {{ speciality }}
                    </span>
                  </div>
                </div>
              </div>
  
              <div class="space-y-4">
                <div>
                  <h3 class="text-lg font-semibold mb-2">Location & Directions</h3>
                  
                  <div ref="mapContainer" class="w-full h-64 bg-gray-200 rounded-lg mb-4">
                    <div v-if="!mapLoaded" class="flex items-center justify-center h-full">
                      <div class="text-center">
                        <div class="spinner mb-2"></div>
                        <p class="text-sm text-gray-600">Loading map...</p>
                      </div>
                    </div>
                  </div>
  
                  <div class="flex gap-2 flex-wrap">
                    <button 
                      @click="getDirections"
                      :disabled="!userLocation.lat || !userLocation.lng || loadingDirections"
                      class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg v-if="loadingDirections" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
                      </svg>
                      Get Directions
                    </button>
                    
                    <button 
                      @click="openInGoogleMaps"
                      class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      Open in Google Maps
                    </button>
                    
                    <button 
                      @click="callHospital"
                      v-if="hospital.phone"
                      class="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      Call Hospital
                    </button>
                  </div>
                </div>
  
                <div v-if="directions.length > 0" class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">Directions</h4>
                  <div class="space-y-2 max-h-40 overflow-y-auto">
                    <div 
                      v-for="(step, index) in directions" 
                      :key="index"
                      class="flex gap-2 text-sm"
                    >
                      <span class="font-medium text-blue-600">{{ index + 1 }}.</span>
                      <span v-html="step.instructions"></span>
                    </div>
                  </div>
                  <div v-if="routeInfo" class="mt-2 pt-2 border-t text-sm text-gray-600">
                    <p><strong>Distance:</strong> {{ routeInfo.distance }}</p>
                    <p><strong>Duration:</strong> {{ routeInfo.duration }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // All imports at the very top
  import { ref, computed, onMounted, nextTick } from 'vue'
  import { useNuxtApp } from '#app'
  import { useCustomToast } from '@/composables/core/useCustomToast'
  
  interface Props {
    hospital: any
    userLocation: { lat: number | null, lng: number | null }
  }
  
  const props = defineProps<Props>()
  defineEmits(['close'])
  
  // Initialize all composables immediately at top level
  const { $loadGoogleMaps } = useNuxtApp()
  const { showToast } = useCustomToast()
  
  // All reactive state defined immediately at top level
  const mapContainer = ref<HTMLDivElement | null>(null)
  const mapLoaded = ref(false)
  const loadingDirections = ref(false)
  const directions = ref([])
  const routeInfo = ref(null)
  
  // All computed properties defined immediately at top level
  const availabilityClass = computed(() => ({
    'bg-green-500 text-white': props.hospital.availability === 'available',
    'bg-red-500 text-white': props.hospital.availability === 'unavailable',
    'bg-blue-500 text-white': props.hospital.availability === 'busy',
    'bg-gray-500 text-white': !props.hospital.availability
  }))
  
  // Non-reactive variables
  let map: any = null
  let directionsService: any = null
  let directionsRenderer: any = null
  
  // Utility functions
  const formatBedType = (type: string) => {
    return type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  }
  
  const initializeMap = async () => {
    try {
      const google = await $loadGoogleMaps()
      if (!google || !mapContainer.value) return
  
      const hospitalLat = props.hospital.latitude || props.hospital.geometry?.location?.lat?.() || props.hospital.geometry?.location?.lat
      const hospitalLng = props.hospital.longitude || props.hospital.geometry?.location?.lng?.() || props.hospital.geometry?.location?.lng
  
      if (!hospitalLat || !hospitalLng) return
  
      map = new google.maps.Map(mapContainer.value, {
        center: { lat: hospitalLat, lng: hospitalLng },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      })
  
      new google.maps.Marker({
        position: { lat: hospitalLat, lng: hospitalLng },
        map: map,
        title: props.hospital.hospitalName || props.hospital.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#dc2626"/>
              <path d="M16 8v16M8 16h16" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32)
        }
      })
  
      if (props.userLocation.lat && props.userLocation.lng) {
        new google.maps.Marker({
          position: { lat: props.userLocation.lat, lng: props.userLocation.lng },
          map: map,
          title: 'Your Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#2563eb"/>
                <circle cx="12" cy="12" r="4" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24)
          }
        })
  
        const bounds = new google.maps.LatLngBounds()
        bounds.extend({ lat: hospitalLat, lng: hospitalLng })
        bounds.extend({ lat: props.userLocation.lat, lng: props.userLocation.lng })
        map.fitBounds(bounds)
      }
  
      directionsService = new google.maps.DirectionsService()
      directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#2563eb',
          strokeWeight: 4
        }
      })
  
      mapLoaded.value = true
    } catch (error) {
      console.error('Error initializing map:', error)
    }
  }
  
  const getDirections = async () => {
    if (!props.userLocation.lat || !props.userLocation.lng || !directionsService) return
  
    loadingDirections.value = true
    directions.value = []
    routeInfo.value = null
  
    try {
      const hospitalLat = props.hospital.latitude || props.hospital.geometry?.location?.lat?.() || props.hospital.geometry?.location?.lat
      const hospitalLng = props.hospital.longitude || props.hospital.geometry?.location?.lng?.() || props.hospital.geometry?.location?.lng
  
      const request = {
        origin: { lat: props.userLocation.lat, lng: props.userLocation.lng },
        destination: { lat: hospitalLat, lng: hospitalLng },
        travelMode: window.google.maps.TravelMode.DRIVING
      }
  
      directionsService.route(request, (result: any, status: any) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result)
          directionsRenderer.setMap(map)
  
          const route = result.routes[0]
          const leg = route.legs[0]
          
          directions.value = leg.steps.map((step: any) => ({
            instructions: step.instructions,
            distance: step.distance.text,
            duration: step.duration.text
          }))
  
          routeInfo.value = {
            distance: leg.distance.text,
            duration: leg.duration.text
          }
        } else {
          console.error('Directions request failed:', status)
          showToast({
            title: 'Directions Error',
            message: 'Unable to get directions. Please try again.',
            toastType: 'error',
            duration: 3000
          })
        }
        loadingDirections.value = false
      })
    } catch (error) {
      console.error('Error getting directions:', error)
      loadingDirections.value = false
    }
  }
  
  const openInGoogleMaps = () => {
    const hospitalLat = props.hospital.latitude || props.hospital.geometry?.location?.lat?.() || props.hospital.geometry?.location?.lat
    const hospitalLng = props.hospital.longitude || props.hospital.geometry?.location?.lng?.() || props.hospital.geometry?.location?.lng
  
    if (hospitalLat && hospitalLng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${hospitalLat},${hospitalLng}`
      window.open(url, '_blank')
    }
  }
  
  const callHospital = () => {
    if (props.hospital.phone) {
      window.location.href = `tel:${props.hospital.phone}`
    }
  }
  
  // Lifecycle hook at the very end
  onMounted(() => {
    nextTick(() => {
      initializeMap()
    })
  })
  </script>
  
  <style scoped>
  .spinner {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  