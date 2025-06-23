<template>
  <div class="flex flex-col lg:flex-row h-screen p-2">
    <div
      v-if="showDirections || isDesktop"
      class="w-full lg:w-1/2 lg:h-full order-1 lg:order-2 flex-1"
    >
      <MapViews @close="handleDirections" :hospital="selectedHospitalData" :userLocation="userLocation" />
    </div>

    <div
      v-if="showHospitalInfo || isDesktop"
      class="w-full lg:w-1/2 lg:h-full order-2 lg:order-1 flex-1"
    >
      <HospitalInfo
        @directions="handleDirections"
        :hospital="selectedHospitalData"
        :distance="distance"
        :estimatedTime="estimatedTime"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HospitalInfo from '@/components/HospitalInfo.vue'
import { useSurgeWebSocket } from '@/composables/useSurgeWebSocket'

// State management
const showDirections = ref(false) // Initially false
const showHospitalInfo = ref(true) // Initially true
const isDesktop = ref(window.innerWidth >= 1024)

// State for user location and selected hospital
const route = useRoute()
const router = useRouter()
const hospital = ref({
  id: '',
  name: '',
  location: '',
  status: '',
  bedSpaces: '',
  lat: 0,
  lon: 0,
})
const userLocation = ref({
  latitude: 0,
  longitude: 0,
  accuracy: 0,
  timestamp: 0
})
const selectedHospitalData = ref({})
const distance = ref(0)
const estimatedTime = ref('')

// Initialize the surge websocket
const { 
  initializeSocket, 
  isConnected, 
  createSurge, 
  connectionError 
} = useSurgeWebSocket()

// Track if surge has been dispatched
const surgeDispatched = ref(false)

// Event listener for viewport changes
const updateIsDesktop = () => {
  isDesktop.value = window.innerWidth >= 1024
}

// Function to get user's current location
const getUserLocation = () => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
      return
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  })
}

// Function to dispatch surge event
const dispatchSurgeEvent = async () => {
  if (surgeDispatched.value || !hospital.value.id) return
  
  try {
    // Initialize socket if not already connected
    initializeSocket()
    
    // Wait for connection to be established
    if (!isConnected.value) {
      await new Promise<void>((resolve) => {
        const checkConnection = setInterval(() => {
          if (isConnected.value) {
            clearInterval(checkConnection)
            resolve()
          }
        }, 500)
        
        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkConnection)
          if (!isConnected.value) {
            console.error('Timed out waiting for socket connection')
            resolve() // Resolve anyway to continue
          }
        }, 5000)
      })
    }
    
    // Get current user location or use stored location
    let currentPosition
    
    try {
      currentPosition = await getUserLocation()
      
      // Update userLocation ref
      userLocation.value = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        accuracy: currentPosition.coords.accuracy,
        timestamp: currentPosition.timestamp
      }
      
      // Store in localStorage for future use
      localStorage.setItem('userLocation', JSON.stringify(userLocation.value))
    } catch (error) {
      console.warn('Could not get current location:', error)
      // Fall back to stored location if available
      if (!userLocation.value.latitude && !userLocation.value.longitude) {
        console.error('No location available for surge event')
        return
      }
    }
    
    // Create surge payload
    const surgePayload = {
      hospitalId: hospital.value.id,
      latitude: userLocation.value.latitude,
      longitude: userLocation.value.longitude,
      address: '', // Could be populated if you have address data
      emergencyType: 'visit',
      description: `User visited ${hospital.value.name}`,
      metadata: {
        source: 'hospital_details_page',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || 'direct'
      }
    }
    
    // Dispatch surge event
    const response = await createSurge(surgePayload)
    
    if (response.success) {
      console.log('Surge event dispatched successfully:', response)
      surgeDispatched.value = true
    }
  } catch (error) {
    console.error('Failed to dispatch surge event:', error)
  }
}

// Add event listeners to handle responsive behavior
onMounted(async () => {
  window.addEventListener('resize', updateIsDesktop)

  // Retrieve userLocation from localStorage
  const storedUserLocation = localStorage.getItem('userLocation')
  if (storedUserLocation) {
    userLocation.value = JSON.parse(storedUserLocation)
  } else {
    // Try to get user location
    try {
      const position = await getUserLocation()
      userLocation.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      }
      localStorage.setItem('userLocation', JSON.stringify(userLocation.value))
    } catch (error) {
      console.warn('Could not get user location:', error)
    }
  }

  // Retrieve selectedHospital data from localStorage
  const storedHospital = localStorage.getItem('selectedHospital')
  console.log(storedHospital, 'stored hospital')
  if (storedHospital) {
    selectedHospitalData.value = JSON.parse(storedHospital)
    const parsedHospital = JSON.parse(storedHospital)
    hospital.value = {
      id: parsedHospital.id || parsedHospital._id,
      name: parsedHospital.name || parsedHospital.hospitalName,
      location: parsedHospital.location || '',
      status: parsedHospital.status || '',
      bedSpaces: parsedHospital.bedSpaces || parsedHospital.totalAvailableBeds,
      lat: parseFloat(parsedHospital.lat) || parseFloat(parsedHospital.latitude),
      lon: parseFloat(parsedHospital.lon) || parseFloat(parsedHospital.longitude)
    }
  } else {
    // Fallback: retrieve hospital data from route query if available
    hospital.value = {
      id: route.query.id as string,
      name: route.query.name as string,
      location: route.query.location as string,
      status: route.query.status as string,
      bedSpaces: route.query.bedSpaces as string,
      lat: parseFloat(route.query.lat as string),
      lon: parseFloat(route.query.lon as string),
    }
  }
  
  // Dispatch surge event after hospital data is loaded
  if (hospital.value.id) {
    // Small delay to ensure everything is loaded
    setTimeout(() => {
      dispatchSurgeEvent()
    }, 1000)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsDesktop)
})

// Function to toggle views
const handleDirections = () => {
  showDirections.value = !showDirections.value
  showHospitalInfo.value = !showHospitalInfo.value
}

// Function to calculate estimated time based on distance
const updateDistance = (dist: number) => {
  distance.value = dist
  const speed = 60 // km/h
  const time = dist / speed // time in hours
  const hours = Math.floor(time)
  const minutes = Math.round((time - hours) * 60)
  estimatedTime.value = `${hours}h ${minutes}m`
}

// Watch for changes in hospital ID from route
watch(() => route.query.id, (newId) => {
  if (newId && newId !== hospital.value.id) {
    // Hospital changed, reset surge dispatched flag
    surgeDispatched.value = false
    
    // Update hospital data from route
    hospital.value = {
      id: route.query.id as string,
      name: route.query.name as string,
      location: route.query.location as string,
      status: route.query.status as string,
      bedSpaces: route.query.bedSpaces as string,
      lat: parseFloat(route.query.lat as string),
      lon: parseFloat(route.query.lon as string),
    }
    
    // Dispatch new surge event
    dispatchSurgeEvent()
  }
}, { immediate: true })
</script>

<style scoped>
/* Add your custom styles here */
</style>