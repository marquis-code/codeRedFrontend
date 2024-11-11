<!-- pages/healthcare-facilities.vue -->
<template>
    <div class="max-w-6xl mx-auto p-4">
      <!-- Search Section -->
      <div class="mb-6 space-y-4">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Search hospitals, clinics, health centers..."
            class="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Icon
            name="heroicons:magnifying-glass"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
          />
          <button
            @click="getCurrentLocation"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 flex items-center"
          >
            <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
            <span class="text-sm">Use my location</span>
          </button>
        </div>
  
        <!-- Search Stats -->
        <div v-if="!loading && facilities.length > 0" class="text-sm text-gray-600">
          Found {{ facilities.length }} healthcare facilities in your area
        </div>
  
        <!-- Filters Toggle -->
        <div class="flex justify-between items-center">
          <button
            @click="showFilters = !showFilters"
            class="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Icon name="heroicons:funnel" class="w-4 h-4 mr-2" />
            Filters ({{ getActiveFiltersCount }})
          </button>
          <div v-if="error" class="text-red-500">
            {{ error }}
          </div>
        </div>
  
        <!-- Filters Section -->
        <div v-if="showFilters" class="bg-white p-4 rounded-lg shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Facility Type Filter -->
            <div class="space-y-2">
              <h3 class="font-medium">Facility Type</h3>
              <div class="space-y-1">
                <label v-for="type in facilityTypes" :key="type" class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    :checked="selectedFilters.facilityType.includes(type)"
                    @change="toggleFilter('facilityType', type)"
                    class="rounded text-primary-500"
                  />
                  <span>{{ type }}</span>
                </label>
              </div>
            </div>
  
            <!-- Services Filter -->
            <div class="space-y-2">
              <h3 class="font-medium">Services</h3>
              <div class="space-y-1">
                <label v-for="service in services" :key="service" class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    :checked="selectedFilters.services.includes(service)"
                    @change="toggleFilter('services', service)"
                    class="rounded text-primary-500"
                  />
                  <span>{{ service }}</span>
                </label>
              </div>
            </div>
  
            <!-- Rating Filter -->
            <div class="space-y-2">
              <h3 class="font-medium">Minimum Rating</h3>
              <select
                v-model="selectedFilters.minRating"
                class="w-full rounded-lg border-gray-300"
              >
                <option value="0">Any rating</option>
                <option v-for="rating in [3, 3.5, 4, 4.5]" :key="rating" :value="rating">
                  {{ rating }}+ stars
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">Searching for healthcare facilities...</p>
      </div>
  
      <!-- No Results -->
      <div v-else-if="filteredFacilities.length === 0" class="text-center py-8">
        <Icon name="heroicons:information-circle" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-600">No healthcare facilities found. Try adjusting your search or filters.</p>
      </div>
  
      <!-- Facility Cards -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="facility in filteredFacilities"
          :key="facility.id"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start justify-between">
              <h3 class="text-lg font-semibold">{{ facility.name }}</h3>
              <span
                v-if="facility.isOpen"
                class="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
              >
                Open Now
              </span>
            </div>
            
            <div class="mt-2 space-y-2">
              <!-- Location -->
              <p class="text-sm text-gray-600 flex items-start">
                <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                <span>{{ facility.location }}</span>
              </p>
  
              <!-- Rating -->
              <div v-if="facility.rating" class="flex items-center space-x-1">
                <div class="flex items-center">
                  <Icon
                    v-for="i in Math.floor(facility.rating)"
                    :key="i"
                    name="heroicons:star-solid"
                    class="w-4 h-4 text-yellow-400"
                  />
                  <Icon
                    v-if="facility.rating % 1 >= 0.5"
                    name="heroicons:star-half-solid"
                    class="w-4 h-4 text-yellow-400"
                  />
                </div>
                <span class="text-sm text-gray-600">
                  {{ facility.rating.toFixed(1) }} ({{ facility.userRatingsTotal }} reviews)
                </span>
              </div>
  
              <!-- Facility Type -->
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="type in facility.types"
                  :key="type"
                  class="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600"
                >
                  {{ formatFacilityType(type) }}
                </span>
              </div>
  
              <!-- Services -->
              <div v-if="facility.services?.length" class="flex flex-wrap gap-1">
                <span
                  v-for="service in facility.services"
                  :key="service"
                  class="px-2 py-0.5 bg-blue-50 rounded-full text-xs text-blue-600"
                >
                  {{ service }}
                </span>
              </div>
            </div>
          </div>
  
          <!-- Actions -->
          <div class="border-t px-4 py-3 bg-gray-50 flex justify-between items-center">
            <a
              :href="`https://www.google.com/maps/place/?q=place_id:${facility.id}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              <Icon name="heroicons:map" class="w-4 h-4 mr-1" />
              View on Map
            </a>
            <a
              v-if="facility.phoneNumber"
              :href="`tel:${facility.phoneNumber}`"
              class="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              <Icon name="heroicons:phone" class="w-4 h-4 mr-1" />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  // Types
  interface HealthcareFacility {
    id: string
    name: string
    location: string
    types: string[]
    rating?: number
    userRatingsTotal?: number
    isOpen?: boolean
    services?: string[]
    phoneNumber?: string
  }
  
  interface FilterState {
    facilityType: string[]
    services: string[]
    minRating: number
  }
  
  // Constants
  const facilityTypes = [
    'Hospital',
    'Clinic',
    'Health Center',
    'Medical Office',
    'Urgent Care',
    'Specialty Center',
    'Diagnostic Center'
  ]
  
  const services = [
    'Emergency Care',
    'Primary Care',
    'Pediatrics',
    'Laboratory',
    'Radiology',
    'Pharmacy',
    'Physical Therapy',
    'Mental Health'
  ]
  
  // State
  const searchQuery = ref('')
  const facilities = ref<HealthcareFacility[]>([])
  const loading = ref(false)
  const error = ref('')
  const showFilters = ref(false)
  
  const selectedFilters = ref<FilterState>({
    facilityType: [],
    services: [],
    minRating: 0
  })
  
  // Computed
  const filteredFacilities = computed(() => {
    return facilities.value.filter(facility => {
      const typeMatch = selectedFilters.value.facilityType.length === 0 ||
        selectedFilters.value.facilityType.some(type => 
          facility.types.some(t => t.toLowerCase().includes(type.toLowerCase()))
        )
      
      const serviceMatch = selectedFilters.value.services.length === 0 ||
        selectedFilters.value.services.some(service => 
          facility.services?.includes(service)
        )
      
      const ratingMatch = !selectedFilters.value.minRating ||
        (facility.rating && facility.rating >= selectedFilters.value.minRating)
      
      return typeMatch && serviceMatch && ratingMatch
    })
  })
  
  const getActiveFiltersCount = computed(() => {
    return selectedFilters.value.facilityType.length +
      selectedFilters.value.services.length +
      (selectedFilters.value.minRating > 0 ? 1 : 0)
  })
  
  // Methods
  const formatFacilityType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }
  
  const getCurrentLocation = async () => {
    loading.value = true
    error.value = ''
  
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
  
      const { latitude, longitude } = position.coords
      searchQuery.value = 'Searching nearby...'
      await searchHealthcareFacilities(latitude, longitude)
    } catch (err) {
      error.value = 'Failed to get your location'
    } finally {
      loading.value = false
    }
  }
  
  const searchHealthcareFacilities = async (lat: number, lng: number) => {
    loading.value = true
    error.value = ''
  
    try {
      // Search for healthcare facilities using multiple types
      const types = ['hospital', 'doctor', 'health', 'clinic', 'medical_office']
      const allResults = []
  
      for (const type of types) {
        const response = await fetch(
          `/api/places/search?lat=${lat}&lng=${lng}&type=${type}&radius=5000`
        )
        const data = await response.json()
        allResults.push(...data.results)
      }
  
      // Remove duplicates based on place_id
      const uniqueResults = Array.from(
        new Map(allResults.map(item => [item.place_id, item])).values()
      )
  
      facilities.value = uniqueResults.map((facility: any) => ({
        id: facility.place_id,
        name: facility.name,
        location: facility.vicinity,
        types: facility.types,
        rating: facility.rating,
        userRatingsTotal: facility.user_ratings_total,
        isOpen: facility.opening_hours?.open_now,
        services: generateRandomServices(), // In real app, get from facility details
        phoneNumber: facility.formatted_phone_number
      }))
    } catch (err) {
      error.value = 'Failed to fetch healthcare facilities'
    } finally {
      loading.value = false
    }
  }
  
  const generateRandomServices = () => {
    // Temporary function to simulate services data
    return services
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 4) + 1)
  }
  
  // Search handler with debounce
  let searchTimeout: NodeJS.Timeout
  const handleSearch = async () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
      if (searchQuery.value.length < 3) return
  
      loading.value = true
      try {
        // First get coordinates for the search query
        const geocodeResponse = await fetch(
          `/api/geocode?address=${encodeURIComponent(searchQuery.value)}`
        )
        const geocodeData = await geocodeResponse.json()
  
        if (geocodeData.results[0]) {
          const { lat, lng } = geocodeData.results[0].geometry.location
          await searchHealthcareFacilities(lat, lng)
        }
      } catch (err) {
        error.value = 'Failed to search location'
      } finally {
        loading.value = false
      }
    }, 500)
  }
  
  const toggleFilter = (type: keyof FilterState, value: string | number) => {
    if (type === 'minRating') {
      selectedFilters.value.minRating = value as number
    } else {
      const index = selectedFilters.value[type as 'facilityType' | 'services'].indexOf(value as string)
      if (index === -1) {
        selectedFilters.value[type as 'facilityType' | 'services'].push(value as string)
      } else {
        selectedFilters.value[type as 'facilityType' | 'services'].splice(index, 1)
      }
    }
  }
  
  // Lifecycle
  onMounted(() => {
    getCurrentLocation()
  })
  
  // Cleanup
  onUnmounted(() => {
    clearTimeout(searchTimeout)
  })
  </script>