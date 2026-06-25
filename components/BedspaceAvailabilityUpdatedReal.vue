<template>
    <main>
      <div class="container mx-auto">
        <section class="p-3 lg:p-6 bg-[#FFF9F9CC] max-w-7xl mx-auto">
          <div class="flex items-center border-2 border-red-600 rounded-lg bg-white p-3 shadow-lg">
            <!-- Simplified search icon -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="black" stroke-width="2" fill="none"/>
              <path d="m21 21-4.35-4.35" stroke="black" stroke-width="2"/>
            </svg>
            <input 
              ref="inputRef" 
              type="text" 
              @keyup.enter="handleEnter" 
              v-model="searchQuery" 
              placeholder="Search by name or location..." 
              class="flex-grow outline-none text-gray-500 py-5 bg-white" 
            />
            <!-- <button @click="performSearch" :disabled="isLoading" class="bg-black text-white rounded-lg p-2 ml-4 flex justify-center items-center disabled:opacity-50">
              <div v-if="isLoading" class="spinner-tiny"></div>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button @click="requestLocationAccess" :disabled="locationStatus === 'loading'" class="text-gray-500 ml-4" title="Use my location">
              <div v-if="locationStatus === 'loading'" class="spinner-tiny"></div>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
            </button> -->
            <button @click="showFilterModal = true" class="text-gray-500 ml-4">
              <!-- Simplified filter icon -->
              <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9516 9.787H6.39369M6.39369 9.787C6.39369 10.3652 6.17789 10.9197 5.79544 11.3285C5.41299 11.7373 4.89427 11.967 4.3534 11.967C3.81253 11.967 3.29381 11.7373 2.91136 11.3285C2.5289 10.9197 2.31404 10.3652 2.31404 9.787M6.39369 9.787C6.39369 9.20883 6.17789 8.65434 5.79544 8.24551C5.41299 7.83668 4.89427 7.607 4.3534 7.607C3.81253 7.607 3.29381 7.83668 2.91136 8.24551C2.5289 8.65434 2.31404 9.20883 2.31404 9.787M2.31404 9.787H0.645142M17.9516 16.394H12.5744M12.5744 16.394C12.5744 16.9723 12.3591 17.5274 11.9765 17.9363C11.594 18.3453 11.0751 18.575 10.5341 18.575C9.99327 18.575 9.47455 18.3443 9.0921 17.9355C8.70965 17.5267 8.49479 16.9722 8.49479 16.394M12.5744 16.394C12.5744 15.8157 12.3591 15.2616 11.9765 14.8527C11.594 14.4437 11.0751 14.214 10.5341 14.214C9.99327 14.214 9.47455 14.4437 9.0921 14.8525C8.70965 15.2613 8.49479 15.8158 8.49479 16.394M8.49479 16.394H0.645142M17.9516 3.18H15.0469M15.0469 3.18C15.0469 3.46628 14.9932 3.74976 14.8907 4.01425C14.7883 4.27874 14.638 4.51906 14.4487 4.72149C14.2593 4.92392 14.0345 5.0845 13.7871 5.19406C13.5396 5.30361 13.2744 5.36 13.0066 5.36C12.4658 5.36 11.947 5.13032 11.5646 4.72149C11.1821 4.31266 10.9673 3.75817 10.9673 3.18M15.0469 3.18C15.0469 2.89372 14.9932 2.61024 14.8907 2.34575C14.7883 2.08126 14.638 1.84094 14.4487 1.63851C14.2593 1.43608 14.0345 1.2755 13.7871 1.16594C13.5396 1.05639 13.2744 1 13.0066 1C12.4658 1 11.947 1.22968 11.5646 1.63851C11.1821 2.04734 10.9673 2.60183 10.9673 3.18M10.9673 3.18H0.645142" stroke="black" stroke-opacity="0.8" stroke-miterlimit="10" stroke-linecap="round"/>
