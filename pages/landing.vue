<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <!-- Header -->
       {{ userLocation }}
      <header class="bg-white/95 border-b border-gray-200 sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900">MediFinder</h1>
                <p class="text-sm text-gray-600">Find nearby medical care</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-2 text-sm">
              <div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span class="text-gray-600">{{ facilities.length }} facilities found</span>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Location Status -->
          <div v-if="locationError" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <div>
                  <h3 class="font-semibold text-red-800">Location Access Required</h3>
                  <p class="text-red-700">{{ locationError }}</p>
                </div>
              </div>
              <button @click="requestLocation" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Try Again
              </button>
            </div>
          </div>
  
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <!-- Map Section -->
            <div class="xl:col-span-2">
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Medical Facilities Map</h2>
                
                <div class="h-96 lg:h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
                  <div v-if="!userLocation" class="text-center">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    </svg>
                    <p class="text-gray-600 mb-4">Location access required</p>
                    <button @click="requestLocation" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Enable Location
                    </button>
                  </div>
                  <div v-else-if="isLoadingLocation" class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p class="text-gray-600">Loading map...</p>
                  </div>
                  <div v-else ref="mapElement" class="w-full h-full rounded-xl"></div>
                </div>
              </div>
            </div>
  
            <!-- Facilities Sidebar -->
            <div class="space-y-6">
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Nearby Facilities</h3>
                
                <div v-if="isLoadingFacilities" class="space-y-4">
                  <div v-for="i in 3" :key="i" class="animate-pulse">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div class="flex-1 space-y-2">
                        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-else-if="facilities.length === 0" class="text-center py-8">
                  <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  <p class="text-gray-600">No medical facilities found nearby</p>
                </div>
                
                <div v-else class="space-y-4">
                  <div
                    v-for="facility in facilities"
                    :key="facility.id"
                    class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                    @click="selectFacility(facility)"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h4 class="font-semibold text-gray-900">{{ facility.name }}</h4>
                        <p class="text-sm text-gray-600 mt-1">{{ facility.address }}</p>
                        
                        <div class="flex items-center space-x-2 mt-2">
                          <span
                            :class="[
                              'px-2 py-1 rounded-full text-xs font-medium',
                              facility.availability === 'available' ? 'bg-emerald-100 text-emerald-800' :
                              facility.availability === 'busy' ? 'bg-red-100 text-red-800' :
                              facility.availability === 'emergency-only' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            ]"
                          >
                            {{ facility.availability || 'unknown' }}
                          </span>
                          
                          <span v-if="facility.distance" class="text-xs text-gray-500">
                            {{ facility.distance }}km away
                          </span>
                        </div>
                      </div>
                      
                      <div class="flex flex-col items-end space-y-1">
                        <div v-if="facility.rating" class="flex items-center space-x-1">
                          <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span class="text-sm text-gray-600">{{ facility.rating }}</span>
                        </div>
                        
                        <button 
                          @click.stop="getDirections(facility)"
                          class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Floating Emergency Button -->
      <button
        @click="findEmergencyFacilities"
        class="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
        title="Find Emergency Care"
      >
        <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useGeolocation } from '@/composables/useGeolocation'
  import { useGoogleMaps } from '@/composables/useGoogleMaps'
  
  // All imports and composables at the top level
  const { location: userLocation, error: locationError, isLoading: isLoadingLocation, getCurrentLocation } = useGeolocation()
  const { facilities, selectedFacility, initializeMap, selectFacility: selectMapFacility, getFacilityAvailability } = useGoogleMaps()
  
  // All reactive refs at the top level
  const mapElement = ref<HTMLElement | null>(null)
  const isLoadingFacilities = ref(false)
  
  // Methods
  const requestLocation = async () => {
    try {
      await getCurrentLocation({ includeAddress: true })
    } catch (error) {
      console.error('Failed to get location:', error)
    }
  }
  
  const selectFacility = (facility: any) => {
    selectMapFacility(facility)
  }
  
  const getDirections = (facility: any) => {
    if (userLocation.value) {
      const origin = `${userLocation.value.lat},${userLocation.value.lng}`
      const destination = `${facility.location.lat},${facility.location.lng}`
      const url = `https://www.google.com/maps/dir/${origin}/${destination}`
      window.open(url, '_blank')
    }
  }
  
  const findEmergencyFacilities = () => {
    const emergencyFacilities = facilities.value.filter((f: any) => 
      f.types.includes('hospital') || 
      f.name.toLowerCase().includes('emergency') ||
      f.name.toLowerCase().includes('urgent')
    )
    
    if (emergencyFacilities.length > 0) {
      const nearest = emergencyFacilities[0]
      getDirections(nearest)
    }
  }
  
  // Watch for location changes to initialize map
  watch(userLocation, async (newLocation) => {
    if (newLocation && mapElement.value) {
      isLoadingFacilities.value = true
      await initializeMap(mapElement.value, { lat: newLocation.lat, lng: newLocation.lng })
      isLoadingFacilities.value = false
    }
  }, { immediate: true })
  
  // Initialize on mount
  onMounted(() => {
    requestLocation()
  })

  definePageMeta({
    layout: "landing"
  })
  </script>
  