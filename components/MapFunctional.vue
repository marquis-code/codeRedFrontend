<template>
<main>
  <div class="container mx-auto">
    <!-- Search Input and Filter Icon -->
    <section class="p-3 lg:p-6 bg-[#FFF9F9CC] max-w-7xl mx-auto">
      <div class="flex items-center border-2 border-red-600  rounded-lg bg-white p-3 shadow-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.485 20.1536L13.223 13.8916C12.723 14.3176 12.148 14.6472 11.498 14.8806C10.848 15.1139 10.1947 15.2306 9.53798 15.2306C7.93665 15.2306 6.58132 14.6762 5.47198 13.5676C4.36265 12.4589 3.80798 11.1039 3.80798 9.50256C3.80798 7.90122 4.36198 6.54556 5.46998 5.43556C6.57798 4.32556 7.93265 3.76989 9.53398 3.76856C11.1353 3.76722 12.4913 4.32189 13.602 5.43256C14.7127 6.54322 15.268 7.89889 15.268 9.49956C15.268 10.1942 15.145 10.8666 14.899 11.5166C14.653 12.1666 14.3296 12.7226 13.929 13.1846L20.191 19.4456L19.485 20.1536ZM9.53898 14.2296C10.8656 14.2296 11.9857 13.7729 12.899 12.8596C13.8123 11.9462 14.269 10.8259 14.269 9.49856C14.269 8.17122 13.8123 7.05122 12.899 6.13856C11.9857 5.22589 10.8656 4.76922 9.53898 4.76856C8.21232 4.76789 7.09198 5.22456 6.17798 6.13856C5.26398 7.05256 4.80732 8.17256 4.80798 9.49856C4.80865 10.8246 5.26532 11.9446 6.17798 12.8586C7.09065 13.7726 8.21065 14.2292 9.53798 14.2286"
            fill="black" fill-opacity="0.8" />
        </svg>
        <input ref="inputRef" type="text" @keyup.enter="handleEnter" v-model="query" placeholder="Search by name or location..."
          class="flex-grow outline-none text-gray-500 py-5 bg-white" />
        <button @click="fetchHospitals"
          class="bg-black text-white rounded-lg p-2 ml-4 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none"
            stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button @click="showFilterModal = true" class="text-gray-500 ml-4">
          <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.9516 9.787H6.39369M6.39369 9.787C6.39369 10.3652 6.17789 10.9197 5.79544 11.3285C5.41299 11.7373 4.89427 11.967 4.3534 11.967C3.81253 11.967 3.29381 11.7373 2.91136 11.3285C2.5289 10.9197 2.31404 10.3652 2.31404 9.787M6.39369 9.787C6.39369 9.20883 6.17789 8.65434 5.79544 8.24551C5.41299 7.83668 4.89427 7.607 4.3534 7.607C3.81253 7.607 3.29381 7.83668 2.91136 8.24551C2.5289 8.65434 2.31404 9.20883 2.31404 9.787M2.31404 9.787H0.645142M17.9516 16.394H12.5744M12.5744 16.394C12.5744 16.9723 12.3591 17.5274 11.9765 17.9363C11.594 18.3453 11.0751 18.575 10.5341 18.575C9.99327 18.575 9.47455 18.3443 9.0921 17.9355C8.70965 17.5267 8.49479 16.9722 8.49479 16.394M12.5744 16.394C12.5744 15.8157 12.3591 15.2616 11.9765 14.8527C11.594 14.4437 11.0751 14.214 10.5341 14.214C9.99327 14.214 9.47455 14.4437 9.0921 14.8525C8.70965 15.2613 8.49479 15.8158 8.49479 16.394M8.49479 16.394H0.645142M17.9516 3.18H15.0469M15.0469 3.18C15.0469 3.46628 14.9932 3.74976 14.8907 4.01425C14.7883 4.27874 14.638 4.51906 14.4487 4.72149C14.2593 4.92392 14.0345 5.0845 13.7871 5.19406C13.5396 5.30361 13.2744 5.36 13.0066 5.36C12.4658 5.36 11.947 5.13032 11.5646 4.72149C11.1821 4.31266 10.9673 3.75817 10.9673 3.18M15.0469 3.18C15.0469 2.89372 14.9932 2.61024 14.8907 2.34575C14.7883 2.08126 14.638 1.84094 14.4487 1.63851C14.2593 1.43608 14.0345 1.2755 13.7871 1.16594C13.5396 1.05639 13.2744 1 13.0066 1C12.4658 1 11.947 1.22968 11.5646 1.63851C11.1821 2.04734 10.9673 2.60183 10.9673 3.18M10.9673 3.18H0.645142"
              stroke="black" stroke-opacity="0.8" stroke-miterlimit="10" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </section>

    <div v-if="loading" class="text-center text-gray-600 py-10">
      <div class="spinner"></div>
      please wait while we search for facilities closest to you...
    </div>

    <div v-else-if="!location && hospitals?.length === 0"
      class="text-center text-gray-600 border rounded border-gray-100 py-6">
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
        <div v-for="hospital in displayedHospitals" :key="hospital.place_id"
         @click="selectHospital(hospital)"
          class="hospital-card relative w-64 p-4 m-2 space-y-3 border rounded-lg shadow cursor-pointer transition-transform transform hover:scale-105"
          :class="{
            'bg-green-100 border-green-400': hospital.availability === 'available',
            'bg-red-100 border-red-400': hospital.availability === 'unavailable',
            'bg-blue-100 border-blue-400': hospital.availability === 'busy',
          }">
          <!-- {{ hospital }} -->
             <div class="flex justify-start items-start absolute top-0 left-0">
            <!-- <span class="text-xs rounded-full" :class="{
              'bg-green-500 text-white px-2 py-1 rounded': hospital.pricing === 'high',
              'bg-red-500 text-white px-2 py-1 rounded': hospital.pricing === 'affordable',
              'bg-blue-500 text-white px-2 py-1 rounded': hospital.pricing === 'average',
            }">
              {{ hospital.pricing }}
            </span> -->
            <span class="text-xs rounded-tl-lg py-1 px-6 bg-black text-white">
              {{ hospital.pricing }}
            </span>
          </div>
          <div class="flex justify-end items-end">
            <span class="text-xs rounded-full" :class="{
              'bg-green-500 text-white px-2 py-1 rounded': hospital.availability === 'available',
              'bg-red-500 text-white px-2 py-1 rounded': hospital.availability === 'unavailable',
              'bg-blue-500 text-white px-2 py-1 rounded': hospital.availability === 'busy',
            }">
              {{ hospital.availability }}
            </span>
          </div>
          <h3 class="text-base leading-snug font-bold" :class="{
            'text-green-500': hospital.availability === 'available',
            'text-red-500': hospital.availability === 'unavailable',
            'text-blue-500': hospital.availability === 'busy',
          }">
            <!-- <img class="h-10 w-10 " :src="hospital.icon" alt="icon"/> -->
            {{ hospital.name }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ hospital.vicinity }}
          </p>
        </div>
      </div>
    </div>

    <!-- View All Results Link -->
    <!-- <button v-if="!viewAll" @click="viewAll = true" class="mt-4 pl-6 text-red-600">
      View all results
    </button> -->
    <NuxtLink v-if="displayedHospitals.length" to="/view-all"  class="mt-4 pl-6 text-red-600">
      View all results
    </NuxtLink>

    <!-- Filter Modal -->
    <!-- <FilterModal v-if="showFilterModal" @filters-applied="applyFilters" @close="closeFilterModal" /> -->
    <FilterModal
      v-if="showFilterModal"
      @filters-applied="applyFilters"
      @close="showFilterModal = false"
    />

    <div v-if="showMap" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="relative bg-white w-full max-w-lg h-3/4 m-3 rounded-lg shadow-lg overflow-hidden">
        <button @click="showMap = false" class="absolute z-50 top-4 right-4 bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none"
            stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <MapViews :hospital="selectedHospital" :userLocation="userLocation" />
      </div>
    </div>
  </div>

  <div v-if="forceLocationModal" class="location-modal">
    <div class="modal-content">
      <h2>Enable Location Access</h2>
      <p>
        This application requires location access to function. Please enable
        location services in your browser settings.
      </p>
      <button @click="retryLocationAccess">Retry</button>
    </div>
  </div>
