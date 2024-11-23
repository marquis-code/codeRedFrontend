<template>
    <div class="container mx-auto">
      <!-- Permission Request Dialog -->
      <div v-if="showPermissionDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <h3 class="text-lg font-bold mb-4">Location Access Required</h3>
          <p class="mb-4">This application needs your location to find hospitals near you. Would you like to allow location access?</p>
          <div class="flex justify-end space-x-4">
            <button @click="denyLocationPermission" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Deny
            </button>
            <button @click="requestLocationPermission" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Allow
            </button>
          </div>
        </div>
      </div>
  
      <!-- Rest of your existing template code remains the same -->
      <!-- ... -->
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useCustomToast } from '@/composables/core/useCustomToast'
  
  const { showToast } = useCustomToast()
  const { $loadGoogleMaps } = useNuxtApp()
  
  // Existing refs...
  const location = ref('')
  const hospitals = ref([])
  const loading = ref(false)
  const viewAll = ref(false)
  const showFilterModal = ref(false)
  const showMap = ref(false)
  const selectedHospital = ref(null)
  const userLocation = ref({ lat: null, lng: null })
  const query = ref('')
  
  // New refs for permission handling
  const showPermissionDialog = ref(false)
  const permissionStatus = ref('')
  
  // Function to check if geolocation permission was previously granted
  const checkGeolocationPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' })
      permissionStatus.value = permission.state
  
      if (permission.state === 'granted') {
        getUserLocation()
      } else if (permission.state === 'prompt') {
        showPermissionDialog.value = true
      } else {
        showToast({
          title: 'Location Access Denied',
          message: 'Please enable location access in your browser settings to find nearby hospitals.',
          toastType: 'warning',
          duration: 5000,
        })
      }
  
      // Watch for permission changes
      permission.addEventListener('change', (e) => {
        permissionStatus.value = e.target.state
        if (e.target.state === 'granted') {
          getUserLocation()
        }
      })
    } catch (error) {
      console.error('Error checking geolocation permission:', error)
      showPermissionDialog.value = true
    }
  }
  
  // Function to handle permission request
  const requestLocationPermission = async () => {
    showPermissionDialog.value = false
    loading.value = true
    
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        })
      })
      
      const { latitude: lat, longitude: lng } = position.coords
      userLocation.value = { lat, lng }
      localStorage.setItem('userLocation', JSON.stringify(userLocation.value))
      
      // Proceed with reverse geocoding and hospital fetching
      await reverseGeocode(lat, lng)
    } catch (error) {
      console.error('Error getting location:', error)
      handleLocationError(error)
    } finally {
      loading.value = false
    }
  }
  
  // Function to handle permission denial
  const denyLocationPermission = () => {
    showPermissionDialog.value = false
    showToast({
      title: 'Location Access Required',
      message: 'Please enter your location manually to find nearby hospitals.',
      toastType: 'info',
      duration: 5000,
    })
  }
  
  // Updated reverse geocoding function
  const reverseGeocode = async (lat, lng) => {
    try {
      const google = await $loadGoogleMaps()
      const geocoder = new google.maps.Geocoder()
  
      const response = await new Promise((resolve, reject) => {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results[0]) {
            resolve(results[0])
          } else {
            reject(new Error(`Geocoding failed: ${status}`))
          }
        })
      })
  
      query.value = response.formatted_address
      fetchHospitalsByLocation(lat, lng)
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      showToast({
        title: 'Location Error',
        message: 'Could not determine your address. Please enter it manually.',
        toastType: 'error',
        duration: 3000,
      })
    }
  }
  
  // Updated getUserLocation function
  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      showToast({
        title: 'Error',
        message: 'Geolocation is not supported by your browser.',
        toastType: 'error',
        duration: 3000,
      })
      return
    }
  
    loading.value = true
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        })
      })
      
      const { latitude: lat, longitude: lng } = position.coords
      userLocation.value = { lat, lng }
      localStorage.setItem('userLocation', JSON.stringify(userLocation.value))
      
      await reverseGeocode(lat, lng)
    } catch (error) {
      console.error('Error getting location:', error)
      handleLocationError(error)
    } finally {
      loading.value = false
    }
  }
  
  // Error handling function
  const handleLocationError = (error) => {
    let message = 'An error occurred while getting your location.'
    
    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = 'Location access was denied. Please enable it in your browser settings.'
        break
      case error.POSITION_UNAVAILABLE:
        message = 'Location information is unavailable. Please try again.'
        break
      case error.TIMEOUT:
        message = 'Location request timed out. Please try again.'
        break
    }
    
    showToast({
      title: 'Location Error',
      message,
      toastType: 'error',
      duration: 5000,
    })
  }
  
  // Modified onMounted
  onMounted(() => {
    checkGeolocationPermission()
  })
  
  // Rest of your existing code remains the same...
  </script>