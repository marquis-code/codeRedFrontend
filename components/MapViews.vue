<!--<template>-->
<!--  <div class="relative w-full h-screen">-->
<!--    <button @click="$emit('close')" class="absolute lg:hidden top-4 left-4 z-10 text-white bg-gray-800 p-2 rounded-full">-->
<!--      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l-4 4 4 4M16 12H9"/></svg>-->
<!--    </button>-->
<!--    <div id="map" class="w-full h-full"></div>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="relative w-full h-screen">
    <!-- Back Button -->
    <button @click="$emit('close')" class="absolute lg:hidden top-4 left-4 z-10 text-white bg-gray-800 p-2 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8l-4 4 4 4M16 12H9" />
      </svg>
    </button>

    <!-- Map -->
    <div id="map" class="w-full h-full"></div>

    <!-- Transparent Card -->
    <div class="absolute lg:hidden bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md shadow-md rounded-lg py-6 p-4 z-20">
<section class="flex justify-between items-center">
  <div>
    <h2 class="text-lg font-bold text-red-600">
      {{hospital?.name ?? 'Nil'}}
    </h2>
    <p class="text-sm text-gray-700">
      {{ hospital?.formatted_address || hospital?.vicinity || 'Nil' }}
    </p>
  </div>
  <div>
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="52" height="52" rx="26" fill="#717171" fill-opacity="0.12"/>
      <path d="M24.3009 12.9754V10.3251C24.3009 9.94967 24.4279 9.63495 24.6819 9.38097C24.9359 9.12699 25.2506 9 25.626 9C26.0015 9 26.3162 9.12699 26.5702 9.38097C26.8242 9.63495 26.9512 9.94967 26.9512 10.3251V12.9754C26.9512 13.3508 26.8242 13.6655 26.5702 13.9195C26.3162 14.1735 26.0015 14.3005 25.626 14.3005C25.2506 14.3005 24.9359 14.1735 24.6819 13.9195C24.4279 13.6655 24.3009 13.3508 24.3009 12.9754ZM17.5097 15.2281L15.4226 13.141C15.1576 12.876 15.0251 12.5613 15.0251 12.1969C15.0251 11.8324 15.1576 11.5177 15.4226 11.2527C15.6876 10.9877 15.9968 10.8552 16.3502 10.8552C16.7036 10.8552 17.0128 10.9877 17.2778 11.2527L19.398 13.3729C19.663 13.6379 19.7955 13.9471 19.7955 14.3005C19.7955 14.6539 19.663 14.963 19.398 15.2281C19.1329 15.4931 18.8182 15.6256 18.4538 15.6256C18.0894 15.6256 17.7747 15.4931 17.5097 15.2281ZM21.6507 32.8522C22.0261 32.8522 22.3408 32.7252 22.5948 32.4712C22.8488 32.2172 22.9758 31.9025 22.9758 31.5271C22.9758 31.1516 22.8488 30.8369 22.5948 30.5829C22.3408 30.3289 22.0261 30.2019 21.6507 30.2019H18.3379C18.1612 30.2019 18.0066 30.2682 17.8741 30.4007C17.7416 30.5332 17.6753 30.6878 17.6753 30.8645V32.1896C17.6753 32.3663 17.7416 32.5209 17.8741 32.6534C18.0066 32.7859 18.1612 32.8522 18.3379 32.8522H21.6507ZM29.6014 32.8522H32.9142C33.0909 32.8522 33.2455 32.7859 33.378 32.6534C33.5105 32.5209 33.5768 32.3663 33.5768 32.1896V30.8645C33.5768 30.6878 33.5105 30.5332 33.378 30.4007C33.2455 30.2682 33.0909 30.2019 32.9142 30.2019H29.6014C29.226 30.2019 28.9112 30.3289 28.6573 30.5829C28.4033 30.8369 28.2763 31.1516 28.2763 31.5271C28.2763 31.9025 28.4033 32.2172 28.6573 32.4712C28.9112 32.7252 29.226 32.8522 29.6014 32.8522ZM32.6161 21.0917L32.0198 20.4954C31.821 20.2967 31.5891 20.2028 31.3241 20.2138C31.059 20.2249 30.8271 20.3298 30.6284 20.5286C30.4296 20.7273 30.3302 20.9592 30.3302 21.2242C30.3302 21.4893 30.4296 21.7212 30.6284 21.9199L31.6885 22.98C31.9535 23.2451 32.2627 23.3776 32.6161 23.3776C32.9694 23.3776 33.2786 23.2451 33.5436 22.98L36.5252 20.0316C36.7239 19.8329 36.8233 19.601 36.8233 19.3359C36.8233 19.0709 36.7239 18.839 36.5252 18.6403C36.3264 18.4415 36.0945 18.3476 35.8295 18.3587C35.5645 18.3697 35.3326 18.4636 35.1338 18.6403L32.6161 21.0917ZM33.5768 14.3005C35.4099 14.3005 36.9724 14.9465 38.2644 16.2385C39.5564 17.5305 40.2024 19.093 40.2024 20.9261C40.2024 22.7592 39.5564 24.3217 38.2644 25.6137C36.9724 26.9057 35.4099 27.5517 33.5768 27.5517C31.7437 27.5517 30.1811 26.9057 28.8892 25.6137C27.5972 24.3217 26.9512 22.7592 26.9512 20.9261C26.9512 19.093 27.5972 17.5305 28.8892 16.2385C30.1811 14.9465 31.7437 14.3005 33.5768 14.3005ZM15.0251 39.4778C14.6496 39.4778 14.3349 39.3508 14.0809 39.0968C13.8269 38.8428 13.7 38.5281 13.7 38.1527V28.0155C13.7 27.8609 13.711 27.7063 13.7331 27.5517C13.7552 27.3971 13.7883 27.2535 13.8325 27.121L16.4827 19.601C16.6152 19.2034 16.8526 18.8832 17.195 18.6403C17.5373 18.3973 17.9183 18.2759 18.3379 18.2759H21.6507V16.9507C21.6507 16.5753 21.7777 16.2606 22.0317 16.0066C22.2856 15.7526 22.6003 15.6256 22.9758 15.6256H25.9905C25.4604 16.3765 25.0463 17.1992 24.7482 18.0936C24.45 18.9881 24.3009 19.9323 24.3009 20.9261H18.8017L16.8471 26.2266H25.9905C26.8739 27.4854 27.9781 28.4627 29.3033 29.1584C30.6284 29.8541 32.0529 30.2019 33.5768 30.2019C34.2835 30.2019 34.9626 30.1302 35.6141 29.9866C36.2657 29.8431 36.9117 29.6167 37.5521 29.3075V38.1527C37.5521 38.5281 37.4251 38.8428 37.1712 39.0968C36.9172 39.3508 36.6025 39.4778 36.227 39.4778H34.9019C34.5264 39.4778 34.2117 39.3508 33.9577 39.0968C33.7038 38.8428 33.5768 38.5281 33.5768 38.1527V36.8276H17.6753V38.1527C17.6753 38.5281 17.5483 38.8428 17.2943 39.0968C17.0404 39.3508 16.7256 39.4778 16.3502 39.4778H15.0251Z" fill="#00A878"/>
    </svg>
  </div>