</main>
</template>

<script lang="ts" setup>
import { Loader } from '@googlemaps/js-api-loader';
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
import { ref, onMounted, computed } from 'vue'
const router = useRouter()
import { useNuxtApp } from '#app'

const location = ref('')
const hospitals = ref([])
const loading = ref(false)
const viewAll = ref(false)
const showFilterModal = ref(false)
const showMap = ref(false)
const selectedHospital = ref(null)
const userLocation = ref({ lat: null, lng: null })
const query = ref('') as any // Single query for name or location
const inputRef = ref<HTMLInputElement | null>(null);

const { $loadGoogleMaps } = useNuxtApp()
const forceLocationModal = ref(false); 

// Example user-selected filters
const selectedHospitalType = ref('') as Record<string, any>
const selectedSpeciality = ref('') as Record<string, any>
const selectedBedAvailability = ref('') as Record<string, any>
const selectedLocation = ref('') as Record<string, any>


// Mock function to assign random availability status
const mockAvailability = () => {
  const statuses = ['available', 'unavailable', 'busy']
  return statuses[Math.floor(Math.random() * statuses.length)]
}

const mockPricing = () => {
  const priceStatus = ['high', 'affordable', 'average']
  return priceStatus[Math.floor(Math.random() * priceStatus.length)]
}

