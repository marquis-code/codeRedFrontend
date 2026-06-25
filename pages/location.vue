<!-- <template>
  <div class="flex flex-col items-center p-4">
    <input
      type="text"
      v-model="location"
      placeholder="Enter your location"
      class="w-full p-2 mb-4 border border-gray-300 rounded-md"
      readonly
    />
    <button
      @click="fetchHospitals"
      class="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Find Closest Hospitals
    </button>

    <div v-if="loading" class="mt-4">Loading...</div>

    <div v-if="hospitals.length > 0" class="w-full mt-4 space-y-4">
      <div
        v-for="hospital in hospitals"
        :key="hospital.place_id"
        class="p-4 border border-gray-300 rounded-md shadow flex justify-between items-center"
      >
        <div>
          <h3 class="font-bold">{{ hospital.name }}</h3>
          <p>{{ hospital.vicinity }}</p>
        </div>
        <span
          :class="{
            'bg-green-500 text-white px-2 py-1 rounded': hospital.availability === 'available',
            'bg-red-500 text-white px-2 py-1 rounded': hospital.availability === 'unavailable',
            'bg-yellow-500 text-white px-2 py-1 rounded': hospital.availability === 'busy',
          }"
        >
          {{ hospital.availability }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const location = ref('')
const hospitals = ref([])
const loading = ref(false)

const { $loadGoogleMaps } = useNuxtApp()

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

    // Retrieve latitude and longitude from input location
    const geocoder = new google.maps.Geocoder()
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
            } else {
              alert('No hospitals found nearby.')
            }
            loading.value = false
          }
        )
      } else {
        alert('Could not find location.')
        loading.value = false
      }
    })
  } catch (error) {
    console.error('Error loading Google Maps:', error)
    alert('An error occurred while loading Google Maps.')
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
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        console.log("User coordinates:", { lat, lng }) // Debug log
        loading.value = true

        try {
          const google = await $loadGoogleMaps()
          const geocoder = new google.maps.Geocoder()

          // Reverse geocode to get user's address
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results[0]) {
              location.value = results[0].formatted_address
              console.log("Reverse geocoded address:", location.value) // Debug log

              // Fetch the closest hospitals immediately after retrieving address
              fetchHospitals()
            } else {
              alert('Could not retrieve address.')
              loading.value = false
            }
          })
        } catch (error) {
          console.error('Error with reverse geocoding:', error)
          loading.value = false
        }
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

// Fetch hospitals based on user’s current location on mount
onMounted(() => {
  getUserLocation()
})
</script> -->


<!-- <template>
  <div class="p-4">

    <div class="flex items-center space-x-2 mb-6">
      <input
        type="text"
        v-model="location"
        placeholder="Search hospitals..."
        class="w-full p-3 border border-gray-300 rounded-md shadow-sm"
        readonly
      />
      <button @click="openFilterModal" class="text-gray-500">
        <i class="fa fa-filter"></i>
      </button>
    </div>


    <p class="text-gray-600 mb-4">Results are automatically filtered based on your location</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="hospital in displayedHospitals"
        :key="hospital.place_id"
        class="p-4 rounded-md shadow cursor-pointer transition-transform transform hover:scale-105"
        :class="{
          'bg-green-100 border-green-400': hospital.availability === 'available',
          'bg-red-100 border-red-400': hospital.availability === 'unavailable',
          'bg-blue-100 border-blue-400': hospital.availability === 'busy',
        }"
        @click="selectHospital(hospital)"
      >
        <h3 class="text-lg font-bold">{{ hospital.name }}</h3>
        <p class="text-sm text-gray-600">{{ hospital.vicinity }}</p>
        <span
          :class="{
            'bg-green-500 text-white px-2 py-1 rounded': hospital.availability === 'available',
            'bg-red-500 text-white px-2 py-1 rounded': hospital.availability === 'unavailable',
            'bg-blue-500 text-white px-2 py-1 rounded': hospital.availability === 'busy',
          }"
        >
          {{ hospital.availability }}
        </span>
      </div>
    </div>


    <button v-if="!viewAll" @click="viewAll = true" class="mt-4 text-red-600">
      View all results
    </button>


    <FilterModal v-if="showFilterModal" @applyFilters="applyFilters" @close="closeFilterModal" />


    <MapViews v-if="showMap" :hospital="selectedHospital" :userLocation="userLocation" @close="showMap = false" />
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
  return viewAll.value ? hospitals.value : hospitals.value.slice(0, 2)
})

// Function to open filter modal
const openFilterModal = () => {
  showFilterModal.value = true
}

// Function to close filter modal
const closeFilterModal = () => {
  showFilterModal.value = false
}

