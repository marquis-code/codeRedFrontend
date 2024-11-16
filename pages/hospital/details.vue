<!-- <template>
  <div class="flex flex-col lg:flex-row h-screen p-2">
    <div class="w-full lg:w-1/2 lg:h-full order-1 lg:order-2 flex-1">
      <MapViews :hospital="selectedHospital" :userLocation="userLocation" />
      <MapView :hospital="hospital" @update:distance="updateDistance" />
    </div>
    <div class="w-full lg:w-1/2 lg:h-full order-2 lg:order-1 flex-1">
      <HospitalInfo :hospital="hospital" :distance="distance" :estimatedTime="estimatedTime" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import MapView from '@/components/MapView.vue'
import HospitalInfo from '@/components/HospitalInfo.vue'


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
const distance = ref(0)
const estimatedTime = ref('')

const updateDistance = (dist) => {
  distance.value = dist
  const speed = 60 // km/h
  const time = dist / speed // time in hours
  const hours = Math.floor(time)
  const minutes = Math.round((time - hours) * 60)
  estimatedTime.value = `${hours}h ${minutes}m`
}

onMounted(() => {
  hospital.value = {
    id: route.query.id,
    name: route.query.name,
    location: route.query.location,
    status: route.query.status,
    bedSpaces: route.query.bedSpaces,
    lat: parseFloat(route.query.lat),
    lon: parseFloat(route.query.lon),
  }
})
</script>

<style scoped>
/* Add your custom styles here */
</style> -->


<template>
  <div class="flex flex-col lg:flex-row h-screen p-2">
    <div class="w-full lg:w-1/2 lg:h-full order-1 lg:order-2 flex-1">
      <!-- Pass userLocation and hospital to the MapView component -->
      <MapViews :hospital="selectedHospitalData" :userLocation="userLocation" />
      <!-- <MapView :hospital="hospital" :userLocation="userLocation" /> -->
    </div>
    {{ selectedHospitalData }}
    {{ distance }}
    <div class="w-full lg:w-1/2 lg:h-full order-2 lg:order-1 flex-1">
      <HospitalInfo :hospital="selectedHospitalData" :distance="distance" :estimatedTime="estimatedTime" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MapView from '@/components/MapView.vue'
import HospitalInfo from '@/components/HospitalInfo.vue'

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
const updateDistance = (dist) => {
  distance.value = dist
  const speed = 60 // km/h
  const time = dist / speed // time in hours
  const hours = Math.floor(time)
  const minutes = Math.round((time - hours) * 60)
  estimatedTime.value = `${hours}h ${minutes}m`
}

onMounted(() => {
  // Retrieve userLocation from localStorage
  const storedUserLocation = localStorage.getItem('userLocation')
  if (storedUserLocation) {
    userLocation.value = JSON.parse(storedUserLocation)
  }

  // Retrieve selectedHospital data from localStorage
  const storedHospital = localStorage.getItem('selectedHospital')
  if (storedHospital) {
    selectedHospitalData = storedHospital
    const parsedHospital = JSON.parse(storedHospital)
    hospital.value = {
      id: parsedHospital.id || '',
      name: parsedHospital.name || '',
      location: parsedHospital.location || '',
      status: parsedHospital.status || '',
      bedSpaces: parsedHospital.bedSpaces || '',
      lat: parseFloat(parsedHospital.lat) || 0,
      lon: parseFloat(parsedHospital.lon) || 0,
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
</script>

<style scoped>
/* Add your custom styles here */
</style>