</section>
<!--      <div class="flex items-center mt-2">-->
<!--        <div class="w-8 h-8 flex justify-center items-center bg-green-100 rounded-full">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">-->
<!--            <path d="M16.707 10.707a1 1 0 010-1.414l-4-4a1 1 0 00-1.414 1.414L13.586 9H3a1 1 0 100 2h10.586l-2.293 2.293a1 1 0 101.414 1.414l4-4z" />-->
<!--          </svg>-->
<!--        </div>-->
<!--        <span class="ml-3 text-sm font-medium text-gray-800">Emergency Available</span>-->
<!--      </div>-->
    </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue'
import { useNuxtApp } from '#app'

// Define types for user location and selected hospital
interface Location {
  lat: number
  lng: number
}

const props = defineProps({
  hospital: {
    type: Object,
    required: true
  }
})

interface Hospital {
  name: string
  latitude: number
  longitude: number
}

let userLocation: Location | null = null
let selectedHospital: Hospital | null = null

const { $loadGoogleMaps } = useNuxtApp()

onMounted(async () => {
  // Retrieve and parse values from local storage
  const userLocationData = localStorage.getItem('userLocation')
  const selectedHospitalData = localStorage.getItem('selectedHospital')

  if (userLocationData && selectedHospitalData) {
    userLocation = JSON.parse(userLocationData)
    selectedHospital = JSON.parse(selectedHospitalData)
  }

  if (!userLocation || !selectedHospital) {
    console.error("Missing user location or hospital data from local storage")
    return
  }

  const google = await $loadGoogleMaps()
  const map = new google.maps.Map(document.getElementById('map'), {
    center: userLocation,
    zoom: 14,
  })

  // Add markers for user location and hospital
  const userMarker = new google.maps.Marker({
    position: userLocation,
    map: map,
    title: 'Your Location',
  })

  const hospitalMarker = new google.maps.Marker({
    position: { lat: selectedHospital.latitude, lng: selectedHospital.longitude },
    map: map,
    title: selectedHospital.name,
  })

  // Display directions from user location to hospital
  const directionsService = new google.maps.DirectionsService()
  const directionsRenderer = new google.maps.DirectionsRenderer()
  directionsRenderer.setMap(map)

  directionsService.route(
      {
        origin: userLocation,
        destination: { lat: selectedHospital.latitude, lng: selectedHospital.longitude },
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
