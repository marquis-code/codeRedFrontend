<template>
  <div class="p-6 max-w-lg mx-auto bg-gray-100 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4">Distance & ETA</h2>
    <div v-if="distance && eta" class="mb-4">
      <p><strong>Total Distance:</strong> {{ distance }} km</p>
      <p><strong>Estimated Time:</strong> {{ eta }} hours</p>
    </div>
    <button
        @click="calculateDistanceAndETA"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Calculate Distance & ETA
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const distance = ref<number | null>(null); // Distance in kilometers
const eta = ref<number | null>(null); // Estimated time in hours

// Example coordinates for pickup and destination
const pickupLocation = ref({ lat: 37.7749, lng: -122.4194 }); // San Francisco
const destinationLocation = ref({ lat: 34.0522, lng: -118.2437 }); // Los Angeles

const calculateDistanceAndETA = () => {
  const R = 6371; // Earth's radius in kilometers
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const lat1 = pickupLocation.value.lat;
  const lon1 = pickupLocation.value.lng;
  const lat2 = destinationLocation.value.lat;
  const lon2 = destinationLocation.value.lng;

  // Haversine formula
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const calculatedDistance = R * c; // Distance in kilometers

  // Assuming an average speed of 60 km/h
  const averageSpeed = 60; // km/h
  const calculatedETA = calculatedDistance / averageSpeed; // Time in hours

  distance.value = parseFloat(calculatedDistance.toFixed(2));
  eta.value = parseFloat(calculatedETA.toFixed(2));
};
</script>

<style>
/* Add custom styles if needed */
</style>
