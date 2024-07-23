<template>
    <div class="border border-blue-300 rounded-lg p-4 bg-blue-50 w-64 flex flex-col items-start m-2">
      <div :class="statusClass" class="text-white text-xs px-2 py-1 rounded-full mb-2">{{ status }}</div>
      <h2 class="text-blue-700 font-semibold mb-1">{{ facility.name }}</h2>
      <p class="text-gray-600 text-sm mb-2">{{ facility.address }}</p>
      <p class="text-gray-800 text-sm">Bed spaces: {{ facility.bedSpaces }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Facility {
    name: string;
    address: string;
    bedSpaces: number;
    status: string;
  }
  
  const props = defineProps<{ facility: Facility }>()
  
  const statusClass = computed(() => {
    switch (props.facility.status) {
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
  