</svg>

            </button>
          </div>
        </section>
  
        <!-- Location Status -->
        <!-- <div v-if="locationStatus !== 'disabled'" class="max-w-7xl mx-auto px-3 lg:px-6 mb-4">
          <div class="flex items-center gap-2 text-sm" :class="locationStatusClass">
            <div v-if="locationStatus === 'loading'" class="spinner-tiny"></div>
            <svg v-else-if="locationStatus === 'enabled'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>{{ locationStatusText }}</span>
          </div>
        </div> -->
  
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center text-gray-600 py-10 max-w-xs mx-auto">
          <div class="spinner"></div>
          <p class="mt-4">Finding hospitals near you...</p>
        </div>
  
        <!-- Empty state - no location and no search -->
        <div v-else-if="!hasSearched && displayedHospitals.length === 0" class="text-center text-gray-600 border rounded border-gray-100 py-6">
          <div class="flex justify-center items-center flex-col gap-y-2">
            <svg class="h-20 w-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <p>Search for hospitals by name or location</p>
            <p class="text-sm text-gray-400">Or click the location button to find nearby hospitals</p>
          </div>
        </div>
  
        <!-- Empty state - no hospitals found after search -->
        <div v-else-if="hasSearched && displayedHospitals.length === 0" class="text-center text-gray-600 py-10">
          <div class="flex justify-center items-center flex-col gap-y-2">
            <svg class="h-20 w-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291.94-5.709 2.291"></path>
            </svg>
            <p>No hospitals found for your search</p>
            <p class="text-sm text-gray-400">Try a different location or search term</p>
            <button @click="resetSearch" class="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Reset Search
            </button>
          </div>
        </div>
  
        <!-- Hospital Results -->
        <div v-else-if="displayedHospitals.length > 0" class="p-4">
          <p class="text-gray-600 mb-4">
            {{ userLocation.lat && userLocation.lng ? 'Results are filtered based on your location' : 'Showing search results - enable location for nearby hospitals' }}
          </p>

          
          <div class="flex space-x-4 overflow-x-auto custom-scrollbar pb-4">
            <HospitalCard
              v-for="hospital in displayedHospitals"
              :key="hospital.place_id || hospital._id"
              :hospital="hospital"
              :is-clicking="clickingHospital === (hospital._id || hospital.place_id)"
              @click="handleHospitalClick(hospital)"
            />
          </div>
  
          <!-- View All Button -->
          <!-- <div v-if="!viewAll && combinedHospitals.length > 6" class="text-center mt-6">
            <button @click="viewAll = true" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
              View All Hospitals ({{ combinedHospitals.length }})
            </button>
          </div> -->
        </div>
  
        <!-- View all link -->
  <div class="flex justify-end items-end px-6">
    <NuxtLink v-if="displayedHospitals.length" to="/view-all" class="mt-4 pl-6 text-red-600">
          View all results
        </NuxtLink>
  </div>
  
        <!-- Filter modal -->
        <FilterModal 
          v-if="showFilterModal" 
          :filters="filters"
          @filters-applied="applyFilters" 
          @close="showFilterModal = false" 
          @apply="applyFilters"
        />
  
        <!-- Map modal -->
        <div v-if="showMap" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div class="relative bg-white w-full max-w-lg h-3/4 m-3 rounded-lg shadow-lg overflow-hidden">
            <button @click="showMap = false" class="absolute z-50 top-4 right-4 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <MapViews :hospital="selectedHospital" :userLocation="userLocation" />
          </div>
        </div>
  
        <!-- Hospital Details Modal -->
        <HospitalModal
          v-if="selectedHospital"
          :hospital="selectedHospital"
          :user-location="userLocation"
          @close="selectedHospital = null"
        />
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  // All imports at the very top
  import { ref, onMounted, computed, watch, onUnmounted, shallowRef } from "vue"
  import { useRouter } from "vue-router"
  import { useNuxtApp, useRuntimeConfig } from "#app"
  import { useDebounceFn } from '@vueuse/core'
  import { useFetchNearbyHospitals } from "@/composables/modules/hospitals/useFetchNearbyHospitals"
  import { useFetchHospitals } from "@/composables/modules/hospitals/useFetchHospitals"
  import { useMapboxAutocomplete } from "@/composables/core/useMapboxAutocomplete"
  import { useCustomToast } from "@/composables/core/useCustomToast"
  import { useWebSocketConnection } from "@/composables/useWebSocketConnection"
  import HospitalCard from "@/components/HospitalCard.vue"
  import FilterModal from "@/components/FilterModal.vue"
  import MapViews from "@/components/MapViews.vue"
  import HospitalModal from "@/components/HospitalModal.vue"
  
  // Initialize all composables immediately at top level - no conditions
  const { showToast } = useCustomToast()
  const router = useRouter()
  const config = useRuntimeConfig()
  const { 
    sendHospitalClick, 
    getHospitalClickStats, 
    subscribeToHospitalClicks,
    hospitalClickStats,
    lastClickResponse,
    clickInProgress,
    surgeEvents,
    isConnected: wsConnected,
    enableDebugMode
  } = useWebSocketConnection()
  const { fetchNearbyHospitals, nearbyHospitals, loading: fetchingNearbyHospitals } = useFetchNearbyHospitals()
  const { hospitals: hospitalsList, loading: fetchingHospitals } = useFetchHospitals()
  
  // All reactive state defined immediately - no conditions
  const hospitals = shallowRef([])
  const apiHospitals = shallowRef([])
  const searchQuery = ref('')
  const isLoading = ref(false)
  const viewAll = ref(false)
  const showFilterModal = ref(false)
  const selectedHospital = ref(null)
  const userLocation = ref({ lat: null, lng: null })
  const inputRef = ref<HTMLInputElement | null>(null)
  const hasSearched = ref(false)
  const locationStatus = ref<'disabled' | 'loading' | 'enabled'>('disabled')
  const clickingHospital = ref<string | null>(null)
  const query = ref('')
  const loading = ref(false)
  const showMap = ref(false)
  const selectedLocation = ref('')
  const selectedBedAvailability = ref('')
  const selectedSpeciality = ref('')
  const selectedHospitalType = ref('')
  const filters = ref({
    hospitalType: '',
    speciality: '',
    bedAvailability: '',
    location: ''
  })
  const cache = ref<{ query: string; hospitals: any[]; timestamp: number } | null>(null)
  
  // All computed properties defined immediately - no conditions
  const debouncedSearch = useDebounceFn(() => {
    if (searchQuery.value.trim()) {
      performSearch()
    }
  }, 500)
  
  const locationStatusClass = computed(() => ({
    'text-green-600': locationStatus.value === 'enabled',
    'text-blue-600': locationStatus.value === 'loading',
    'text-gray-600': locationStatus.value === 'disabled'
  }))
  
  const locationStatusText = computed(() => {
    switch (locationStatus.value) {
      case 'enabled': return 'Location enabled - showing nearby hospitals'
      case 'loading': return 'Getting your location...'
      default: return 'Location disabled'
    }
  })
  
  const combinedHospitals = computed(() => {
    const combined = []
    const apiHospitalMap = new Map()
    
    if (apiHospitals.value?.length > 0) {
      for (const hospital of apiHospitals.value) {
        const processedHospital = {
          ...hospital,
          isCodeRed: true,
          availability: getAvailabilityStatus(hospital.overallBedStatus),
          place_id: hospital._id,
          lastUpdated: new Date().toISOString()
        }
        combined.push(processedHospital)
        apiHospitalMap.set(hospital.hospitalName?.toLowerCase(), true)
      }
    }
    
    if (hospitals.value?.length > 0) {
      for (const hospital of hospitals.value) {
        const name = hospital.name?.toLowerCase()
        if (!apiHospitalMap.has(name)) {
          combined.push({
            ...hospital,
            isCodeRed: false,
            availability: mockAvailability()
          })
        }
      }
    }
    
    return addDistanceAndSort(combined)
  })
  
  const displayedHospitals = computed(() => {
    let filtered = combinedHospitals.value
    
    if (filters.value.bedAvailability) {
      filtered = filtered.filter(h => h.availability === filters.value.bedAvailability.toLowerCase())
    }
    
    return viewAll.value ? filtered : filtered.slice(0, 6)
  })
  
  // All watchers defined immediately - no conditions
  watch(nearbyHospitals, (newHospitals) => {
    if (newHospitals && newHospitals.length > 0) {
      console.log("📊 Nearby hospitals updated:", newHospitals)
      apiHospitals.value = newHospitals
    }
  }, { immediate: true, deep: true })
  
  watch(surgeEvents, (newEvents) => {
    if (newEvents.length > 0) {
      const latestEvent = newEvents[newEvents.length - 1]
      console.log('🚨 New surge event detected:', latestEvent)
      showToast({
        title: '🚨 SURGE ALERT!',
        message: `Surge triggered at hospital! Emergency response activated.`,
        toastType: 'error',
        duration: 12000
      })
    }
  }, { deep: true })
  
  watch(lastClickResponse, (response) => {
    if (response) {
      console.log('📱 Last click response updated:', response)
    }
  })
  
  watch([
    selectedLocation,
    selectedBedAvailability,
    selectedSpeciality,
    selectedHospitalType,
  ], ([newLocation, newAvailability, newSpecialities, newType]) => {
    fetchHospitals()
  }, { immediate: false, deep: false })
  
  // Constants
  const MAX_DISTANCE = 10
  const LOCATION_CACHE_KEY = 'userLocation'
  const LOCATION_CACHE_EXPIRY = 5 * 60 * 1000
  const CACHE_EXPIRY_TIME = 10 * 60 * 1000
  
  // Utility functions
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }
  
  const getCachedLocation = () => {
    if (process.client) {
      try {
        const cached = localStorage.getItem(LOCATION_CACHE_KEY)
        if (cached) {
          const { location, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < LOCATION_CACHE_EXPIRY) {
            return location
          }
        }
      } catch (error) {
        console.error('Error reading cached location:', error)
      }
    }
    return null
  }
  
  const cacheLocation = (location: { lat: number; lng: number }) => {
    if (process.client) {
      try {
        localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify({
          location,
          timestamp: Date.now()
        }))
      } catch (error) {
        console.error('Error caching location:', error)
      }
    }
  }
  
  const getAvailabilityStatus = (status: string) => {
    const statusLower = status?.toLowerCase()
    if (statusLower === 'available') return 'available'
    if (statusLower === 'limited') return 'busy'
    return 'unavailable'
  }
  
  const addDistanceAndSort = (hospitalList: any[]) => {
    if (!userLocation.value.lat || !userLocation.value.lng) {
      return hospitalList
    }
    
    const withDistance = hospitalList.map(hospital => {
      const lat = hospital.latitude || hospital.geometry?.location?.lat?.() || hospital.geometry?.location?.lat
      const lng = hospital.longitude || hospital.geometry?.location?.lng?.() || hospital.geometry?.location?.lng
      
      if (lat && lng) {
        const distance = calculateDistance(userLocation.value.lat, userLocation.value.lng, lat, lng)
        return { ...hospital, distance }
      }
      return hospital
    })
    
    return withDistance.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity))
  }
  
  const mockAvailability = () => {
    const statuses = ["available", "unavailable", "busy"]
    return statuses[Math.floor(Math.random() * statuses.length)]
  }
  
  const mockPricing = () => {
    const priceStatus = ["high", "affordable", "average"]
    return priceStatus[Math.floor(Math.random() * priceStatus.length)]
  }
  
  const mockHospitalType = () => {
    const hospitalTypes = [
      "Teaching Hospital",
      "General",
      "Private",
      "FMC",
      "Specialist Hospital",
      "Primary Healthcare Center",
    ]
    return hospitalTypes[Math.floor(Math.random() * hospitalTypes.length)]
  }
  
  const specialities = [
    "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Emergency Medicine",
    "Diabetes", "Sickle cell crisis", "Hypertensive related crisis", "Asthma",
    "Drug overdose", "Mania", "Panic attacks", "Shortness of breath",
    "Fainting/Syncope", "Seizures/Epilepsy", "Bleeding", "Falls", "Stomach ache",
    "Headache", "Chest pain", "Fever", "Cough", "Fracture", "Gun shot",
    "Pregnancy", "Labour pain", "Newborn care", "Car accidents",
    "Workplace accidents", "Pain", "Swelling",
  ]
  
  const mockSpecialities = () => {
    const numberOfSpecialities = Math.floor(Math.random() * 3) + 1
    const shuffledSpecialities = [...specialities].sort(() => 0.5 - Math.random())
    return shuffledSpecialities.slice(0, numberOfSpecialities)
  }
  
  // Main functions
  const requestLocationAccess = async () => {
    if (locationStatus.value === 'loading') return
    
    locationStatus.value = 'loading'
    
    try {
      await getUserLocationWithPermission()
      locationStatus.value = 'enabled'
      showToast({
        title: 'Location Enabled',
        message: 'Now showing hospitals near your location',
        toastType: 'success',
        duration: 3000
      })
    } catch (error) {
      locationStatus.value = 'disabled'
      console.error('❌ Location access failed:', error)
      showToast({
        title: 'Location Access Failed',
        message: 'You can still search for hospitals manually using the search bar.',
        toastType: 'warning',
        duration: 5000
      })
    }
  }
  
  const handleHospitalClick = async (hospital: any) => {
    console.log(hospital, 'selected hospital here')
    const hospitalId = hospital._id || hospital.place_id

    const hospitalCoordinates = { lat: hospital?.latitude, lng: hospital?.longitude }
    
    
    try {
      clickingHospital.value = hospitalId
      
      if (typeof sendHospitalClick === 'function') {
        await sendHospitalClick(hospitalId, hospitalCoordinates)
      }
      
      selectedHospital.value = hospital
      
    } catch (error) {
      console.error('Error handling hospital click:', error)
      showToast({
        title: 'Error',
        message: 'Failed to load hospital details',
        toastType: 'error',
        duration: 3000
      })
    } finally {
      selectedHospital.value = hospital //This should be taken out when we have real hospitals onboarded
      clickingHospital.value = null
    }
  }
  
  const updateHospital = (updatedHospital) => {
    const index = apiHospitals.value.findIndex(h => h._id === updatedHospital._id || h.id === updatedHospital.id)
    if (index !== -1) {
      apiHospitals.value[index] = {
        ...apiHospitals.value[index],
        ...updatedHospital,
        lastUpdated: new Date().toISOString()
      }
    } else {
      const googleIndex = hospitals.value.findIndex(h => 
        h.place_id === updatedHospital.place_id || 
        (h.name && updatedHospital.name && h.name.toLowerCase() === updatedHospital.name.toLowerCase())
      )
      if (googleIndex !== -1) {
        hospitals.value[googleIndex] = {
          ...hospitals.value[googleIndex],
          ...updatedHospital,
          lastUpdated: new Date().toISOString()
        }
      }
    }
  }
  
  const applyFilters = (newFilters) => {
    console.log(newFilters, "filters here")
    selectedLocation.value = newFilters?.location || ""
    selectedBedAvailability.value = newFilters.status || ""
    selectedSpeciality.value = newFilters.speciality || ""
    selectedHospitalType.value = newFilters.hospitalType || ""
    showFilterModal.value = false
  }
  
  const getUserLocationWithPermission = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'))
        return
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          userLocation.value = { lat, lng }
          console.log("📍 User coordinates:", userLocation.value)
  
          cacheLocation(userLocation.value)
  
          try {
            const mapboxToken = config.public.mapboxAccessToken
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?country=ng&access_token=${mapboxToken}`)
            const results = await response.json()

            if (results.features && results.features.length > 0) {
              query.value = results.features[0].place_name
              console.log("📍 User location (address):", query.value)
            }
            
            fetchNearbyHospitalsFromAPI(lat, lng)
            fetchHospitalsByLocation(lat, lng)
            resolve()
          } catch (error) {
            console.error("❌ Error during reverse geocoding:", error)
            fetchNearbyHospitalsFromAPI(userLocation.value.lat, userLocation.value.lng)
            fetchHospitalsByLocation(userLocation.value.lat, userLocation.value.lng)
            resolve()
          }
        },
        (error) => {
          console.error("❌ Error retrieving geolocation:", error)
          let errorMessage = 'Location access failed'
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access was denied by user'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable'
              break
            case error.TIMEOUT:
              errorMessage = 'Location request timed out'
              break
          }
          reject(new Error(errorMessage))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      )
    })
  }
  
  const initializeLocationSilently = async () => {
    const cachedLocation = getCachedLocation()
    if (cachedLocation) {
      console.log('📍 Using cached location:', cachedLocation)
      userLocation.value = cachedLocation
      locationStatus.value = 'enabled'
      
      fetchNearbyHospitalsFromAPI(cachedLocation.lat, cachedLocation.lng)
      fetchHospitalsByLocation(cachedLocation.lat, cachedLocation.lng)
      return
    }
  
    try {
      locationStatus.value = 'loading'
      await getUserLocationWithPermission()
      locationStatus.value = 'enabled'
    } catch (error) {
      console.log('Location not available, continuing without it')
      locationStatus.value = 'disabled'
      loadDefaultHospitals()
    }
  }
  
  const loadDefaultHospitals = async () => {
    const DEFAULT_LAT = 6.5568768
    const DEFAULT_LNG = 3.325952
    
    try {
      await fetchNearbyHospitalsFromAPI(DEFAULT_LAT, DEFAULT_LNG)
      fetchHospitalsByLocation(DEFAULT_LAT, DEFAULT_LNG)
    } catch (error) {
      console.error("❌ Error loading default hospitals:", error)
    }
  }
  
  const fetchNearbyHospitalsFromAPI = async (lat: number, lng: number) => {
    loading.value = true
    try {
      console.log(`🔍 Fetching nearby hospitals from API with coordinates: lat=${lat}, lng=${lng}, maxDistance=${MAX_DISTANCE}`)
      await fetchNearbyHospitals(lat, lng, MAX_DISTANCE)
      console.log("📊 Nearby hospitals after fetch:", nearbyHospitals.value)
    } catch (error) {
      console.error("❌ Error fetching nearby hospitals from API:", error)
      showToast({
        title: "Error",
        message: "Failed to fetch nearby hospitals from our database.",
        toastType: "error",
        duration: 3000,
      })
    } finally {
      loading.value = false
    }
  }
  
  const fetchHospitalsByLocation = async (lat, lng) => {
    loading.value = true
    hospitals.value = []
  
    try {
      console.log("🔍 Fetching hospitals near coordinates:", { lat, lng })
      const mapboxToken = config.public.mapboxAccessToken
  
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?country=ng&proximity=${lng},${lat}&access_token=${mapboxToken}`)
      const data = await response.json()
  
      if (data.features && data.features.length > 0) {
        hospitals.value = data.features.map((hospital) => ({
          ...hospital,
          place_id: hospital.id,
          name: hospital.text,
          vicinity: hospital.place_name,
          availability: mockAvailability(),
          pricing: mockPricing(),
          specialities: mockSpecialities(),
          hospitalType: mockHospitalType(),
          latitude: hospital.center[1],
          longitude: hospital.center[0],
        }))
        console.log("🏥 Hospitals found near location:", hospitals.value)
      } else {
        console.error("❌ No hospitals found nearby.")
        showToast({
          title: "Error",
          message: "No hospitals found near your location.",
          toastType: "error",
          duration: 3000,
        })
      }
    } catch (error) {
      console.error("❌ Error fetching hospitals near location:", error)
      showToast({
        title: "Error",
        message: "An error occurred while fetching hospitals.",
        toastType: "error",
        duration: 3000,
      })
    } finally {
      loading.value = false
    }
  }
  
  const fetchHospitals = async () => {
    if (!query.value && 
        !selectedLocation.value && 
        !selectedBedAvailability.value && 
        !selectedSpeciality.value && 
        !selectedHospitalType.value) {
      showToast({
        title: "Error",
        message: "Please enter a location, hospital name, or select filters to search.",
        toastType: "error",
        duration: 3000,
      })
      return
    }
  
    hasSearched.value = true
  
    if (cache.value && 
        cache.value.query === query.value && 
        Date.now() - cache.value.timestamp < CACHE_EXPIRY_TIME) {
      console.log("📦 Serving hospitals from cache:", cache.value.hospitals)
      hospitals.value = cache.value.hospitals
      return
    }
  
    loading.value = true
    hospitals.value = []
  
    try {
      if (selectedLocation.value) {
        query.value = selectedLocation.value
      }
  
      console.log("🔍 Searching for hospitals with query:", query.value)

      let searchLng = userLocation.value?.lng
      let searchLat = userLocation.value?.lat
      const mapboxToken = config.public.mapboxAccessToken

      if (query.value && (!searchLng || !searchLat)) {
        const geocodeRes = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query.value)}.json?country=ng&access_token=${mapboxToken}`)
        const geocodeData = await geocodeRes.json()
        if (geocodeData.features && geocodeData.features.length > 0) {
          searchLng = geocodeData.features[0].center[0]
          searchLat = geocodeData.features[0].center[1]
        }
      }
      
      let apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?country=ng&access_token=${mapboxToken}`
      if (searchLng && searchLat) {
        apiUrl += `&proximity=${searchLng},${searchLat}`
      } else {
        apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query.value + " hospital")}.json?country=ng&access_token=${mapboxToken}`
      }

      const response = await fetch(apiUrl)
      const data = await response.json()
  
      if (data.features && data.features.length > 0) {
        let fetchedHospitals = data.features.map((hospital) => ({
          ...hospital,
          place_id: hospital.id,
          name: hospital.text,
          vicinity: hospital.place_name,
          availability: mockAvailability(),
          pricing: mockPricing(),
          specialities: mockSpecialities(),
          hospitalType: mockHospitalType(),
          latitude: hospital.center[1],
          longitude: hospital.center[0],
        }))
  
        if (selectedBedAvailability.value) {
          fetchedHospitals = fetchedHospitals.filter((hospital) =>
            hospital.availability.toLowerCase() === selectedBedAvailability.value.toLowerCase()
          )
        }
  
        if (selectedSpeciality.value) {
          fetchedHospitals = fetchedHospitals.filter((hospital) =>
            hospital.specialities.includes(selectedSpeciality.value)
          )
        }
  
        if (selectedHospitalType.value) {
          console.log(selectedHospitalType.value, "here again")
          fetchedHospitals = fetchedHospitals.filter((hospital) => 
            hospital.hospitalType === selectedHospitalType.value
          )
        }
  
        cache.value = {
          query: query.value || "",
          hospitals: fetchedHospitals,
          timestamp: Date.now(),
        }
  
        hospitals.value = fetchedHospitals
        console.log("🏥 Filtered hospitals:", hospitals.value)
      } else {
        console.error("❌ No hospitals found.")
        showToast({
          title: "Error",
          message: "No hospitals found.",
          toastType: "error",
          duration: 3000,
        })
      }
    } catch (error) {
      console.error("❌ Error fetching hospitals:", error)
      showToast({
        title: "Error",
        message: "An error occurred while fetching hospitals. Try again later.",
        toastType: "error",
        duration: 3000,
      })
    } finally {
      loading.value = false
    }
  }
  
  const handleEnter = () => {
    fetchHospitals()
  }
  
  const { initializeAutocomplete: initAutocomplete } = useMapboxAutocomplete({ address: '', latitude: 0, longitude: 0 });
  const initializeAutocomplete = () => {
    if (inputRef.value) {
      initAutocomplete(inputRef.value);
    }
  }
  
  const performSearch = () => {
    fetchHospitals()
  }
  
  const resetSearch = () => {
    searchQuery.value = ''
    hasSearched.value = false
    hospitals.value = []
  }
  
  // Lifecycle hooks at the very end
  onMounted(async () => {
    console.log('🚀 Mounting BedspaceAvailability component')
    
    enableDebugMode()
    
    loading.value = true
  
    await initializeLocationSilently()
  
    if (inputRef.value) {
      initializeAutocomplete()
    }
  
    loading.value = false
  })
  
  onUnmounted(() => {
    console.log('🧹 Cleaning up component')
  })
  </script>
  
  <style scoped>
  .hospital-card {
    min-width: 240px;
  }
  
  .hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
  
  .spinner-small {
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid #ffffff;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
  
  .spinner-tiny {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top: 2px solid currentColor;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .custom-scrollbar {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 8px;
    scrollbar-width: thin;
    scrollbar-color: #b3b3b3 transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #b3b3b3;
    border-radius: 10px;
  }
  
  .hospital-card {
    width: 16rem;
    min-width: 16rem;
  }
  </style>
  