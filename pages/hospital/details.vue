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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import HospitalInfo from '@/components/HospitalInfo.vue'

// State management
const showDirections = ref(false) // Initially false
const showHospitalInfo = ref(true) // Initially true
const isDesktop = ref(window.innerWidth >= 1024)

// Event listener for viewport changes
const updateIsDesktop = () => {
  isDesktop.value = window.innerWidth >= 1024
}

// Add event listeners to handle responsive behavior
onMounted(() => {
  window.addEventListener('resize', updateIsDesktop)

  // Retrieve userLocation from localStorage
  const storedUserLocation = localStorage.getItem('userLocation')
  if (storedUserLocation) {
    userLocation.value = JSON.parse(storedUserLocation)
  }

  // Retrieve selectedHospital data from localStorage
  const storedHospital = localStorage.getItem('selectedHospital')
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
      id: route.query.id,
      name: route.query.name,
      location: route.query.location,
      status: route.query.status,
      bedSpaces: route.query.bedSpaces,
      lat: parseFloat(route.query.lat),
      lon: parseFloat(route.query.lon),
    }
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

// State for user location and selected hospital
const route = useRoute()
const hospital = ref({
  id: '',
  name: '',
  location: '',
  status: '',
  bedSpaces: '',
  lat: 0,
  lon: 0,
})
const userLocation = ref({})
const selectedHospitalData = ref({})
const distance = ref(0)
const estimatedTime = ref('')

// Function to calculate estimated time based on distance
const updateDistance = (dist: number) => {
  distance.value = dist
  const speed = 60 // km/h
  const time = dist / speed // time in hours
  const hours = Math.floor(time)
  const minutes = Math.round((time - hours) * 60)
  estimatedTime.value = `${hours}h ${minutes}m`
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
