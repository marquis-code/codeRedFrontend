
<template>
  <div @click="goToHospital" class="border border-blue-300 rounded-lg p-4 bg-blue-50 w-64 flex flex-col items-start m-2 cursor-pointer">
    <div :class="statusClass" class="text-white text-xs px-2 py-1 rounded-full mb-2">{{ hospital.status }}</div>
    <h2 class="text-blue-700 font-semibold mb-1 text-sm">{{ hospital.name }}</h2>
    <p class="text-gray-600 text-sm mb-2">{{ hospital.location }}</p>
    <!-- <p class="text-gray-800 text-sm">Bed spaces: {{ hospital.bedSpaces }}</p> -->
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Hospital {                                      
  id: number;
  name: string;
  location: string;
  status: string;
  bedSpaces: number;
  lat: number;
  lon: number;
}

const props = defineProps<{ hospital: Hospital }>()

const router = useRouter()

const goToHospital = () => {
  router.push({
    path: '/hospital/details',
    query: {
      id: props.hospital.id,
      name: props.hospital.name,
      location: props.hospital.location,
      status: props.hospital.status,
      bedSpaces: props.hospital.bedSpaces,
      lat: props.hospital.lat,
      lon: props.hospital.lon,
    }
  })
}

const statusClass = computed(() => {
  switch (props.hospital.status) {
    case 'Available':
      return 'bg-green-500';
    case 'Busy':
      return 'bg-blue-500';
    case 'Unavailable':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
})
</script>

<style scoped>
/* Add your custom styles here */
</style>
