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
            <button @click="performSearch" :disabled="isLoading" class="bg-black text-white rounded-lg p-2 ml-4 flex justify-center items-center disabled:opacity-50">
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
            </button>
            <button @click="showFilterModal = true" class="text-gray-500 ml-4">
              <!-- Simplified filter icon -->
              <svg width="19" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" stroke="black" stroke-width="2" fill="none"/>
              </svg>
            </button>
          </div>
        </section>
  
        <!-- Location Status -->
        <div v-if="locationStatus !== 'disabled'" class="max-w-7xl mx-auto px-3 lg:px-6 mb-4">
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
        </div>
  
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
            {{ userLocation.lat && userLocation.lng ? 'Results filtered by your location' : 'Showing search results - enable location for nearby hospitals' }}
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
          <div v-if="!viewAll && combinedHospitals.length > 6" class="text-center mt-6">
            <button @click="viewAll = true" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
              View All Hospitals ({{ combinedHospitals.length }})
            </button>
          </div>
        </div>
  
        <!-- View all link -->
        <NuxtLink v-if="displayedHospitals.length" to="/view-all" class="mt-4 pl-6 text-red-600">
          View all results
        </NuxtLink>
  
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
  import { Loader } from "@googlemaps/js-api-loader"
  import { ref, onMounted, computed, watch, onUnmounted, shallowRef } from "vue"
  import { useRouter } from "vue-router"
  import { useNuxtApp } from "#app"
  import { useDebounceFn } from '@vueuse/core'
  import { useFetchNearbyHospitals } from "@/composables/modules/hospitals/useFetchNearbyHospitals"
  import { useFetchHospitals } from "@/composables/modules/hospitals/useFetchHospitals"
  import { useCustomToast } from "@/composables/core/useCustomToast"
  import { useWebSocketConnection } from "@/composables/useWebSocketConnection"
  import HospitalCard from "@/components/HospitalCard.vue"
  import FilterModal from "@/components/FilterModal.vue"
  import MapViews from "@/components/MapViews.vue"
  import HospitalModal from "@/components/HospitalModal.vue"
  
  // Initialize all composables immediately at top level - no conditions
  const { showToast } = useCustomToast()
  const router = useRouter()
  const { $loadGoogleMaps } = useNuxtApp()
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
            const google = await $loadGoogleMaps()
            if (!google) {
              console.error("❌ Google Maps API failed to load.")
              reject(new Error('Google Maps API not loaded'))
              return
            }
  
            const geocoder = new google.maps.Geocoder()
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
              if (status === "OK" && results[0]?.formatted_address) {
                query.value = results[0].formatted_address
                console.log("📍 User location (address):", query.value)
              }
              
              fetchNearbyHospitalsFromAPI(lat, lng)
              fetchHospitalsByLocation(lat, lng)
              resolve()
            })
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
      const google = await $loadGoogleMaps()
      if (!google) {
        console.error("❌ Google Maps API failed to load.")
        showToast({
          title: "Error",
          message: "Google Maps API not loaded. Try again later.",
          toastType: "error",
          duration: 3000,
        })
        return
      }
  
      const service = new google.maps.places.PlacesService(document.createElement("div"))
      service.nearbySearch(
        {
          location: new google.maps.LatLng(lat, lng),
          rankBy: google.maps.places.RankBy.DISTANCE,
          type: "hospital",
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            hospitals.value = results.map((hospital) => ({
              ...hospital,
              availability: mockAvailability(),
              pricing: mockPricing(),
              specialities: mockSpecialities(),
              hospitalType: mockHospitalType(),
              latitude: hospital.geometry.location.lat(),
              longitude: hospital.geometry.location.lng(),
            }))
            console.log("🏥 Hospitals found near location:", hospitals.value)
          } else {
            console.error("❌ No hospitals found nearby. Status:", status)
            showToast({
              title: "Error",
              message: "No hospitals found near your location.",
              toastType: "error",
              duration: 3000,
            })
          }
          loading.value = false
        }
      )
    } catch (error) {
      console.error("❌ Error fetching hospitals near location:", error)
      showToast({
        title: "Error",
        message: "An error occurred while fetching hospitals.",
        toastType: "error",
        duration: 3000,
      })
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
      const google = await $loadGoogleMaps()
      if (!google) {
        console.error("❌ Google Maps API failed to load.")
        showToast({
          title: "Error",
          message: "Google Maps API not loaded. Try again later.",
          toastType: "error",
          duration: 3000,
        })
        return
      }
  
      const service = new google.maps.places.PlacesService(document.createElement("div"))
      service.textSearch(
        { query: query.value || "", type: "hospital" },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            let fetchedHospitals = results.map((hospital) => ({
              ...hospital,
              name: hospital.name,
              vicinity: hospital.vicinity || hospital.formatted_address,
              availability: mockAvailability(),
              pricing: mockPricing(),
              specialities: mockSpecialities(),
              hospitalType: mockHospitalType(),
              latitude: hospital.geometry.location.lat(),
              longitude: hospital.geometry.location.lng(),
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
            console.error(`❌ Google Places textSearch error: ${status}`)
            showToast({
              title: "Error",
              message: `Search failed with status: ${status}`,
              toastType: "error",
              duration: 3000,
            })
          }
          loading.value = false
        }
      )
    } catch (error) {
      console.error("❌ Error fetching hospitals:", error)
      showToast({
        title: "Error",
        message: "An error occurred while fetching hospitals. Try again later.",
        toastType: "error",
        duration: 3000,
      })
      loading.value = false
    }
  }
  
  const handleEnter = () => {
    fetchHospitals()
  }
  
  const initializeAutocomplete = () => {
    const loader = new Loader({
      apiKey: "AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg",
      version: "weekly",
      libraries: ["places"],
    })
  
    loader.load().then(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.value!, {
        types: ["geocode"],
      })
  
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace()
        if (place.geometry) {
          userLocation.value.lat = place.geometry.location.lat()
          userLocation.value.lng = place.geometry.location.lng()
          query.value = place.formatted_address || place.name || ""
          locationStatus.value = 'enabled'
          
          cacheLocation(userLocation.value)
          fetchHospitals()
        }
      })
    })
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
  