<template>
    <div class="p-4 container mx-auto">
      <!-- Search Input and Filter Icon -->
      <section class="p-6 bg-[#FFF9F9CC] max-w-7xl mx-auto">
      <div class="flex items-center border-2 border-red-600  rounded-lg bg-white p-3 shadow-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.485 20.1536L13.223 13.8916C12.723 14.3176 12.148 14.6472 11.498 14.8806C10.848 15.1139 10.1947 15.2306 9.53798 15.2306C7.93665 15.2306 6.58132 14.6762 5.47198 13.5676C4.36265 12.4589 3.80798 11.1039 3.80798 9.50256C3.80798 7.90122 4.36198 6.54556 5.46998 5.43556C6.57798 4.32556 7.93265 3.76989 9.53398 3.76856C11.1353 3.76722 12.4913 4.32189 13.602 5.43256C14.7127 6.54322 15.268 7.89889 15.268 9.49956C15.268 10.1942 15.145 10.8666 14.899 11.5166C14.653 12.1666 14.3296 12.7226 13.929 13.1846L20.191 19.4456L19.485 20.1536ZM9.53898 14.2296C10.8656 14.2296 11.9857 13.7729 12.899 12.8596C13.8123 11.9462 14.269 10.8259 14.269 9.49856C14.269 8.17122 13.8123 7.05122 12.899 6.13856C11.9857 5.22589 10.8656 4.76922 9.53898 4.76856C8.21232 4.76789 7.09198 5.22456 6.17798 6.13856C5.26398 7.05256 4.80732 8.17256 4.80798 9.49856C4.80865 10.8246 5.26532 11.9446 6.17798 12.8586C7.09065 13.7726 8.21065 14.2292 9.53798 14.2286" fill="black" fill-opacity="0.8"/>
            </svg>
        <input
          type="text"
          v-model="location"
          placeholder="Search hospitals..."
         class="flex-grow outline-none text-gray-500 py-5 bg-white"
          readonly
        />
        <button @click="openFilterModal" class="text-gray-500">
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9516 9.787H6.39369M6.39369 9.787C6.39369 10.3652 6.17789 10.9197 5.79544 11.3285C5.41299 11.7373 4.89427 11.967 4.3534 11.967C3.81253 11.967 3.29381 11.7373 2.91136 11.3285C2.5289 10.9197 2.31404 10.3652 2.31404 9.787M6.39369 9.787C6.39369 9.20883 6.17789 8.65434 5.79544 8.24551C5.41299 7.83668 4.89427 7.607 4.3534 7.607C3.81253 7.607 3.29381 7.83668 2.91136 8.24551C2.5289 8.65434 2.31404 9.20883 2.31404 9.787M2.31404 9.787H0.645142M17.9516 16.394H12.5744M12.5744 16.394C12.5744 16.9723 12.3591 17.5274 11.9765 17.9363C11.594 18.3453 11.0751 18.575 10.5341 18.575C9.99327 18.575 9.47455 18.3443 9.0921 17.9355C8.70965 17.5267 8.49479 16.9722 8.49479 16.394M12.5744 16.394C12.5744 15.8157 12.3591 15.2616 11.9765 14.8527C11.594 14.4437 11.0751 14.214 10.5341 14.214C9.99327 14.214 9.47455 14.4437 9.0921 14.8525C8.70965 15.2613 8.49479 15.8158 8.49479 16.394M8.49479 16.394H0.645142M17.9516 3.18H15.0469M15.0469 3.18C15.0469 3.46628 14.9932 3.74976 14.8907 4.01425C14.7883 4.27874 14.638 4.51906 14.4487 4.72149C14.2593 4.92392 14.0345 5.0845 13.7871 5.19406C13.5396 5.30361 13.2744 5.36 13.0066 5.36C12.4658 5.36 11.947 5.13032 11.5646 4.72149C11.1821 4.31266 10.9673 3.75817 10.9673 3.18M15.0469 3.18C15.0469 2.89372 14.9932 2.61024 14.8907 2.34575C14.7883 2.08126 14.638 1.84094 14.4487 1.63851C14.2593 1.43608 14.0345 1.2755 13.7871 1.16594C13.5396 1.05639 13.2744 1 13.0066 1C12.4658 1 11.947 1.22968 11.5646 1.63851C11.1821 2.04734 10.9673 2.60183 10.9673 3.18M10.9673 3.18H0.645142" stroke="black" stroke-opacity="0.8" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
        </button>
      </div>
      </section>

      <div v-if="loading" class="text-center text-gray-600">
        <div class="spinner"></div>
        Searching...
      </div>

      <div v-else-if="!location && hospitals?.length === 0" class="text-center text-gray-600 border rounded border-gray-100 py-6">
        <div class="flex justify-center items-center flex-col gap-y-2">
          <img src="@/assets/icons/location-search.svg" class="h-20 w-20" alt="location search" />
          <p> Search for bed spaces closest to you</p>
        </div>
      </div>

      <div v-else-if="location && hospitals?.length === 0" class="text-center text-gray-600">
        <!-- Bed space not available -->
        <div class="flex justify-center items-center flex-col gap-y-2">
          <img src="@/assets/icons/location-search.svg" class="h-20 w-20" alt="location search" />
          <p> Bed space not available</p>
        </div>
      </div>
  

    <div v-else class="p-4">
    <p class="text-gray-600 mb-4">Results are automatically filtered based on your location</p>
    
    <!-- Horizontal Scrollable Hospital Cards -->
    <div class="flex space-x-4 overflow-x-auto custom-scrollbar">
      <div
        v-for="hospital in displayedHospitals"
        :key="hospital.place_id"
        class="hospital-card w-64 p-4 m-2 space-y-3 border rounded-lg shadow cursor-pointer transition-transform transform hover:scale-105"
        :class="{
          'bg-green-100 border-green-400': hospital.availability === 'available',
          'bg-red-100 border-red-400': hospital.availability === 'unavailable',
          'bg-blue-100 border-blue-400': hospital.availability === 'busy',
        }"
        @click="selectHospital(hospital)"
      >
