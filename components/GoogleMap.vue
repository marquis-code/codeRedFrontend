<template>
    <div class="relative w-full h-full">
      <!-- Loading State -->
      <div 
        v-if="!isLoaded" 
        class="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl"
      >
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto mb-4"></div>
          <p class="text-gray-600">Loading map...</p>
        </div>
      </div>
  
      <!-- Map Container -->
      <div 
        ref="mapContainer" 
        class="w-full h-full rounded-2xl overflow-hidden shadow-lg"
        :class="{ 'opacity-0': !isLoaded, 'opacity-100': isLoaded }"
      ></div>
  
      <!-- Map Controls -->
      <div class="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          @click="recenterMap"
          class="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 group"
          title="Recenter on your location"
        >
          <svg class="w-5 h-5 text-gray-600 group-hover:text-medical-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>
      </div>
  
      <!-- Facility Count Badge -->
      <div class="absolute bottom-4 left-4">
        <div class="bg-white px-4 py-2 rounded-xl shadow-lg">
          <div class="flex items-center space-x-2">
            <div class="pulse-dot available"></div>
            <span class="text-sm font-medium text-gray-700">
              {{ facilities.length }} facilities found
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useGoogleMaps } from '@/composables/useGoogleMaps' // Import the useGoogleMaps hook
  
  interface Props {
    userLocation: { lat: number; lng: number } | null
  }
  
  const props = defineProps<Props>()
  const { map, isLoaded, facilities, initializeMap, clearSelection } = useGoogleMaps() // Use the hook at the top level
  
  const mapContainer = ref<HTMLElement | null>(null)
  
  const recenterMap = () => {
    if (map.value && props.userLocation) {
      map.value.panTo(props.userLocation)
      map.value.setZoom(14)
      clearSelection()
    }
  }
  
  onMounted(async () => {
    if (mapContainer.value && props.userLocation) {
      await initializeMap(mapContainer.value, props.userLocation)
    }
  })
  
  watch(() => props.userLocation, async (newLocation) => {
    if (mapContainer.value && newLocation && !isLoaded.value) {
      await initializeMap(mapContainer.value, newLocation)
    }
  }, { immediate: true })
  </script>
  