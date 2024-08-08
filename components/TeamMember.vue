<template>
    <div class="bg-white p-4 shadow rounded text-center">
      <img :src="member.image" alt="" class="w-full h-40 object-cover rounded"> <!-- Placeholder for team member image -->
      <h3 class="mt-4 font-semibold">{{ member.name }}</h3>
      <p class="text-gray-600">{{ member.role }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    member: {
      type: Object,
      required: true,
    }
  });
  </script>
  
  <style scoped>
  /* Styles specific to team member component */
  </style>
  