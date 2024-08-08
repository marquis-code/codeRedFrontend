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
  import axios from 'axios'
  import HospitalsList from '@/components/HospitalsList.vue'

  const props = defineProps({
    address: {
      type: String,
      default: ''
    }
  })

onMounted(() => {
  console.log(props.address, 'here')
})
  
  const location = ref(props.address ? props.address : '')
  // const location = ref('')
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
  