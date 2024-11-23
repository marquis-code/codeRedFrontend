<script lang="ts" setup>
import { ref } from "vue";
import { useGoogleMaps } from "@/composables/core/useGoogleMaps";

const { getUserLocation, getPlaceDetails } = useGoogleMaps();

const location = ref<google.maps.LatLngLiteral | null>(null);
const placeDetails = ref<google.maps.places.PlaceResult | null>(null);

async function fetchLocation() {
  try {
    location.value = await getUserLocation();
    console.log("User location:", location.value);
  } catch (error) {
    console.error("Error fetching user location", error);
  }
}

async function fetchPlaceDetails() {
  const placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4"; // Replace with your desired place ID
  try {
    placeDetails.value = await getPlaceDetails(placeId);
    console.log("Place details:", placeDetails.value);
  } catch (error) {
    console.error("Error fetching place details", error);
  }
}

onMounted(() => {
  fetchLocation();
});
</script>

<template>
  <div>
    <h1>Google Maps Integration</h1>
    <p v-if="location">Location: {{ location }}</p>
    <p v-else>Fetching location...</p>
    <button @click="fetchPlaceDetails">Get Place Details</button>
    <div v-if="placeDetails">
      <h2>Place Details</h2>
      <p>Name: {{ placeDetails.name }}</p>
      <p>Address: {{ placeDetails.formatted_address }}</p>
    </div>
  </div>
</template>