<div class="flex justify-end items-end">
    <span
          class="text-xs rounded-full"
          :class="{
            'bg-green-500 text-white px-2 py-1 rounded': hospital.availability === 'available',
            'bg-red-500 text-white px-2 py-1 rounded': hospital.availability === 'unavailable',
            'bg-blue-500 text-white px-2 py-1 rounded': hospital.availability === 'busy',
          }"
        >
          {{ hospital.availability }}
        </span>
</div>
        <h3 class="text-base leading-snug font-bold" :class="{
            'text-green-500': hospital.availability === 'available',
            'text-red-500': hospital.availability === 'unavailable',
            'text-blue-500': hospital.availability === 'busy',
          }">{{ hospital.name }}</h3>
        <p class="text-sm text-gray-600">{{ hospital.vicinity }}</p>
      </div>
    </div>
    </div>
  
      <!-- View All Results Link -->
      <button v-if="!viewAll" @click="viewAll = true" class="mt-4 text-red-600">
        View all results
      </button>
  
      <!-- Filter Modal -->
      <!-- <FilterModal v-if="showFilterModal" @applyFilters="applyFilters" @close="closeFilterModal" /> -->

      <div v-if="showMap" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="relative bg-white w-full max-w-lg h-3/4 m-3 rounded-lg shadow-lg overflow-hidden">
        <button @click="showMap = false" class="absolute z-50 top-4 right-4 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <MapViews :hospital="selectedHospital" :userLocation="userLocation" />
      </div>
    </div>

    <transition name="fade">
        <div
          v-if="showFilterModal"
          class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
        >
          <div class="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-xl relative">
          <section class="flex justify-between items-center pb-6">
        <div>
            <button
            class="absolute top-4 left-4 text-gray-500"
            @click="closeModal"
          >
            &times;
          </button>
        </div>

          <!-- Title and Reset -->
          <!-- <div class="flex justify-between items-center mb-6"> -->
           <div>
            <h2 class="text-red-600 text-sm font-bold">Filter by</h2>
           </div>
         <div>
            <button class="text-gray-400" @click="resetFilters">Reset</button>
         </div>
          <!-- </div> -->
          </section>
       
  
            <!-- Filters Section -->
            <div class="space-y-8">
              <!-- Location Filter -->
              <div>
                <h3 class="text-red-600 font-bold">LOCATION</h3>
                <hr class="border-gray-200 my-2" />
                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="(location, index) in locations"
                    :key="index"
                    :class="['border px-3 py-1.5 rounded-full font-thin flex items-center gap-2', selectedFilters.location.includes(location) ? 'text-[#979797]' : 'text-[#979797]']"
                    @click="toggleLocation(location)"
                  >
                  <svg v-if="selectedFilters.location.includes(location)" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.535156" width="20" height="20" rx="10" fill="#CC1100"/>
                    <path d="M3.77531 11.3429C3.53124 11.0988 3.13551 11.0988 2.89143 11.3429C2.64736 11.587 2.64736 11.9827 2.89143 12.2267L6.64143 15.9767C6.88551 16.2208 7.28124 16.2208 7.52531 15.9767L16.692 6.8101C16.936 6.56603 16.936 6.1703 16.692 5.92622C16.4479 5.68215 16.0522 5.68215 15.8081 5.92622L7.08337 14.6509L3.77531 11.3429Z" fill="white"/>
                    </svg>
                    
                    <!-- <span class="block w-3 h-3 rounded-full border border-white" v-if="selectedFilters.location.includes(location)" style="background-color: white;"></span> -->
                    {{ location }}
                  </button>
                </div>
              </div>
  
              <!-- Bed Availability Filter -->
              <div>
                <h3 class="text-red-600 font-bold">BED AVAILABILITY</h3>
                <hr class="border-gray-200 my-2" />
                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="(availability, index) in bedAvailabilityOptions"
                    :key="index"
                    :class="['border px-3 py-1.5 rounded-full font-thin flex items-center gap-2', selectedFilters.bedAvailability.includes(availability) ? 'text-[#979797]' : 'text-[#979797]']"
                    @click="toggleBedAvailability(availability)"
                  >
                  <svg v-if="selectedFilters.bedAvailability.includes(availability)" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.535156" width="20" height="20" rx="10" fill="#CC1100"/>
                    <path d="M3.77531 11.3429C3.53124 11.0988 3.13551 11.0988 2.89143 11.3429C2.64736 11.587 2.64736 11.9827 2.89143 12.2267L6.64143 15.9767C6.88551 16.2208 7.28124 16.2208 7.52531 15.9767L16.692 6.8101C16.936 6.56603 16.936 6.1703 16.692 5.92622C16.4479 5.68215 16.0522 5.68215 15.8081 5.92622L7.08337 14.6509L3.77531 11.3429Z" fill="white"/>
                    </svg>
                    <!-- <span class="block w-3 h-3 rounded-full border border-white" v-if="selectedFilters.bedAvailability.includes(availability)" style="background-color: white;"></span> -->
                    {{ availability }}
                  </button>
                </div>
              </div>
  
              <!-- Hospital Type Filter -->
              <div>
                <h3 class="text-red-600 font-bold">HOSPITAL TYPE</h3>
                <hr class="border-gray-300 my-2" />
                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="(type, index) in hospitalTypes"
                    :key="index"
                    :class="['border px-3 py-1.5 rounded-full font-thin flex items-center gap-2', selectedFilters.hospitalType.includes(type) ? 'text-[#979797]' : 'text-[#979797]']"
                    @click="toggleHospitalType(type)"
                  >
                  <svg v-if="selectedFilters.hospitalType.includes(type)" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.535156" width="20" height="20" rx="10" fill="#CC1100"/>
                    <path d="M3.77531 11.3429C3.53124 11.0988 3.13551 11.0988 2.89143 11.3429C2.64736 11.587 2.64736 11.9827 2.89143 12.2267L6.64143 15.9767C6.88551 16.2208 7.28124 16.2208 7.52531 15.9767L16.692 6.8101C16.936 6.56603 16.936 6.1703 16.692 5.92622C16.4479 5.68215 16.0522 5.68215 15.8081 5.92622L7.08337 14.6509L3.77531 11.3429Z" fill="white"/>
                    </svg>
                    <!-- <span class="block w-3 h-3 rounded-full border border-white" v-if="selectedFilters.hospitalType.includes(type)" style="background-color: white;"></span> -->
                    {{ type }}
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Apply Filter Button -->
    <div class="mt-6">
        <button
        @click="applyFilters"
        class="w-full bg-red-600 text-white py-3 mt-6 rounded-lg font-bold"
      >
        APPLY FILTER TO SEARCH
      </button>
    </div>
          </div>
        </div>
      </transition>
  
      <!-- <CoreModal :isOpen="showMap">
        <MapViews :hospital="selectedHospital" :userLocation="userLocation" @close="showMap = false" />
      </CoreModal> -->
      <!-- Map View -->
      <!-- <MapViews v-if="showMap" :hospital="selectedHospital" :userLocation="userLocation" @close="showMap = false" /> -->
    </div>

  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'
  import { useNuxtApp } from '#app'
  
  const location = ref('')
  const hospitals = ref([])
  const loading = ref(false)
  const viewAll = ref(false)
  const showFilterModal = ref(false)
  const showMap = ref(false)
  const selectedHospital = ref(null)
  const userLocation = ref({ lat: null, lng: null })
  
  const { $loadGoogleMaps } = useNuxtApp()
  
  // Filtered hospitals based on view mode
  const displayedHospitals = computed(() => {
    return viewAll.value ? hospitals.value : hospitals.value.slice(0, 6)
  })
  
  // Function to open filter modal
  const openFilterModal = () => {
    showFilterModal.value = true
  }
  
  // Function to close filter modal
  const closeFilterModal = () => {
    showFilterModal.value = false
  }
  
  // Function to fetch closest hospital facilities
  const fetchHospitals = async () => {
    if (!location.value) return
  
    loading.value = true
    hospitals.value = []
  
    try {
      console.log("Fetching hospitals for location:", location.value) // Debug log
  
      // Load Google Maps SDK
      const google = await $loadGoogleMaps()
  
      // Use PlacesService for Nearby Search
      const service = new google.maps.places.PlacesService(document.createElement('div'))
      const geocoder = new google.maps.Geocoder()
  
      // Retrieve latitude and longitude from input location
      geocoder.geocode({ address: location.value }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0].geometry.location) {
          const locationLatLng = results[0].geometry.location
  
          // Search for the closest hospitals, ordered by distance
          service.nearbySearch(
            {
              location: locationLatLng,
              rankBy: google.maps.places.RankBy.DISTANCE,
              type: 'hospital',
            },
            (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                hospitals.value = results.map((hospital) => ({
                  ...hospital,
                  availability: mockAvailability(), // Mocking availability status
                }))
                console.log("Hospitals found:", hospitals.value) // Debug log
              } else {
                console.error('No hospitals found nearby.')
              }
              loading.value = false
            }
          )
        } else {
          console.error('Could not find location.')
          loading.value = false
        }
      })
    } catch (error) {
      console.error('Error loading Google Maps:', error)
      loading.value = false
    }
  }
  
  // Mock function to assign random availability status
  const mockAvailability = () => {
    const statuses = ['available', 'unavailable', 'busy']
    return statuses[Math.floor(Math.random() * statuses.length)]
  }
  
  // Get the user's current geolocation and populate the address
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Step 1: Retrieve coordinates
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          userLocation.value = { lat, lng }
          console.log("User coordinates:", userLocation.value) // Debug log
  
          // Step 2: Load Google Maps SDK
          const google = await $loadGoogleMaps()
          const geocoder = new google.maps.Geocoder()
  
          // Step 3: Reverse geocode to get the address
          geocoder.geocode({ location: userLocation.value }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results[0]) {
              // Step 4: Set location value with the address
              location.value = results[0].formatted_address
              console.log("Reverse geocoded address:", location.value) // Debug log
  
              // Step 5: Fetch hospitals after setting location
              fetchHospitals()
            } else {
              console.error('Could not retrieve address.')
              loading.value = false
            }
          })
        },
        (error) => {
          alert('Could not get current location. Please enter your location manually.')
          loading.value = false
        }
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  
  // Function to open map view
  const selectHospital = (hospital) => {
    selectedHospital.value = hospital
    showMap.value = true
  }
  
  // Fetch hospitals based on user’s current location on mount
  onMounted(() => {
    loading.value = true
    getUserLocation()
  })

    // Filter options
    const locations = ref([
    'Nearest to you', 'Surulere', 'Oshodi', 'Ikeja', 'Isolo', 'Mushin', 'Yaba', 'Idi-Araba'
  ])
  const bedAvailabilityOptions = ref(['Available', 'Unavailable', 'Busy'])
  const hospitalTypes = ref(['Teaching Hospital', 'General', 'Private', 'FMC'])

    // Selected filters
    const selectedFilters = ref({
    location: [] as string[],
    bedAvailability: [] as string[],
    hospitalType: [] as string[]
  })

    // Close modal
    const closeModal = () => {
    showFilterModal.value = false
  }


    // Apply filters
    const applyFilters = () => {
    console.log('Selected Filters:', selectedFilters.value)
    closeModal()
  }

    // Reset filters
    const resetFilters = () => {
    selectedFilters.value = {
      location: [],
      bedAvailability: [],
      hospitalType: []
    }
  }

  
  
  </script>
  
  <style scoped>
  .hospital-card {
    min-width: 240px;
  }
  
  .hide-scrollbar {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .custom-scrollbar {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  scrollbar-width: thin;
  scrollbar-color: #b3b3b3 transparent;
}

/* For Webkit browsers (Chrome, Safari) */
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #b3b3b3;
  border-radius: 10px;
}

/* Styling for the hospital card */
.hospital-card {
  width: 16rem; /* Fixed width for horizontal scrolling */
  min-width: 16rem; /* Ensures consistent width in the scroll container */
}
  </style>