<template>
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-display font-bold text-gray-900">Location Services</h3>
        <div class="flex items-center space-x-2">
          <div 
            class="w-3 h-3 rounded-full"
            :class="{
              'bg-emerald-500': hasLocation && !error,
              'bg-red-500': error,
              'bg-yellow-500': isLoading,
              'bg-gray-400': !hasLocation && !error && !isLoading
            }"
          ></div>
          <span class="text-sm text-gray-600">
            {{ getStatusText() }}
          </span>
        </div>
      </div>
  
      <!-- Current Location Display -->
      <div v-if="location" class="mb-6 p-4 bg-gray-50 rounded-xl">
        <div class="flex items-start justify-between mb-2">
          <div class="flex-1">
            <h4 class="font-medium text-gray-900 mb-1">Current Location</h4>
            <p v-if="location.address" class="text-sm text-gray-600 mb-2">
              {{ location.address }}
            </p>
            <div class="flex items-center space-x-4 text-xs text-gray-500">
              <span>{{ location.lat.toFixed(6) }}, {{ location.lng.toFixed(6) }}</span>
              <span v-if="locationAge">{{ locationAge }}</span>
              <span v-if="location.accuracy" class="flex items-center space-x-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                <span>±{{ Math.round(location.accuracy) }}m</span>
              </span>
            </div>
          </div>
          <div 
            class="px-2 py-1 rounded-lg text-xs font-medium"
            :class="{
              'bg-emerald-100 text-emerald-800': locationAccuracy === 'high',
              'bg-yellow-100 text-yellow-800': locationAccuracy === 'medium',
              'bg-red-100 text-red-800': locationAccuracy === 'low',
              'bg-gray-100 text-gray-800': locationAccuracy === 'unknown'
            }"
          >
            {{ locationAccuracy }} accuracy
          </div>
        </div>
      </div>
  
      <!-- Error Display -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
        <div class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <h4 class="font-medium text-red-900 mb-1">Location Error</h4>
            <p class="text-sm text-red-700">{{ error }}</p>
            <button 
              v-if="permission.canRequest"
              @click="handleGetLocation"
              class="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
  
      <!-- Action Buttons -->
      <div class="space-y-3">
        <div class="flex space-x-3">
          <button
            @click="handleGetLocation"
            :disabled="isLoading"
            class="flex-1 bg-medical-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <svg v-if="isLoading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            </svg>
            <span>{{ isLoading ? 'Getting Location...' : 'Get My Location' }}</span>
          </button>
  
          <button
            v-if="hasLocation"
            @click="toggleTracking"
            :class="isTracking 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-emerald-500 hover:bg-emerald-600 text-white'"
            class="px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ isTracking ? 'Stop' : 'Track' }}</span>
          </button>
        </div>
  
        <!-- Manual Location Input -->
        <div class="border-t pt-4">
          <div class="flex space-x-2">
            <input
              v-model="manualAddress"
              type="text"
              placeholder="Enter address or coordinates"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-primary focus:border-transparent"
              @keyup.enter="handleManualLocation"
            />
            <button
              @click="handleManualLocation"
              :disabled="!manualAddress.trim() || isLoading"
              class="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Set
            </button>
          </div>
        </div>
      </div>
  
      <!-- Location History -->
      <div v-if="locationHistory.length > 1" class="mt-6 border-t pt-4">
        <h4 class="font-medium text-gray-900 mb-3">Recent Locations</h4>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <button
            v-for="(loc, index) in locationHistory.slice(1, 6)"
            :key="index"
            @click="setLocation(loc)"
            class="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div class="text-sm text-gray-900">
              {{ loc.address || `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}` }}
            </div>
            <div class="text-xs text-gray-500">
              {{ formatTimestamp(loc.timestamp) }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useGeolocation } from '@/composables/useGeolocation'
  import type { LocationData } from '@/composables/useGeolocation'
  
  const {
    location,
    error,
    isLoading,
    permission,
    isTracking,
    locationHistory,
    hasLocation,
    locationAccuracy,
    locationAge,
    getCurrentLocation,
    startTracking,
    stopTracking,
    getLocationFromAddress,
    setManualLocation
  } = useGeolocation()
  
  const manualAddress = ref('')
  
  const emit = defineEmits<{
    locationChanged: [location: LocationData]
  }>()
  
  const getStatusText = () => {
    if (error.value) return 'Error'
    if (isLoading.value) return 'Loading...'
    if (hasLocation.value) return isTracking.value ? 'Tracking' : 'Located'
    return 'No location'
  }
  
  const handleGetLocation = async () => {
    try {
      const loc = await getCurrentLocation({ includeAddress: true })
      emit('locationChanged', loc)
    } catch (err) {
      console.error('Failed to get location:', err)
    }
  }
  
  const toggleTracking = async () => {
    if (isTracking.value) {
      stopTracking()
    } else {
      try {
        await startTracking({ includeAddress: false })
      } catch (err) {
        console.error('Failed to start tracking:', err)
      }
    }
  }
  
  const handleManualLocation = async () => {
    if (!manualAddress.value.trim()) return
  
    try {
      // Check if it's coordinates (lat,lng format)
      const coordMatch = manualAddress.value.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/)
      
      let loc: LocationData
      if (coordMatch) {
        const lat = parseFloat(coordMatch[1])
        const lng = parseFloat(coordMatch[2])
        loc = await setManualLocation(lat, lng, true)
      } else {
        loc = await getLocationFromAddress(manualAddress.value)
      }
      
      emit('locationChanged', loc)
      manualAddress.value = ''
    } catch (err) {
      console.error('Failed to set manual location:', err)
    }
  }
  
  const setLocation = (loc: LocationData) => {
    location.value = loc
    emit('locationChanged', loc)
  }
  
  const formatTimestamp = (timestamp?: number) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.floor(diffMs / 60000)
    
    if (diffMinutes < 1) return 'just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }
  </script>
  