const mockHospitalType = () => {
  const hospitalTypes = ['Teaching Hospital', 'General', 'Private', 'FMC', 'Specialist Hospital', 'Primary Healthcare Center']
  return hospitalTypes[Math.floor(Math.random() * hospitalTypes.length)]
}

const specialities = [
  "Diabetes",
  "Sickle cell crisis",
  "Hypertensive related crisis",
  "Asthma",
  "Drug overdose",
  "Mania",
  "Panic attacks",
  "Shortness of breath",
  "Fainting/Syncope",
  "Seizures/Epilepsy",
  "Bleeding",
  "Falls",
  "Stomach ache",
  "Headache",
  "Chest pain",
  "Fever",
  "Cough",
  "Fracture",
  "Gun shot",
  "Pregnancy",
  "Labour pain",
  "Newborn care",
  "Car accidents",
  "Workplace accidents",
  "Pain",
  "Swelling",
];

const mockSpecialities = () => {
  // Number of specialities to select (1 to 3 random specialities)
  const numberOfSpecialities = Math.floor(Math.random() * 3) + 1;

  // Shuffle the array and pick the first `numberOfSpecialities` items
  const shuffledSpecialities = [...specialities].sort(() => 0.5 - Math.random());
  return shuffledSpecialities.slice(0, numberOfSpecialities);
};

// Filtered hospitals based on view mode
// const displayedHospitals = computed(() => {
//   return viewAll.value ? hospitals.value : hospitals.value.slice(0, 6)
// })

const displayedHospitals = computed(() => {
  // If a bed availability filter is selected, filter hospitals
  if (selectedBedAvailability.value) {
    console.log(selectedBedAvailability.value, 'availabiliet')
    const filteredHospitals = hospitals.value.filter((hospital) => {
      return hospital.availability === selectedBedAvailability.value?.toLowerCase();
    });

    // Apply pagination if viewAll is false
    return viewAll.value ? filteredHospitals : filteredHospitals.slice(0, 6);
  }

  // If no filter is selected, return the original functionality
  return viewAll.value ? hospitals.value : hospitals.value.slice(0, 6);
});

// const displayedHospitals = ref([]);

// Function to update the hospital list based on filters
// const updateDisplayedHospitals = () => {
//   displayedHospitals.value = hospitals.value.filter((hospital) => {
//     // If no filters are selected, return all hospitals
//     const noFiltersSelected =
//       !selectedHospitalType.value &&
//       selectedSpeciality.value.length === 0 &&
//       !selectedBedAvailability.value &&
//       !selectedLocation.value;

