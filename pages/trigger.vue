<template>
  <div>
    <h1>Get Location</h1>
    <button @click="getLocation">Get Location</button>
    <p v-if="latitude !== null && longitude !== null">
      Latitude: {{ latitude }}, Longitude: {{ longitude }}
    </p>
    <p v-else-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Reactive state
const latitude = ref<number | null>(null);
const longitude = ref<number | null>(null);
const errorMessage = ref<string>("");

// Function to handle location retrieval
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          // On success, update latitude and longitude
          latitude.value = position.coords.latitude;
          longitude.value = position.coords.longitude;
          errorMessage.value = ""; // Clear any previous errors
        },
        (error) => {
          // Handle errors
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage.value = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage.value = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage.value = "The request to get user location timed out.";
              break;
            default:
              errorMessage.value = "An unknown error occurred.";
              break;
          }
        }
    );
  } else {
    // Geolocation not supported
    errorMessage.value = "Geolocation is not supported by this browser.";
  }
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
}
</style>
