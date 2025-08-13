<template>
    <!-- Modal Overlay -->
    <Teleport to="body">
      <div 
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-hidden"
        @keydown.esc="closeModal"
      >
        <!-- Background Overlay -->
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          @click="closeModal"
        ></div>
  
        <!-- Modal Content -->
        <div class="relative h-full flex flex-col">
          <!-- Header -->
          <div class="bg-white shadow-lg z-10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex items-center justify-between h-16">
                <!-- Facility Info -->
                <div class="flex items-center space-x-4">
                  <button
                    @click="closeModal"
                    class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                  
                  <div v-if="facility">
                    <h2 class="text-lg font-display font-bold text-gray-900">
                      Directions to {{ facility.name }}
                    </h2>
                    <p class="text-sm text-gray-600">{{ facility.address }}</p>
                  </div>
                </div>
  
                <!-- Travel Mode Selector -->
                <div class="flex items-center space-x-2">
                  <button
                    v-for="mode in travelModes"
                    :key="mode.value"
                    @click="changeTravelMode(mode.value)"
                    :class="selectedTravelMode === mode.value 
                      ? 'bg-medical-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                    class="px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                  >
                    <span>{{ mode.icon }}</span>
                    <span>{{ mode.label }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Main Content -->
          <div class="flex-1 flex">
            <!-- Map Section -->
            <div class="flex-1 relative">
              <!-- Loading Overlay -->
              <div 
                v-if="isLoadingDirections"
                class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center"
              >
                <div class="text-center">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto mb-4"></div>
                  <p class="text-gray-600">Calculating route...</p>
                </div>
              </div>
  
              <!-- Error Overlay -->
              <div 
                v-if="directionsError"
                class="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center"
              >
                <div class="text-center max-w-md mx-auto p-6">
                  <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Route Not Found</h3>
                  <p class="text-gray-600 mb-4">{{ directionsError }}</p>
                  <button
                    @click="retryDirections"
                    class="bg-medical-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
  
              <!-- Map Container -->
              <div 
                ref="mapContainer" 
                class="w-full h-full"
              ></div>
  
              <!-- Route Options -->
              <div 
                v-if="hasAlternativeRoutes && selectedRoute"
                class="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 max-w-sm"
              >
                <h4 class="font-semibold text-gray-900 mb-3">Route Options</h4>
                <div class="space-y-2">
                  <button
                    v-for="(route, index) in currentDirections?.routes"
                    :key="index"
                    @click="selectRoute(index)"
                    :class="selectedRouteIndex === index 
                      ? 'bg-medical-primary text-white' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                    class="w-full p-3 rounded-lg text-left transition-colors"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium">Route {{ index + 1 }}</div>
                        <div class="text-sm opacity-75">
                          {{ route.distance }} • {{ route.durationInTraffic || route.duration }}
                        </div>
                      </div>
                      <div v-if="selectedRouteIndex === index" class="text-white">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Directions Panel -->
            <div class="w-96 bg-white border-l border-gray-200 flex flex-col">
              <!-- Route Summary -->
              <div v-if="selectedRoute" class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-display font-bold text-gray-900">Route Summary</h3>
                  <span class="text-2xl">{{ getTravelModeIcon(selectedTravelMode) }}</span>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="text-center p-3 bg-gray-50 rounded-lg">
                    <div class="text-2xl font-bold text-medical-primary">{{ selectedRoute.distance }}</div>
                    <div class="text-sm text-gray-600">Distance</div>
                  </div>
                  <div class="text-center p-3 bg-gray-50 rounded-lg">
                    <div class="text-2xl font-bold text-medical-primary">
                      {{ selectedRoute.durationInTraffic || selectedRoute.duration }}
                    </div>
                    <div class="text-sm text-gray-600">
                      {{ selectedRoute.durationInTraffic ? 'With Traffic' : 'Duration' }}
                    </div>
                  </div>
                </div>
  
                <!-- Facility Quick Info -->
                <div v-if="facility" class="p-3 bg-blue-50 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-gray-900">{{ facility.name }}</span>
                    <span 
                      class="px-2 py-1 rounded-full text-xs font-medium"
                      :class="facility.availability === 'available' ? 'status-available' : 'status-busy'"
                    >
                      {{ facility.availability }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <span v-if="facility.rating" class="flex items-center">
                      <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {{ facility.rating.toFixed(1) }}
                    </span>
                    <span v-if="facility.phoneNumber">{{ facility.phoneNumber }}</span>
                  </div>
                </div>
              </div>
  
              <!-- Turn-by-Turn Directions -->
              <div class="flex-1 overflow-y-auto">
                <div class="p-6">
                  <h4 class="font-semibold text-gray-900 mb-4">Turn-by-Turn Directions</h4>
                  
                  <div v-if="selectedRoute" class="space-y-4">
                    <div
                      v-for="(step, index) in selectedRoute.steps"
                      :key="index"
                      class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div class="flex-shrink-0 w-8 h-8 bg-medical-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {{ index + 1 }}
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-900 mb-1" v-html="step.instruction"></p>
                        <div class="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{{ step.distance }}</span>
                          <span>•</span>
                          <span>{{ step.duration }}</span>
                        </div>
                      </div>
                      <div class="flex-shrink-0 text-lg">
                        {{ getManeuverIcon(step.maneuver) }}
                      </div>
                    </div>
                  </div>
  
                  <div v-else class="text-center py-8">
                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
                    </svg>
                    <p class="text-gray-600">No directions available</p>
                  </div>
                </div>
              </div>
  
              <!-- Action Buttons -->
              <div class="p-6 border-t border-gray-200">
                <div class="space-y-3">
                  <button
                    v-if="facility?.phoneNumber"
                    @click="callFacility"
                    class="w-full bg-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span>Call {{ facility.name }}</span>
                  </button>
                  
                  <button
                    @click="openInGoogleMaps"
                    class="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    <span>Open in Google Maps</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
  import { useDirections } from '@/composables/useDirections'
  import { useGeolocation } from '@/composables/useGeolocation'
  import type { MedicalFacility } from '@/composables/useGoogleMaps'
  import { google } from 'googlemaps'
  
  interface Props {
    isOpen: boolean
    facility: MedicalFacility | null
  }
  
  const props = defineProps<Props>()
  
  const emit = defineEmits<{
    close: []
  }>()
  
  // Composables
  const { location: userLocation } = useGeolocation()
  const {
    isLoading: isLoadingDirections,
    error: directionsError,
    currentDirections,
    selectedRouteIndex,
    selectedRoute,
    hasAlternativeRoutes,
    getDirections,
    displayDirections,
    clearDirections,
    getTravelModeIcon,
    getManeuverIcon,
  } = useDirections()
  
  // Local state
  const mapContainer = ref<HTMLElement | null>(null)
  const map = ref<google.maps.Map | null>(null)
  const selectedTravelMode = ref<google.maps.TravelMode>(google.maps.TravelMode.DRIVING)
  
  const travelModes = [
    { value: google.maps.TravelMode.DRIVING, label: 'Drive', icon: '🚗' },
    { value: google.maps.TravelMode.WALKING, label: 'Walk', icon: '🚶' },
    { value: google.maps.TravelMode.TRANSIT, label: 'Transit', icon: '🚌' },
    { value: google.maps.TravelMode.BICYCLING, label: 'Bike', icon: '🚴' },
  ]
  
  // Initialize map when modal opens
  watch(() => props.isOpen, async (isOpen) => {
    if (isOpen && props.facility && userLocation.value) {
      await nextTick()
      initializeMap()
      await loadDirections()
    } else if (!isOpen) {
      clearDirections()
    }
  })
  
  const initializeMap = () => {
    if (!mapContainer.value || !props.facility || !userLocation.value) return
  
    const center = {
      lat: (userLocation.value.lat + props.facility.location.lat) / 2,
      lng: (userLocation.value.lng + props.facility.location.lng) / 2,
    }
  
    map.value = new google.maps.Map(mapContainer.value, {
      center,
      zoom: 13,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      styles: [
        {
          featureType: 'poi.medical',
          elementType: 'geometry',
          stylers: [{ color: '#10b981' }],
        },
      ],
    })
  }
  
  const loadDirections = async () => {
    if (!props.facility || !userLocation.value) return
  
    try {
      await getDirections(userLocation.value, props.facility, selectedTravelMode.value)
      if (map.value) {
        displayDirections(map.value, selectedRouteIndex.value)
      }
    } catch (error) {
      console.error('Failed to load directions:', error)
    }
  }
  
  const changeTravelMode = async (mode: google.maps.TravelMode) => {
    selectedTravelMode.value = mode
    await loadDirections()
  }
  
  const selectRoute = (index: number) => {
    selectedRouteIndex.value = index
    if (map.value) {
      displayDirections(map.value, index)
    }
  }
  
  const retryDirections = () => {
    loadDirections()
  }
  
  const closeModal = () => {
    emit('close')
  }
  
  const callFacility = () => {
    if (props.facility?.phoneNumber) {
      window.open(`tel:${props.facility.phoneNumber}`, '_self')
    }
  }
  
  const openInGoogleMaps = () => {
    if (!props.facility || !userLocation.value) return
  
    const origin = `${userLocation.value.lat},${userLocation.value.lng}`
    const destination = `${props.facility.location.lat},${props.facility.location.lng}`
    const travelModeParam = selectedTravelMode.value.toLowerCase()
    
    const url = `https://www.google.com/maps/dir/${origin}/${destination}/@${origin},15z/data=!3m1!4b1!4m2!4m1!3e${
      selectedTravelMode.value === google.maps.TravelMode.DRIVING ? '0' :
      selectedTravelMode.value === google.maps.TravelMode.WALKING ? '2' :
      selectedTravelMode.value === google.maps.TravelMode.TRANSIT ? '3' :
      selectedTravelMode.value === google.maps.TravelMode.BICYCLING ? '1' : '0'
    }`
    
    window.open(url, '_blank')
  }
  
  // Handle escape key
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    clearDirections()
  })
  </script>
  