//     if (noFiltersSelected) {
//       return true; // Include all hospitals if no filters are applied
//     }

//     // Filter by hospital type
//     const matchesType =
//       !selectedHospitalType.value || hospital.types.includes(selectedHospitalType.value);

//     // Filter by specialities
//     const matchesSpecialities =
//       selectedSpeciality.value.length === 0 ||
//       selectedSpeciality.value.some((speciality) => hospital.specialities?.includes(speciality));

//     // Filter by bed availability
//     const matchesAvailability =
//       !selectedBedAvailability.value || hospital.availability === selectedBedAvailability.value;

//     // Filter by location
//     const matchesLocation =
//       !selectedLocation.value || hospital.vicinity.toLowerCase().includes(selectedLocation.value.toLowerCase());

//     // Return hospitals matching all selected filters
//     return matchesType && matchesSpecialities && matchesAvailability && matchesLocation;
//   }).slice(0, viewAll.value ? undefined : 6); // Slice for pagination
// };

// Watchers to detect changes in filters
// watch(
//   [selectedHospitalType, selectedSpeciality, selectedBedAvailability, selectedLocation, viewAll],
//   () => {
//     console.log(selectedHospitalType, selectedSpeciality, selectedBedAvailability, selectedLocation.value)
//     // updateDisplayedHospitals();
//   },
//   { immediate: true }
// );

// Function to apply filters from user input
const applyFilters = (filters) => {
  console.log(filters, 'filters here')
  selectedLocation.value = filters?.location || '';
  selectedBedAvailability.value = filters.status || '';
  selectedSpeciality.value = filters.speciality || '';
  selectedHospitalType.value = filters.hospitalType || '';
  showFilterModal.value = false
};

// Watchers for each filter
watch(
  [selectedLocation, selectedBedAvailability, selectedSpeciality, selectedHospitalType],
  ([newLocation, newAvailability, newSpecialities, newType]) => {
    // console.log('Filters changed:', {
    //   location: newLocation,
    //   availability: newAvailability,
    //   specialities: newSpecialities,
    //   type: newType,
    // });

    // Call fetchHospitals whenever any filter changes
    fetchHospitals();
  },
  { immediate: false, deep: false }
);


// const getUserLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         // Step 1: Retrieve coordinates
//         const lat = position.coords.latitude
//         const lng = position.coords.longitude
//         userLocation.value = { lat, lng }
//         console.log('User coordinates:', userLocation.value)

//         localStorage.setItem('userLocation', JSON.stringify(userLocation.value))
        

//         // Step 2: Reverse geocode to get the address
//         try {
//           const google = await $loadGoogleMaps()
//           const geocoder = new google.maps.Geocoder()

//           geocoder.geocode(
//             { location: { lat, lng } },
//             (results, status) => {
//               if (
//                 status === google.maps.GeocoderStatus.OK &&
//                 results[0]?.formatted_address
//               ) {
//                 // Step 3: Prefill input field with the address
//                 query.value = results[0].formatted_address
//                 console.log('User location (address):', query.value)

//                 // Step 4: Fetch hospitals near the user's location
//                 fetchHospitalsByLocation(lat, lng)
//               } else {
//                 console.error('Reverse geocoding failed:', status)
//                 showToast({
//                   title: 'Error',
//                   message: 'Could not determine your location.',
//                   toastType: 'error',
//                   duration: 3000,
//                 })
//               }
//             }
//           )
//         } catch (error) {
//           console.error('Error during reverse geocoding:', error)
//         }
// //         try {
// //   const google = await $loadGoogleMaps();
// //   const geocoder = new google.maps.Geocoder();

// //   geocoder.geocode({ location: { lat, lng } }, (results, status) => {
// //     if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
// //       // Log all results for debugging
// //       console.log('Geocoding results:', results);

// //       // Prefer the most specific result
// //       const formattedAddress = results[0].formatted_address || 'Unknown location';
// //       query.value = formattedAddress;

// //       console.log('User location (address):', query.value);

