<template>
    <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
      <slot name="icon"></slot>
      <h3 class="mt-4 mb-2 text-lg font-semibold">{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    title: string;
    description: string;
  }>();
  </script>
  
  <style scoped>
  </style>
  