// Function to apply filters from the modal
const applyFilters = (filters) => {
  // Apply the filters to hospitals (e.g., location, availability)
  // Example: filtering by availability
  hospitals.value = hospitals.value.filter(hospital => filters.availability.includes(hospital.availability))
  closeFilterModal()
}

// Function to open map view
const selectHospital = (hospital) => {
  selectedHospital.value = hospital
  showMap.value = true
}

// Fetch user location and hospitals
const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      userLocation.value.lat = position.coords.latitude
      userLocation.value.lng = position.coords.longitude
      // Call function to fetch hospitals here
    })
  }
}

onMounted(() => {
  getUserLocation()
})
</script>

<style scoped>
/* Add any additional styling here */
</style> -->


<!-- <template>
  <div class="p-4">

    <div class="flex items-center space-x-2 mb-6">
      <input
        type="text"
        v-model="location"
        placeholder="Search hospitals..."
        class="w-full p-3 border border-gray-300 rounded-md shadow-sm"
        readonly
      />
      <button @click="openFilterModal" class="text-gray-500">
        <i class="fa fa-filter"></i>
      </button>
    </div>

    <p class="text-gray-600 mb-4">Results are automatically filtered based on your location</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="hospital in displayedHospitals"
        :key="hospital.place_id"
        class="p-4 rounded-md shadow cursor-pointer transition-transform transform hover:scale-105"
        :class="{
          'bg-green-100 border-green-400': hospital.availability === 'available',
          'bg-red-100 border-red-400': hospital.availability === 'unavailable',
          'bg-blue-100 border-blue-400': hospital.availability === 'busy',
        }"
        @click="selectHospital(hospital)"
      >
        <h3 class="text-lg font-bold">{{ hospital.name }}</h3>
        <p class="text-sm text-gray-600">{{ hospital.vicinity }}</p>
        <span
          :class="{
            'bg-green-500 text-white px-2 py-1 rounded': hospital.availability === 'available',
            'bg-red-500 text-white px-2 py-1 rounded': hospital.availability === 'unavailable',
            'bg-blue-500 text-white px-2 py-1 rounded': hospital.availability === 'busy',
          }"
        >
          {{ hospital.availability }}
        </span>
      </div>
    </div>


    <button v-if="!viewAll" @click="viewAll = true" class="mt-4 text-red-600">
      View all results
    </button>


    <FilterModal v-if="showFilterModal" @applyFilters="applyFilters" @close="closeFilterModal" />


    <MapViews v-if="showMap" :hospital="selectedHospital" :userLocation="userLocation" @close="showMap = false" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
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

// / Filtered hospitals based on view mode
const displayedHospitals = computed(() => {
  return viewAll.value ? hospitals.value : hospitals.value.slice(0, 2)
})

// Function to open filter modal
const openFilterModal = () => {
  showFilterModal.value = true
}

// Function to close filter modal
const closeFilterModal = () => {
  showFilterModal.value = false
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
          } else {
            console.error('Could not retrieve address.')
          }
          loading.value = false
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

// Function to apply filters from the modal
const applyFilters = (filters) => {
  // Apply the filters to hospitals (e.g., location, availability)
  // Example: filtering by availability
  hospitals.value = hospitals.value.filter(hospital => filters.availability.includes(hospital.availability))
  closeFilterModal()
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
</script> -->


<template>
  <div class="p-4">
    <!-- Search Input and Filter Icon -->
    <div class="flex items-center space-x-2 mb-6">
      <input
        type="text"
        v-model="location"
        placeholder="Search hospitals..."
        class="w-full p-3 border border-gray-300 rounded-md shadow-sm"
        readonly
      />
      <button @click="openFilterModal" class="text-gray-500">
        <i class="fa fa-filter"></i>
      </button>
    </div>

    <!-- Results Information and Hospital Cards -->
    <p class="text-gray-600 mb-4">Results are automatically filtered based on your location</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="hospital in displayedHospitals"
        :key="hospital.place_id"
        class="p-4 rounded-md shadow cursor-pointer transition-transform transform hover:scale-105"
        :class="{
          'bg-green-100 border-green-400': hospital.availability === 'available',
          'bg-red-100 border-red-400': hospital.availability === 'unavailable',
          'bg-blue-100 border-blue-400': hospital.availability === 'busy',
        }"
        @click="selectHospital(hospital)"
      >
        <h3 class="text-lg font-bold">{{ hospital.name }}</h3>
        <p class="text-sm text-gray-600">{{ hospital.vicinity }}</p>
        <span
          :class="{
            'bg-green-500 text-white px-2 py-1 rounded': hospital.availability === 'available',
            'bg-red-500 text-white px-2 py-1 rounded': hospital.availability === 'unavailable',
            'bg-blue-500 text-white px-2 py-1 rounded': hospital.availability === 'busy',
          }"
        >
          {{ hospital.availability }}
        </span>
      </div>
    </div>

    <!-- View All Results Link -->
    <button v-if="!viewAll" @click="viewAll = true" class="mt-4 text-red-600">
      View all results
    </button>

    <!-- Filter Modal -->
    <FilterModal v-if="showFilterModal" @applyFilters="applyFilters" @close="closeFilterModal" />

    <!-- Map View -->
    <MapViews v-if="showMap" :hospital="selectedHospital" :userLocation="userLocation" @close="showMap = false" />
  </div>