// //       // Fetch hospitals near the user's location
// //       fetchHospitalsByLocation(lat, lng);
// //     } else {
// //       // Handle geocoding errors
// //       console.error('Reverse geocoding failed:', status);
// //       showToast({
// //         title: 'Error',
// //         message: 'Could not determine your location. Please refine your location manually.',
// //         toastType: 'error',
// //         duration: 3000,
// //       });

// //       query.value = 'Enter your location manually';
// //     }
// //   });
// // } catch (error) {
// //   console.error('Error during reverse geocoding:', error);
// //   showToast({
// //     title: 'Error',
// //     message: 'An unexpected error occurred while determining your location.',
// //     toastType: 'error',
// //     duration: 3000,
// //   });
// // }

//       },
//       (error) => {
//         console.error('Error retrieving geolocation:', error)
//         showToast({
//           title: 'Error',
//           message: 'Could not get your current location. Please enter it manually.',
//           toastType: 'error',
//           duration: 3000,
//         })
//         loading.value = false
//       }
//     )
//   } else {
//     console.error('Geolocation is not supported by this browser.')
//     showToast({
//       title: 'Error',
//       message: 'Geolocation is not supported by your browser.',
//       toastType: 'error',
//       duration: 3000,
//     })
//     loading.value = false
//   }
// }


const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Step 1: Retrieve coordinates
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        userLocation.value = { lat, lng };
        console.log("User coordinates:", userLocation.value);

        localStorage.setItem("userLocation", JSON.stringify(userLocation.value));

        // Step 2: Reverse geocode to get the address
        try {
          const google = await $loadGoogleMaps();
          const geocoder = new google.maps.Geocoder();

          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (
              status === google.maps.GeocoderStatus.OK &&
              results[0]?.formatted_address
            ) {
              // Step 3: Prefill input field with the address
              query.value = results[0].formatted_address;
              console.log("User location (address):", query.value);

              // Step 4: Fetch hospitals near the user's location
              fetchHospitalsByLocation(lat, lng);
            } else {
              console.error("Reverse geocoding failed:", status);
              showToast({
                title: "Error",
                message: "Could not determine your location.",
                toastType: "error",
                duration: 3000,
              });
            }
          });
        } catch (error) {
          console.error("Error during reverse geocoding:", error);
        }

        // Hide the modal once the location is obtained
        forceLocationModal.value = false;
      },
      (error) => {
        console.error("Error retrieving geolocation:", error);

        // Show a modal and retry prompt
        forceLocationModal.value = true;

        showToast({
          title: "Error",
          message:
            "Location access is required for this app. Please enable location services and try again.",
          toastType: "error",
          duration: 5000,
        });

        loading.value = false;
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    showToast({
      title: "Error",
      message: "Geolocation is not supported by your browser.",
      toastType: "error",
      duration: 3000,
    });

    forceLocationModal.value = true; // Force modal for unsupported browser
    loading.value = false;
  }
};

// Retry mechanism
const retryLocationAccess = () => {
  getUserLocation(); // Retry getting the location
};



const fetchHospitalsByLocation = async (lat, lng) => {
  loading.value = true
  hospitals.value = []

  try {
    console.log('Fetching hospitals near coordinates:', { lat, lng })

    // Load Google Maps SDK
    const google = await $loadGoogleMaps()
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    )

    // Use PlacesService for Nearby Search
    service.nearbySearch(
      {
        location: new google.maps.LatLng(lat, lng),
        rankBy: google.maps.places.RankBy.DISTANCE,
        // radius: 5000, // Search within 5km radius
        type: 'hospital',
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          hospitals.value = results.map((hospital) => ({
            ...hospital,
            availability: mockAvailability(),
            pricing: mockPricing(),
            specialities: mockSpecialities(),
            hospitalType: mockHospitalType(),
            latitude: hospital.geometry.location.lat(),
            longitude: hospital.geometry.location.lng(),
          }))
          console.log('Hospitals found near location:', hospitals.value)
        } else {
          console.error('No hospitals found nearby. Status:', status)
          showToast({
            title: 'Error',
            message: 'No hospitals found near your location.',
            toastType: 'error',
            duration: 3000,
          })
        }
        loading.value = false
      }
    )
  } catch (error) {
    console.error('Error fetching hospitals near location:', error)
    showToast({
      title: 'Error',
      message: 'An error occurred while fetching hospitals.',
      toastType: 'error',
      duration: 3000,
    })
    loading.value = false
  }
}


