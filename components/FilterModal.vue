<template>
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 class="text-lg font-bold mb-4">Filter by</h2>
  
        <!-- Location Filter -->
        <h3 class="text-sm font-semibold mb-2">Location</h3>
        <div class="flex flex-wrap gap-2 mb-4">
          <button v-for="location in locations" :key="location" @click="toggleLocation(location)" :class="selectedLocations.includes(location) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'" class="px-3 py-1 rounded-full text-sm">
            {{ location }}
          </button>
        </div>
  
        <!-- Availability Filter -->
        <h3 class="text-sm font-semibold mb-2">Bed Availability</h3>
        <div class="flex flex-wrap gap-2 mb-4">
          <button v-for="status in statuses" :key="status" @click="toggleStatus(status)" :class="selectedStatuses.includes(status) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'" class="px-3 py-1 rounded-full text-sm">
            {{ status }}
          </button>
        </div>
  
        <!-- Hospital Type Filter -->
        <h3 class="text-sm font-semibold mb-2">Hospital Type</h3>
        <div class="flex flex-wrap gap-2">
          <button v-for="type in types" :key="type" @click="toggleType(type)" :class="selectedTypes.includes(type) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'" class="px-3 py-1 rounded-full text-sm">
            {{ type }}
          </button>
        </div>
  
        <button @click="applyFilters" class="mt-6 w-full bg-red-500 text-white py-2 rounded-md">Apply Filter to Search</button>
        <button @click="$emit('close')" class="mt-4 w-full text-center text-gray-500">Cancel</button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const locations = ['Nearest to you', 'Surulere', 'Oshodi', 'Ikeja', 'Isolo', 'Mushin', 'Yaba', 'Idi-Araba']
  const statuses = ['Available', 'Unavailable', 'Busy']
  const types = ['Teaching Hospital', 'General', 'Private', 'FMC']
  
  const selectedLocations = ref([])
  const selectedStatuses = ref([])
  const selectedTypes = ref([])
  
  const toggleLocation = (location) => {
    // Toggle location filter
  }
  
  const toggleStatus = (status) => {
    // Toggle status filter
  }
  
  const toggleType = (type) => {
    // Toggle type filter
  }
  
  const applyFilters = () => {
    // Emit applied filters
  }
  </script>
  