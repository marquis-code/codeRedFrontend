<template>
  <div class="flex flex-col lg:flex-row h-screen p-2">
    <div class="w-full lg:w-1/2 lg:h-full order-1 lg:order-2 flex-1">
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
</style>
