<template>
    <div class="flex justify-between items-center p-3 rounded-lg" :class="bgClass">
      <span>{{ name }}</span>
      <span class="py-1 px-3 rounded-full text-white text-sm" :class="statusClass">{{ statusText }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    name: string;
    status: 'busy' | 'available' | 'unavailable';
  }>();
  
  const statusText = computed(() => ({
    busy: 'Busy',
    available: 'Available',
    unavailable: 'Unavailable'
  })[props.status]);
  
  const bgClass = computed(() => ({
    busy: 'bg-blue-200',
    available: 'bg-green-200',
    unavailable: 'bg-red-200'
  })[props.status]);
  
  const statusClass = computed(() => ({
    busy: 'bg-blue-500',
    available: 'bg-green-500',
    unavailable: 'bg-red-500'
  })[props.status]);
  </script>
  
  <style scoped>
  </style>
  