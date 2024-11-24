<template>
  <div class="p-6 max-w-lg mx-auto bg-white rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Travel Details</h2>
    <div v-if="distance && duration" class="space-y-2">
      <p>
        <strong>Distance:</strong> {{ distance }}
      </p>
      <p>
        <strong>ETA:</strong> {{ duration }}
      </p>
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <button
        @click="fetchDistanceAndTime"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Get Distance and ETA
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useDistanceMatrix } from '@/composables/core/useDistanceMatrix';

const { distance, duration, error, getDistanceAndTime } = useDistanceMatrix();

// Example coordinates: Replace with actual user location and destination
const userLocation = ref({ lat: 37.7749, lng: -122.4194 }); // User's location
const destination = ref({ lat: 34.0522, lng: -118.2437 }); // Destination location

const fetchDistanceAndTime = () => {
  if (userLocation.value && destination.value) {
    getDistanceAndTime(userLocation.value, destination.value);
  }
};
</script>

<style>
/* Add any additional styles here if needed */
</style>
