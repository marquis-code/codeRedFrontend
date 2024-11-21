<template>
    <div>
      <button @click="fetchUserLocation">Get Location</button>
  
      <div v-if="locationText">Your location: {{ locationText }}</div>
      <div v-if="error" class="error">Error: {{ error }}</div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useGoogleLocation } from '@/composables/core/useLocation';
  
  const { locationText, error, fetchUserLocation } = useGoogleLocation();
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  