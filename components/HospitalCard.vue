<!-- 
<template>
  <div @click="goToHospital" class="border border-blue-300 rounded-lg p-4 bg-blue-50 w-64 flex flex-col items-start m-2 cursor-pointer">
    <div :class="statusClass" class="text-white text-xs px-2 py-1 rounded-full mb-2">{{ hospital.status }}</div>
    <h2 class="text-blue-700 font-semibold mb-1 text-sm">{{ hospital.name }}</h2>
    <p class="text-gray-600 text-sm mb-2">{{ hospital.location }}</p>
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
</script> -->


<template>
  <div 
    class="hospital-card relative w-64 p-4 m-2 space-y-3 border rounded-lg shadow cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
    :class="cardClasses"
    @click="$emit('click')"
  >
    <!-- Code Red Tag -->
    <div v-if="hospital.isCodeRed" class="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-tl-lg">
      CODE RED
    </div>

    <!-- Click Loading Indicator -->
    <div v-if="isClicking" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg z-10">
      <div class="text-white text-center">
        <div class="spinner-small mb-2"></div>
        <p class="text-sm">Loading details...</p>
      </div>
    </div>

    <!-- Availability Badge -->
    <div class="flex justify-end items-end">
      <span class="text-xs px-2 py-1 rounded" :class="availabilityBadgeClass">
        {{ hospital.availability || 'Unknown' }}
      </span>
    </div>

    <!-- Hospital Name -->
    <h3 class="text-base leading-snug font-bold" :class="nameClass">
      {{ hospital.hospitalName || hospital.name }}
    </h3>

    <!-- Address -->
    <p class="text-sm text-gray-600 line-clamp-2">
      {{ hospital.address || hospital.vicinity }}
    </p>

    <!-- Distance -->
    <p v-if="hospital.distance" class="text-xs text-gray-500">
      {{ hospital.distance.toFixed(1) }} km away
    </p>

    <!-- Additional Info -->
    <div v-if="hospital.rating" class="flex items-center gap-1 text-xs text-gray-500">
      <span>⭐ {{ hospital.rating }}</span>
      <span v-if="hospital.user_ratings_total">({{ hospital.user_ratings_total }} reviews)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  hospital: any
  isClicking: boolean
}

const props = defineProps<Props>()
defineEmits(['click'])

const cardClasses = computed(() => ({
  'bg-green-100 border-green-400': props.hospital.availability === 'available',
  'bg-red-100 border-red-400': props.hospital.availability === 'unavailable',
  'bg-blue-100 border-blue-400': props.hospital.availability === 'busy',
  'bg-gray-50 border-gray-300': !props.hospital.availability
}))

const availabilityBadgeClass = computed(() => ({
  'bg-green-500 text-white': props.hospital.availability === 'available',
  'bg-red-500 text-white': props.hospital.availability === 'unavailable',
  'bg-blue-500 text-white': props.hospital.availability === 'busy',
  'bg-gray-500 text-white': !props.hospital.availability
}))

const nameClass = computed(() => ({
  'text-green-600': props.hospital.availability === 'available',
  'text-red-600': props.hospital.availability === 'unavailable',
  'text-blue-600': props.hospital.availability === 'busy',
  'text-gray-700': !props.hospital.availability
}))
</script>

<style scoped>
.hospital-card {
  min-width: 240px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