// Function to open map view
const selectHospital = (hospital) => {
  console.log(hospital, 'here')
  localStorage.setItem('selectedHospital', JSON.stringify(hospital))
  selectedHospital.value = hospital
  showMap.value = true
  router.push({
    path: '/hospital/details',
    query: {
      id: hospital.place_id,
      name: hospital.name,
      location: hospital.vicinity,
      status: hospital.avaailability,
      lat: hospital.latitude,
      lon: hospital.longitude
    }
  })
}


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


// // Apply filters
// const applyFilters = (data: any) => {
//   console.log('Selected Filters:', data)
//   // closeModal()
// }

// Reset filters
const resetFilters = () => {
  selectedFilters.value = {
    location: [],
    bedAvailability: [],
    hospitalType: []
  }
}


//ORIGINAL
// const fetchHospitals = async () => {
//   if (!query.value) {
//     showToast({
//       title: 'Error',
//       message: 'Please enter a location or hospital name to search.',
//       toastType: 'error',
//       duration: 3000,
//     })
//     return
//   }

//   loading.value = true
//   hospitals.value = []

//   try {
//   console.log('Searching for hospitals with query:', query.value)

//   const google = await $loadGoogleMaps()
//   const service = new google.maps.places.PlacesService(
//     document.createElement('div')
//   )

//   console.log('PlacesService initialized.')

//   service.textSearch({ query: query.value, type: 'hospital' }, (results, status) => {
//     console.log('TextSearch status:', status)
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       console.log('Results:', results)
//       hospitals.value = results.map((hospital) => ({
//         ...hospital,
//         availability: mockAvailability(),
//         latitude: hospital.geometry.location.lat(),
//         longitude: hospital.geometry.location.lng(),
//       }))
//     } else {
//       console.error('Google Maps PlacesService Error:', status)
//       showToast({
//         title: 'Error',
//         message: `Unable to fetch hospitals. Status: ${status}`,
//         toastType: 'error',
//         duration: 3000,
//       })
//     }
//     loading.value = false
//   })
// } catch (error) {
//   console.error('Error fetching hospitals:', error)
//   showToast({
//     title: 'Error',
//     message: 'An error occurred while fetching hospitals. Try again later.',
//     toastType: 'error',
//     duration: 3000,
//   })
//   loading.value = false
// }

// }

// const fetchHospitals = async () => {
//   if (!query.value || !selectedLocation.value || !selectedBedAvailability.value || !selectedSpeciality.value || !selectedHospitalType.value) {
//     showToast({
//       title: 'Error',
//       message: 'Please enter a location or hospital name to search.',
//       toastType: 'error',
//       duration: 3000,
//     })
//     return
//   }

//   loading.value = true
//   hospitals.value = []

//   console.log(selectedLocation, 'selected location')

//   try {
//     console.log('Searching for hospitals with query:', query.value)

//     // Load Google Maps SDK
//     const google = await $loadGoogleMaps()
//     const service = new google.maps.places.PlacesService(
//       document.createElement('div')
//     )

