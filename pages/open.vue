<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-xl font-bold mb-4">Your Location Coordinates</h1>
        <div v-if="loading" class="text-blue-500">Fetching location...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
          <p class="text-gray-700">Latitude: {{ coordinates.latitude }}</p>
          <p class="text-gray-700">Longitude: {{ coordinates.longitude }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import mapboxgl from 'mapbox-gl';
  
  // Define state
  const coordinates = ref({ latitude: 0, longitude: 0 });
  const loading = ref(true);
  const error = ref<string | null>(null);
  
  // Your Mapbox access token
  const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWFycXVpczE5OTktIiwiYSI6ImNrenJic2xubjB1OXQycGxnMGp2a2NvM2kifQ.7S-nXi_BJHFzVXUlgK8VTg';
  
  onMounted(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  
    // Check if Geolocation is supported
    if (!navigator.geolocation) {
      error.value = 'Geolocation is not supported by your browser.';
      loading.value = false;
      return;
    }
  
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coordinates.value.latitude = position.coords.latitude;
        coordinates.value.longitude = position.coords.longitude;
        loading.value = false;
      },
      (err) => {
        error.value = `Error fetching location: ${err.message}`;
        loading.value = false;
      }
    );
  });
  </script>
  