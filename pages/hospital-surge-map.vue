<template>
    <div class="relative h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Map Header -->
      <div class="absolute top-0 left-0 right-0 z-10 bg-white bg-opacity-90 p-4 flex justify-between items-center border-b">
        <h2 class="text-lg font-bold text-gray-800">
          {{ hospital.hospitalName || hospital.name }}
        </h2>
        <div class="flex space-x-2">
          <button 
            @click="toggleSurgeView"
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
            :class="showSurgeMap ? 'bg-rose-100 text-rose-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'"
          >
            {{ showSurgeMap ? 'Hide Surges' : 'Show Surges' }}
          </button>
          <button 
            @click="$emit('close')"
            class="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-200 lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Map Container -->
      <div class="h-full pt-16">
        <!-- Regular Directions Map -->
        <div v-if="!showSurgeMap" class="h-full">
          <GoogleMap
            :api-key="googleMapsApiKey"
            :center="hospitalLocation"
            :zoom="14"
            :markers="[hospitalLocation]"
            :user-location="userLocation"
            show-directions
          />
        </div>
        
        <!-- Surge Map -->
        <div v-else class="h-full">
          <HospitalSurgeMap
            :hospital-id="hospital.id || hospital._id"
            :hospital-location="hospitalLocation"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
//   import GoogleMap from '@/components/GoogleMap.vue'
  import HospitalSurgeMap from '@/components/HospitalSurgeMap.vue'
  
  // Props
  const props = defineProps({
    hospital: {
      type: Object,
      required: true
    },
    userLocation: {
      type: Object,
      default: () => ({})
    }
  })
  
  // Emits
  defineEmits(['close'])
  
  // State
  const showSurgeMap = ref(false)
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  
  // Computed
  const hospitalLocation = computed(() => {
    return {
      lat: parseFloat(props.hospital.latitude || props.hospital.lat || 0),
      lng: parseFloat(props.hospital.longitude || props.hospital.lon || 0)
    }
  })
  
  // Methods
  const toggleSurgeView = () => {
    showSurgeMap.value = !showSurgeMap.value
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>