//     // Use PlacesService's textSearch for both name and location
//     // service.textSearch(
//     //   { query: query.value, type: 'hospital' },
//     //   (results, status) => {
//     //     if (status === google.maps.PlacesServiceStatus.OK) {
//     //       hospitals.value = results.map((hospital) => ({
//     //         ...hospital,
//     //         name: hospital.name, // Hospital name
//     //         vicinity: hospital.vicinity || 'No address available', // Hospital address
//     //         availability: mockAvailability(), // Mock availability status
//     //         latitude: hospital.geometry.location.lat(), // Extract latitude
//     //         longitude: hospital.geometry.location.lng(), // Extract longitude
//     //       }))
//     //       console.log('Hospitals found:', hospitals.value) // Debug log
//     //     } else {
//     //       console.error('No hospitals found.')
//     //       showToast({
//     //         title: 'Error',
//     //         message: 'No hospitals found for your query. Try again.',
//     //         toastType: 'error',
//     //         duration: 3000,
//     //       })
//     //     }
//     //     loading.value = false
//     //   }
//     // )
//     service.textSearch(
//       { query: query.value, type: 'hospital' },
//       (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           hospitals.value = results.map((hospital) => ({
//             ...hospital,
//             name: hospital.name,
//             vicinity: hospital.vicinity || hospital.formatted_address,
//             availability: mockAvailability(),
//             pricing: mockPricing(),
//             specialities: mockSpecialities(),
//             latitude: hospital.geometry.location.lat(),
//             longitude: hospital.geometry.location.lng(),
//           }))
//           console.log(results, 'resultes here')
//         } else {
//           console.error(`Google Places textSearch error: ${status}`)
//           showToast({
//             title: 'Error',
//             message: `Search failed with status: ${status}`,
//             toastType: 'error',
//             duration: 3000,
//           })
//         }
//         loading.value = false
//       }
//     )

//   } catch (error) {
//     console.error('Error fetching hospitals:', error)
//     showToast({
//       title: 'Error',
//       message: 'An error occurred while fetching hospitals. Try again later.',
//       toastType: 'error',
//       duration: 3000,
//     })
//     loading.value = false
//   }
// }

const fetchHospitals = async () => {
  if (!query.value && !selectedLocation.value && !selectedBedAvailability.value && !selectedSpeciality.value && !selectedHospitalType.value) {
    showToast({
      title: 'Error',
      message: 'Please enter a location, hospital name, or select filters to search.',
      toastType: 'error',
      duration: 3000,
    })
    return
  }

  console.log('sdfhsdfshgjfdgjfdgfdkjsgfkjfdg:', selectedHospitalType.value)

  loading.value = true
  hospitals.value = []

  try {
    // Set query to selectedLocation if it exists
    if (selectedLocation.value) {
      query.value = selectedLocation.value
    }

    console.log('Searching for hospitals with query:', query.value)

    // Load Google Maps SDK
    const google = await $loadGoogleMaps()
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    )

    // Use PlacesService's textSearch
    service.textSearch(
      { query: query.value || '', type: 'hospital' },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Map and augment results
          let fetchedHospitals = results.map((hospital) => ({
            ...hospital,
            name: hospital.name,
            vicinity: hospital.vicinity || hospital.formatted_address,
            availability: mockAvailability(),
            pricing: mockPricing(),
            specialities: mockSpecialities(),
            hospitalType: mockHospitalType(),
            latitude: hospital.geometry.location.lat(),
            longitude: hospital.geometry.location.lng(),
          }))

          // Apply additional filters
          if (selectedBedAvailability.value) {
              fetchedHospitals = fetchedHospitals.filter(
                (hospital) =>
                  hospital.availability.toLowerCase() === selectedBedAvailability.value.toLowerCase()
              )
            }


          if (selectedSpeciality.value) {
            fetchedHospitals = fetchedHospitals.filter((hospital) =>
              hospital.specialities.includes(selectedSpeciality.value)
            )
          }

          if (selectedHospitalType.value) {
            console.log(selectedHospitalType.value, 'here ahgain')
            fetchedHospitals = fetchedHospitals.filter(
              (hospital) => hospital.hospitalType === selectedHospitalType.value
            )
          }

          hospitals.value = fetchedHospitals
          console.log('Filtered hospitals:', hospitals.value)
        } else {
          console.error(`Google Places textSearch error: ${status}`)
          showToast({
            title: 'Error',
            message: `Search failed with status: ${status}`,
            toastType: 'error',
            duration: 3000,
          })
        }
        loading.value = false
      }
    )
  } catch (error) {
    console.error('Error fetching hospitals:', error)
    showToast({
      title: 'Error',
      message: 'An error occurred while fetching hospitals. Try again later.',
      toastType: 'error',
      duration: 3000,
    })
    loading.value = false
  }
}


const hospitalName = ref('') // New state for hospital name

// const fetchHospitals = async () => {
//   loading.value = true
//   hospitals.value = []

