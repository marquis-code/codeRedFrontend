<template>
    <div class="space-y-4">
      <!-- Connection Status -->
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-medium flex items-center gap-2">
            <span v-if="isConnected" class="text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12" y2="20"></line>
              </svg>
            </span>
            <span v-else class="text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12" y2="20"></line>
              </svg>
            </span>
            WebSocket Connection
          </h3>
          <span 
            :class="[
              'px-2 py-1 text-xs font-medium rounded-full', 
              isConnected ? 'bg-green-100 text-green-800' : connecting ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
            ]"
          >
            {{ isConnected ? 'Connected' : connecting ? 'Connecting...' : 'Disconnected' }}
          </span>
        </div>
        <div v-if="connectionError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mt-2">
          <span class="block sm:inline">{{ connectionError }}</span>
          <button 
            @click="initializeSocket" 
            class="mt-2 px-3 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800 hover:bg-red-200"
          >
            Retry Connection
          </button>
        </div>
      </div>
  
      <!-- Location Status -->
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Location Information
          </h3>
          <span v-if="hospitalId" class="text-sm text-gray-500">Hospital ID: {{ hospitalId }}</span>
        </div>
        
        <div v-if="locationLoading" class="flex items-center gap-2 text-gray-600">
          <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Getting your location...</span>
        </div>
        
        <div v-else-if="location" class="space-y-2">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Latitude:</strong> {{ location.latitude.toFixed(6) }}
            </div>
            <div>
              <strong>Longitude:</strong> {{ location.longitude.toFixed(6) }}
            </div>
          </div>
          <div v-if="location.address" class="text-sm">
            <strong>Address:</strong> {{ location.address }}
          </div>
          <div v-if="location.accuracy" class="text-sm text-gray-500">
            Accuracy: ±{{ Math.round(location.accuracy) }}m
          </div>
        </div>
        
        <div v-else class="space-y-3">
          <div v-if="locationError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            <span class="block sm:inline">{{ locationError.message }}</span>
          </div>
          <button 
            @click="getCurrentLocation" 
            class="px-3 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            Get Location
          </button>
        </div>
      </div>
  
      <!-- Surge Creation Status -->
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-medium flex items-center gap-2">
            <span v-if="surgeCreated" class="text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
            <span v-else class="text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </span>
            Surge Creation
          </h3>
        </div>
        
        <div v-if="creatingSurge" class="flex items-center gap-2 text-gray-600">
          <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Creating surge...</span>
        </div>
        
        <div v-else-if="surgeCreated" class="space-y-2">
          <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Surge Created Successfully
          </span>
          <p class="text-sm text-gray-500">
            Real-time surge monitoring is now active for this hospital.
          </p>
        </div>
        
        <div v-else class="space-y-2">
          <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Waiting for connection and location...
          </span>
          <div v-if="surgeError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mt-2">
            <span class="block sm:inline">{{ surgeError }}</span>
          </div>
        </div>
      </div>
  
      <!-- Real-time Events -->
      <div v-if="surgeEvents.length > 0" class="bg-white rounded-lg shadow p-4">
        <div class="mb-2">
          <h3 class="text-lg font-medium">Real-time Surge Events</h3>
          <p class="text-sm text-gray-500">
            {{ surgeEvents.length }} event{{ surgeEvents.length !== 1 ? 's' : '' }} received
          </p>
        </div>
        <div class="space-y-2 max-h-60 overflow-y-auto">
          <div 
            v-for="(event, index) in [...surgeEvents].reverse().slice(0, 5)" 
            :key="index" 
            class="p-3 bg-gray-50 rounded-lg text-sm"
          >
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 text-xs font-medium rounded-full border border-gray-300">
                {{ event.surge?.status || 'Unknown' }}
              </span>
              <span class="text-xs text-gray-500">
                {{ new Date(event.timestamp).toLocaleTimeString() }}
              </span>
            </div>
            <div v-if="event.surge?.emergencyType" class="mt-1">
              <strong>Type:</strong> {{ event.surge.emergencyType }}
            </div>
            <div v-if="event.surge?.description" class="mt-1 text-gray-500">
              {{ event.surge.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useSurgeWebSocket } from '@/composables/useSurgeWebSocket'
  
  const {
    // Socket state
    isConnected,
    connectionError,
    connecting,
    lastEvent,
    surgeEvents,
    
    // Location state
    location,
    locationLoading,
    locationError,
    
    // Surge state
    surgeCreated,
    creatingSurge,
    surgeError,
    hospitalId,
    
    // Methods
    initializeSocket,
    getCurrentLocation
  } = useSurgeWebSocket()
  </script>t