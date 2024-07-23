<!-- 
<template>
   <div class="px-2 lg:px-0">
    <div class="w-full max-w-7xl border border-gray-100 mx-auto rounded-lg p-2 bg-gray-50">
        <div class="bg-white shadow rounded-lg border border-gray-50 p-4 flex items-center">
          <div class="flex flex-col mr-4 w-1/2 border-r border-gray-100">
            <label class="text-gray-600 text-sm font-semibold flex items-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11.5" cy="8.5" r="5.5"/><path d="M11.5 14v7"/></svg>
                Pick up location</label>
            <input type="text" v-model="pickupLocation" placeholder="Enter pickup location" class=" focus:outline-none focus:border-blue-500 text-xs py-3" />
          </div>
          <div class="flex flex-col mx-4 w-1/2 lg:border-r border-gray-100">
            <label class="text-gray-600 text-sm font-semibold flex items-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B0082" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
                Destination location</label>
            <input type="text" v-model="destinationLocation" placeholder="Enter destination location" class=" focus:outline-none focus:border-blue-500 text-xs py-3" />
          </div>
          <div class="lg:flex flex-col mx-4 w-1/2 hidden">
            <label class="text-gray-600 text-sm font-semibold flex items-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                First trip</label>
            <input type="date" v-model="firstTripDate" class=" focus:outline-none focus:border-blue-500 text-xs py-3" />
          </div>
          <button @click="search" class="bg-black hidden text-white rounded-lg p-2 ml-4 lg:flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>
      </div>
   </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useAllStatesInfo } from "use-nigeria-location";
  console.log(useAllStatesInfo())
  
  const pickupLocation = ref('')
  const destinationLocation = ref('')
  const firstTripDate = ref('')
  
  const search = () => {
    console.log('Searching for:', {
      pickupLocation: pickupLocation.value,
      destinationLocation: destinationLocation.value,
      firstTripDate: firstTripDate.value,
    })
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
   -->

   <!-- <template>
    <div class="px-2 lg:px-0">
      <div class="w-full max-w-7xl border border-gray-100 mx-auto rounded-lg p-2 bg-gray-50">
        <div class="bg-white shadow rounded-lg border border-gray-50 p-4 flex items-center">
          <div class="flex flex-col w-full relative">
            <label class="text-gray-600 text-sm font-semibold flex items-center gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11.5" cy="8.5" r="5.5"/>
                <path d="M11.5 14v7"/>
              </svg>
              Enter Location
            </label>
            <input type="text" v-model="location" @input="fetchHealthFacilities" placeholder="Enter location" class="focus:outline-none focus:border-blue-500 text-xs py-3" />
            <ul v-if="healthFacilities.length" class="absolute bg-white border border-gray-200 rounded-lg mt-2 w-full z-10">
              <li v-for="facility in healthFacilities" :key="facility.place_id" class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="selectFacility(facility)">
                {{ facility.name }}
              </li>
            </ul>
          </div>
          <button @click="search" class="bg-black text-white rounded-lg p-2 ml-4 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  
  const location = ref('')
  const healthFacilities = ref([])
  
  const fetchHealthFacilities = async () => {
    if (location.value.length > 2) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: `hospital in ${location.value}`,
            format: 'json',
            addressdetails: 1,
            extratags: 1
          }
        })
        console.log(response.data); // For debugging purposes
        healthFacilities.value = response.data.map((facility: any) => ({
          place_id: facility.place_id,
          name: facility.display_name
        }))
      } catch (error) {
        console.error('Error fetching health facilities:', error)
      }
    } else {
      healthFacilities.value = []
    }
  }
  
  const selectFacility = (facility: any) => {
    location.value = facility.name
    healthFacilities.value = []
  }
  
  const search = () => {
    console.log('Searching for:', {
      location: location.value,
    })
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
   -->

   <template>
    <div class="px-2 lg:px-0">
      <div class="w-full max-w-7xl border border-gray-100 mx-auto rounded-lg p-2 bg-gray-50">
        <div class="bg-white shadow rounded-lg border border-gray-50 p-4 flex items-center">
          <div class="flex flex-col w-full relative">
            <label class="text-gray-600 text-sm font-semibold flex items-center gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11.5" cy="8.5" r="5.5"/>
                <path d="M11.5 14v7"/>
              </svg>
              Enter Location
            </label>
            <input type="text" v-model="location" @input="onInput" placeholder="Enter location" class="focus:outline-none focus:border-blue-500 text-xs py-3" />
          </div>
          <button @click="search" class="bg-black text-white rounded-lg p-2 ml-4 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
      <HospitalsList :hospitals="hospitals" :searched="searched" :loading="loading" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import axios from 'axios'
  import HospitalsList from '@/components/HospitalsList.vue'
  
  const location = ref('')
  const hospitals = ref([])
  const searched = ref(false)
  const loading = ref(false)
  
  const fetchHealthFacilities = async () => {
    if (location.value.length > 2) {
      loading.value = true
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: `hospital in ${location.value}`,
            format: 'json',
            addressdetails: 1,
            extratags: 1
          }
        })
        hospitals.value = response.data.map((facility: any) => ({
          id: facility.place_id,
          name: facility.display_name,
          location: facility.address.city || facility.address.town || facility.address.village || facility.address.suburb || '',
          bedSpaces: Math.floor(Math.random() * 100), // Random number for bed spaces (since API doesn't provide this info)
          status: ['Available', 'Busy', 'Unavailable'][Math.floor(Math.random() * 3)] // Random status
        }))
        searched.value = true
      } catch (error) {
        console.error('Error fetching health facilities:', error)
        hospitals.value = []
        searched.value = true
      } finally {
        loading.value = false
      }
    } else {
      hospitals.value = []
      searched.value = false
      loading.value = false
    }
  }
  
  const onInput = () => {
    searched.value = false
    fetchHealthFacilities()
  }
  
  const search = () => {
    console.log('Searching for:', {
      location: location.value,
    })
    fetchHealthFacilities()
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  