//   try {
//     console.log('Fetching hospitals for location:', location.value)
//     console.log('Searching hospitals for name:', hospitalName.value)

//     // Load Google Maps SDK
//     const google = await $loadGoogleMaps()
//     const service = new google.maps.places.PlacesService(
//       document.createElement('div')
//     )

//     // Geocode location if location is specified
//     if (location.value) {
//       const geocoder = new google.maps.Geocoder()
//       geocoder.geocode({ address: location.value }, (results, status) => {
//         if (
//           status === google.maps.GeocoderStatus.OK &&
//           results[0].geometry.location
//         ) {
//           const locationLatLng = results[0].geometry.location

//           // Search for hospitals near the geocoded location
//           service.nearbySearch(
//             {
//               location: locationLatLng,
//               rankBy: google.maps.places.RankBy.DISTANCE,
//               type: 'hospital',
//             },
//             (results, status) => {
//               if (status === google.maps.PlacesServiceStatus.OK) {
//                 hospitals.value = filterHospitals(results)
//               } else {
//                 console.error('No hospitals found nearby.')
//               }
//               loading.value = false
//             }
//           )
//         } else {
//           console.error('Could not find location.')
//           loading.value = false
//         }
//       })
//     } else if (hospitalName.value) {
//       // If no location, search by name
//       service.textSearch(
//         { query: hospitalName.value, type: 'hospital' },
//         (results, status) => {
//           if (status === google.maps.PlacesServiceStatus.OK) {
//             hospitals.value = filterHospitals(results)
//           } else {
//             console.error('No hospitals found.')
//           }
//           loading.value = false
//         }
//       )
//     } else {
//       showToast({
//         title: 'Error',
//         message: 'Enter a location or hospital name to search.',
//         toastType: 'error',
//         duration: 3000,
//       })
//       loading.value = false
//     }
//   } catch (error) {
//     console.error('Error loading Google Maps:', error)
//     loading.value = false
//   }
// }

// Helper to filter hospitals based on name
const filterHospitals = (results) => {
  if (hospitalName.value) {
    return results.filter((hospital) =>
      hospital.name.toLowerCase().includes(hospitalName.value.toLowerCase())
    )
  }
  return results
}

// Handle filters applied event

// Handle modal close event
const closeFilterModal = () => {
  showFilterModal.value = false;
};

// watch(selectedHospitalType, (value) => {
//   fetchHospitals(null, null, { hospitalType: value.toLowerCase() })
// }, { immediate: true })


// watch(selectedSpeciality, (value) => {
//   fetchHospitals(null, null, { speciality: value.toLowerCase() })
// }, { immediate: true })

// watch(selectedLocation, (value) => {
//    query.value = value
//    fetchHospitals(null, null, { place: value.toLowerCase() })
// }, { immediate: true })

// watch(selectedBedAvailability, (value) => {
//   console.log(value, 'value')
//   fetchHospitals(null, null, { availability: value.toLowerCase() })
// }, { immediate: true });


// Fetch hospitals based on user’s current location on mount
onMounted(() => {
  forceLocationModal.value = true;
  loading.value = true
  getUserLocation()

  if (inputRef.value) {
    initializeAutocomplete();
  }
})

const handleEnter = () => {
  fetchHospitals()
}

const initializeAutocomplete = () => {
  const loader = new Loader({
    apiKey: 'AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg',
    version: 'weekly',
    libraries: ['places'],
  });

  loader.load().then(() => {
    const autocomplete = new google.maps.places.Autocomplete(inputRef.value!, {
      types: ['geocode'],
      componentRestrictions: { country: 'NG' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        userLocation.value.lat = place.geometry.location.lat()
        userLocation.value.lng = place.geometry.location.lng()
        query.value = place.formatted_address || place.name || ''
        fetchHospitals()
      }
    });
  });
};

</script>

<style scoped>
.hospital-card {
  min-width: 240px;
}

.hide-scrollbar {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
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
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
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
  width: 16rem;
  /* Fixed width for horizontal scrolling */
  min-width: 16rem;
  /* Ensures consistent width in the scroll container */
}

</style>