<template>
    <div>
      <!-- Facility Card Skeleton -->
      <div v-if="type === 'facility-card'" class="medical-card p-6 space-y-4">
        <div class="flex items-start space-x-4">
          <div class="skeleton w-16 h-16 rounded-xl"></div>
          <div class="flex-1 space-y-2">
            <div class="skeleton h-6 w-3/4 rounded"></div>
            <div class="skeleton h-4 w-1/2 rounded"></div>
            <div class="skeleton h-4 w-2/3 rounded"></div>
          </div>
        </div>
        <div class="flex space-x-2">
          <div class="skeleton h-8 w-20 rounded-lg"></div>
          <div class="skeleton h-8 w-24 rounded-lg"></div>
        </div>
      </div>
  
      <!-- Map Loading -->
      <div v-else-if="type === 'map'" class="relative w-full h-96 bg-gray-100 rounded-2xl overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center space-y-4">
            <div class="loading-spinner mx-auto"></div>
            <p class="text-gray-600 font-medium">Loading map...</p>
          </div>
        </div>
        <div class="absolute inset-0 skeleton"></div>
      </div>
  
      <!-- Search Results Loading -->
      <div v-else-if="type === 'search'" class="space-y-4">
        <div v-for="i in 3" :key="i" class="medical-card p-4">
          <div class="flex items-center space-x-3">
            <div class="skeleton w-12 h-12 rounded-full"></div>
            <div class="flex-1 space-y-2">
              <div class="skeleton h-5 w-3/4 rounded"></div>
              <div class="skeleton h-4 w-1/2 rounded"></div>
            </div>
            <div class="skeleton w-16 h-8 rounded-lg"></div>
          </div>
        </div>
      </div>
  
      <!-- Directions Loading -->
      <div v-else-if="type === 'directions'" class="space-y-6">
        <div class="skeleton h-64 w-full rounded-2xl"></div>
        <div class="space-y-3">
          <div v-for="i in 4" :key="i" class="flex items-center space-x-3">
            <div class="skeleton w-8 h-8 rounded-full"></div>
            <div class="skeleton h-4 flex-1 rounded"></div>
          </div>
        </div>
      </div>
  
      <!-- Generic Loading Spinner -->
      <div v-else class="flex items-center justify-center p-8">
        <div class="loading-spinner"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    type?: 'facility-card' | 'map' | 'search' | 'directions' | 'spinner'
  }
  
  withDefaults(defineProps<Props>(), {
    type: 'spinner'
  })
  </script>
  