</template>

<script lang="ts" setup>
import { useCustomToast } from '@/composables/core/useCustomToast'
import { ref, onMounted, computed } from 'vue'
import { useRuntimeConfig } from '#app'

const { showToast } = useCustomToast()
const config = useRuntimeConfig()

const location = ref('')
const hospitals = ref<any[]>([])
const loading = ref(false)
const viewAll = ref(false)
const showFilterModal = ref(false)
const showMap = ref(false)
const selectedHospital = ref<any>(null)
const userLocation = ref<{ lat: number; lng: number } | null>(null)

// Filtered hospitals based on view mode
const displayedHospitals = computed(() => {
  return viewAll.value ? hospitals.value : hospitals.value.slice(0, 2)
})

// Function to open filter modal
const openFilterModal = () => {
  showFilterModal.value = true
}

// Function to close filter modal
const closeFilterModal = () => {
  showFilterModal.value = false
}

// Haversine formula to calculate distance
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Function to fetch closest hospital facilities
const fetchHospitals = async () => {
  if (!location.value) return

  loading.value = true
  hospitals.value = []

  try {
    console.log("Fetching hospitals for location:", location.value) // Debug log
    const mapboxToken = config.public.mapboxAccessToken
    
    // Convert location string to coords if needed, but since we already have userLocation from getUserLocation, 
    // let's just use it directly to search near user.
    let searchLng = userLocation.value?.lng
    let searchLat = userLocation.value?.lat

    if (!searchLng || !searchLat) {
      // Forward geocode the location string
      const geocodeRes = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location.value)}.json?country=ng&access_token=${mapboxToken}`)
      const geocodeData = await geocodeRes.json()
      if (geocodeData.features && geocodeData.features.length > 0) {
        searchLng = geocodeData.features[0].center[0]
        searchLat = geocodeData.features[0].center[1]
      } else {
        console.error('Could not find location.')
        loading.value = false
        return
      }
    }

    // Search nearby hospitals
    const placesRes = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?country=ng&proximity=${searchLng},${searchLat}&access_token=${mapboxToken}`)
    const placesData = await placesRes.json()

    if (placesData.features && placesData.features.length > 0) {
      hospitals.value = placesData.features.map((place: any) => ({
        place_id: place.id,
        name: place.text,
        vicinity: place.place_name,
        latitude: place.center[1],
        longitude: place.center[0],
        distance: calculateDistance(searchLat!, searchLng!, place.center[1], place.center[0]),
        availability: mockAvailability(), // Mocking availability status
      })).sort((a: any, b: any) => a.distance - b.distance)
      console.log("Hospitals found:", hospitals.value)
    } else {
      console.error('No hospitals found nearby.')
    }
  } catch (error) {
    console.error('Error fetching Mapbox data:', error)
  } finally {
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

        try {
          const mapboxToken = config.public.mapboxAccessToken
          const reverseRes = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?country=ng&access_token=${mapboxToken}`)
          const reverseData = await reverseRes.json()

          if (reverseData.features && reverseData.features.length > 0) {
            location.value = reverseData.features[0].place_name
            console.log("Reverse geocoded address:", location.value)
            
            // Fetch hospitals after setting location
            fetchHospitals()
          } else {
            console.error('Could not retrieve address.')
            loading.value = false
          }
        } catch (error) {
          console.error("Error reverse geocoding:", error)
          loading.value = false
        }
      },
      (error) => {
        showToast({
            title: "Error",
            message: "Could not get current location. Please enter your location manually.",
            toastType: "error",
            duration: 3000
          });
        loading.value = false
      }
    )
  } else {
    showToast({
            title: "Error",
            message: "Geolocation is not supported by this browser",
            toastType: "error",
            duration: 3000
          });
  }
}

// Function to apply filters from the modal
const applyFilters = (filters: any) => {
  hospitals.value = hospitals.value.filter(hospital => filters.availability.includes(hospital.availability))
  closeFilterModal()
}

// Function to open map view
const selectHospital = (hospital: any) => {
  selectedHospital.value = hospital
  showMap.value = true
}

// Fetch hospitals based on user’s current location on mount
onMounted(() => {
  loading.value = true
  getUserLocation()
})
</script>
