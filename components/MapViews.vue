<template>
    <div class="relative w-full h-screen">
      <button @click="$emit('close')" class="absolute top-4 left-4 z-10 text-white bg-gray-800 p-2 rounded-full">
        <i class="fa fa-arrow-left"></i>
      </button>
      <div id="map" class="w-full h-full"></div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, watch } from 'vue'
  import { useNuxtApp } from '#app'
  
  const props = defineProps({
    hospital: Object,
    userLocation: Object,
  })
  
  const { $loadGoogleMaps } = useNuxtApp()
  
  onMounted(async () => {
    const google = await $loadGoogleMaps()
    const map = new google.maps.Map(document.getElementById('map'), {
      center: props.userLocation,
      zoom: 14,
    })
  
    const userMarker = new google.maps.Marker({
      position: props.userLocation,
      map: map,
      title: 'Your Location',
    })
  
    const hospitalMarker = new google.maps.Marker({
      position: { lat: props.hospital.geometry.location.lat(), lng: props.hospital.geometry.location.lng() },
      map: map,
      title: props.hospital.name,
    })
  
    const directionsService = new google.maps.DirectionsService()
    const directionsRenderer = new google.maps.DirectionsRenderer()
    directionsRenderer.setMap(map)
  
    directionsService.route(
      {
        origin: props.userLocation,
        destination: { lat: props.hospital.geometry.location.lat(), lng: props.hospital.geometry.location.lng() },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result)
        } else {
          console.error('Error fetching directions', result)
        }
      }
    )
  })
  </script>
  
  <style scoped>
  /* Additional styling for full-screen map */
  </style>
  