<template>
    <main>
      <div class="container mx-auto">
        <section class="p-3 lg:p-6 bg-[#FFF9F9CC] max-w-7xl mx-auto">

          <div class="flex items-center border-2 border-red-600 rounded-lg bg-white p-3 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.485 20.1536L13.223 13.8916C12.723 14.3176 12.148 14.6472 11.498 14.8806C10.848 15.1139 10.1947 15.2306 9.53798 15.2306C7.93665 15.2306 6.58132 14.6762 5.47198 13.5676C4.36265 12.4589 3.80798 11.1039 3.80798 9.50256C3.80798 7.90122 4.36198 6.54556 5.46998 5.43556C6.57798 4.32556 7.93265 3.76989 9.53398 3.76856C11.1353 3.76722 12.4913 4.32189 13.602 5.43256C14.7127 6.54322 15.268 7.89889 15.268 9.49956C15.268 10.1942 15.145 10.8666 14.899 11.5166C14.653 12.1666 14.3296 12.7226 13.929 13.1846L20.191 19.4456L19.485 20.1536ZM9.53898 14.2296C10.8656 14.2296 11.9857 13.7729 12.899 12.8596C13.8123 11.9462 14.269 10.8259 14.269 9.49856C14.269 8.17122 13.8123 7.05122 12.899 6.13856C11.9857 5.22589 10.8656 4.76922 9.53898 4.76856C8.21232 4.76789 7.09198 5.22456 6.17798 6.13856C5.26398 7.05256 4.80732 8.17256 4.80798 9.49856C4.80865 10.8246 5.26532 11.9446 6.17798 12.8586C7.09065 13.7726 8.21065 14.2292 9.53798 14.2286" fill="black" fill-opacity="0.8" />
            </svg>
            <input ref="inputRef" type="text" @keyup.enter="handleEnter" v-model="query" placeholder="Search by name or location..." class="flex-grow outline-none text-gray-500 py-5 bg-white" />
            <button @click="fetchHospitals" class="bg-black text-white rounded-lg p-2 ml-4 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button @click="showFilterModal = true" class="text-gray-500 ml-4">
              <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.9516 9.787H6.39369M6.39369 9.787C6.39369 10.3652 6.17789 10.9197 5.79544 11.3285C5.41299 11.7373 4.89427 11.967 4.3534 11.967C3.81253 11.967 3.29381 11.7373 2.91136 11.3285C2.5289 10.9197 2.31404 10.3652 2.31404 9.787M6.39369 9.787C6.39369 9.20883 6.17789 8.65434 5.79544 8.24551C5.41299 7.83668 4.89427 7.607 4.3534 7.607C3.81253 7.607 3.29381 7.83668 2.91136 8.24551C2.5289 8.65434 2.31404 9.20883 2.31404 9.787M2.31404 9.787H0.645142M17.9516 16.394H12.5744M12.5744 16.394C12.5744 16.9723 12.3591 17.5274 11.9765 17.9363C11.594 18.3453 11.0751 18.575 10.5341 18.575C9.99327 18.575 9.47455 18.3443 9.0921 17.9355C8.70965 17.5267 8.49479 16.9722 8.49479 16.394M12.5744 16.394C12.5744 15.8157 12.3591 15.2616 11.9765 14.8527C11.594 14.4437 11.0751 14.214 10.5341 14.214C9.99327 14.214 9.47455 14.4437 9.0921 14.8525C8.70965 15.2613 8.49479 15.8158 8.49479 16.394M8.49479 16.394H0.645142M17.9516 3.18H15.0469M15.0469 3.18C15.0469 3.46628 14.9932 3.74976 14.8907 4.01425C14.7883 4.27874 14.638 4.51906 14.4487 4.72149C14.2593 4.92392 14.0345 5.0845 13.7871 5.19406C13.5396 5.30361 13.2744 5.36 13.0066 5.36C12.4658 5.36 11.947 5.13032 11.5646 4.72149C11.1821 4.31266 10.9673 3.75817 10.9673 3.18M15.0469 3.18C15.0469 2.89372 14.9932 2.61024 14.8907 2.34575C14.7883 2.08126 14.638 1.84094 14.4487 1.63851C14.2593 1.43608 14.0345 1.2755 13.7871 1.16594C13.5396 1.05639 13.2744 1 13.0066 1C12.4658 1 11.947 1.22968 11.5646 1.63851C11.1821 2.04734 10.9673 2.60183 10.9673 3.18M10.9673 3.18H0.645142" stroke="black" stroke-opacity="0.8" stroke-miterlimit="10" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </section>
  

        <HospitalWebSocketManager 
          :hospitals="combinedHospitals" 
          :userLocation="userLocation"
          @hospital-updated="updateHospital" 
        />
  

        <div v-if="loading" class="text-center text-gray-600 py-10 max-w-xs mx-auto">
          <div class="spinner"></div>
          Hang tight! We're finding the closest facilities for you!
        </div>
  
        <!-- Empty state - no location -->
        <div v-else-if="!location && displayedHospitals.length === 0" class="text-center text-gray-600 border rounded border-gray-100 py-6">
          <div class="flex justify-center items-center flex-col gap-y-2">
            <img src="@/assets/icons/location-search.svg" class="h-20 w-20" alt="location search" />
            <p>Search for bed spaces closest to you</p>
          </div>
        </div>
  
        <!-- Empty state - no hospitals found -->
        <div v-else-if="location && displayedHospitals.length === 0" class="text-center text-gray-600">
          <div class="flex justify-center items-center flex-col gap-y-2">
            <img src="@/assets/icons/location-search.svg" class="h-20 w-20" alt="location search" />
            <p>Bed space not available</p>
          </div>
        </div>
  
        <!-- Hospital list -->
        <div v-else class="p-4">
          <p class="text-gray-600 mb-4">
            Results are automatically filtered based on your location
          </p>
  
          <div class="flex space-x-4 overflow-x-auto custom-scrollbar">
            <div v-for="hospital in displayedHospitals" :key="hospital.place_id || hospital._id" @click="selectHospital(hospital)" class="hospital-card relative w-64 p-4 m-2 space-y-3 border rounded-lg shadow cursor-pointer transition-transform transform hover:scale-105" :class="{
                'bg-green-100 border-green-400': hospital.availability === 'available',
                'bg-red-100 border-red-400': hospital.availability === 'unavailable',
                'bg-blue-100 border-blue-400': hospital.availability === 'busy',
              }">
              <!-- Code Red Tag -->
              <div v-if="hospital.isCodeRed" class="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-tl-lg">
                CODE RED
              </div>
              
              <!-- Availability Badge -->
              <div class="flex justify-end items-end">
                <span class="text-xs rounded-full" :class="{
                    'bg-green-500 text-white px-2 py-1 rounded': hospital.availability === 'available',
                    'bg-red-500 text-white px-2 py-1 rounded': hospital.availability === 'unavailable',
                    'bg-blue-500 text-white px-2 py-1 rounded': hospital.availability === 'busy',
                  }">
                  {{ hospital.availability || 'Unknown' }}
                </span>
              </div>
              
              <!-- Hospital Name -->
              <h3 class="text-base leading-snug font-bold" :class="{
                  'text-green-500': hospital.availability === 'available',
                  'text-red-500': hospital.availability === 'unavailable',
                  'text-blue-500': hospital.availability === 'busy',
                }">
                {{ hospital.hospitalName || hospital.name }}
              </h3>
              
              <!-- Address -->
              <p class="text-sm text-gray-600">
                {{ hospital.address || hospital.vicinity }}
              </p>
              
              <!-- Bed Availability Info -->
              <!-- <div v-if="hospital.totalBedCount" class="mt-2 text-sm">
                <div class="flex justify-between">
                  <span>Available Beds:</span>
                  <span class="font-bold" :class="{
                    'text-green-600': hospital.totalAvailableBeds > 0,
                    'text-red-600': hospital.totalAvailableBeds === 0
                  }">{{ hospital.totalAvailableBeds }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Total Beds:</span>
                  <span>{{ hospital.totalBedCount }}</span>
                </div>
              </div> -->
              

              <!-- <div v-if="hospital.emergencyServices" class="mt-2">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {{ hospital.emergencyServices }}
                </span>
              </div> -->
              
     
              <!-- <div v-if="hospital.availableSpecialties && hospital.availableSpecialties.length" class="mt-2 flex flex-wrap gap-1">
                <span v-for="(specialty, idx) in hospital.availableSpecialties.slice(0, 2)" :key="idx" class="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                  {{ specialty }}
                </span>
                <span v-if="hospital.availableSpecialties.length > 2" class="text-xs text-gray-500">
                  +{{ hospital.availableSpecialties.length - 2 }} more
                </span>
              </div> -->
              
    
              <!-- <div v-if="hospital.emergencyContactNumber" class="mt-2 text-sm text-gray-700">
                <span class="font-medium">Emergency:</span> {{ hospital.emergencyContactNumber }}
              </div> -->
              

              <!-- <div v-if="hospital.lastUpdated" class="mt-2 text-xs text-gray-500">
                Last updated: {{ formatTimestamp(hospital.lastUpdated) }}
              </div> -->
            </div>
          </div>
        </div>
  
        <!-- View all link -->
        <NuxtLink v-if="displayedHospitals.length" to="/view-all" class="mt-4 pl-6 text-red-600">
          View all results
        </NuxtLink>
  
        <!-- Filter modal -->
        <FilterModal v-if="showFilterModal" @filters-applied="applyFilters" @close="showFilterModal = false" />
  
        <!-- Map modal -->
        <div v-if="showMap" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div class="relative bg-white w-full max-w-lg h-3/4 m-3 rounded-lg shadow-lg overflow-hidden">
            <button @click="showMap = false" class="absolute z-50 top-4 right-4 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <MapViews :hospital="selectedHospital" :userLocation="userLocation" />
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script lang="ts" setup>
  import { Loader } from "@googlemaps/js-api-loader";
  import { useFetchNearbyHospitals } from "@/composables/modules/hospitals/useFetchNearbyHospitals";
  import { useFetchHospitals } from "@/composables/modules/hospitals/useFetchHospitals";
  import { useCustomToast } from "@/composables/core/useCustomToast";
  import { ref, onMounted, computed, watch } from "vue";
  import { useRouter } from "vue-router";
  import { useNuxtApp } from "#app";
  
  const { showToast } = useCustomToast();
  const router = useRouter();
  
  // Constants
  const MAX_DISTANCE = 10; // Maximum distance in kilometers
  
  // API Hospitals
  const { fetchNearbyHospitals, nearbyHospitals, loading: fetchingNearbyHospitals } = useFetchNearbyHospitals();
  const { hospitals: hospitalsList, loading: fetchingHospitals } = useFetchHospitals();
  
  // State variables
  const location = ref("");
  const hospitals = ref([]);
  const apiHospitals = ref([]);
  const loading = ref(false);
  const viewAll = ref(false);
  const showFilterModal = ref(false);
  const showMap = ref(false);
  const selectedHospital = ref(null);
  const userLocation = ref({ lat: null, lng: null });
  const query = ref("") as any; // Single query for name or location
  const inputRef = ref<HTMLInputElement | null>(null);
  
  const { $loadGoogleMaps } = useNuxtApp();
  const forceLocationModal = ref(false);
  
  // Example user-selected filters
  const selectedHospitalType = ref("") as Record<string, any>;
  const selectedSpeciality = ref("") as Record<string, any>;
  const selectedBedAvailability = ref("") as Record<string, any>;
  const selectedLocation = ref("") as Record<string, any>;
  
  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Mock functions (unchanged)
  const mockAvailability = () => {
    const statuses = ["available", "unavailable", "busy"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  
  const mockPricing = () => {
    const priceStatus = ["high", "affordable", "average"];
    return priceStatus[Math.floor(Math.random() * priceStatus.length)];
  };
  
  const mockHospitalType = () => {
    const hospitalTypes = [
      "Teaching Hospital",
      "General",
      "Private",
      "FMC",
      "Specialist Hospital",
      "Primary Healthcare Center",
    ];
    return hospitalTypes[Math.floor(Math.random() * hospitalTypes.length)];
  };
  
  const specialities = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Emergency Medicine",
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
    const numberOfSpecialities = Math.floor(Math.random() * 3) + 1;
    const shuffledSpecialities = [...specialities].sort(() => 0.5 - Math.random());
    return shuffledSpecialities.slice(0, numberOfSpecialities);
  };
  
  // Watch for changes in nearbyHospitals and update apiHospitals
  watch(nearbyHospitals, (newHospitals) => {
    if (newHospitals && newHospitals.length > 0) {
      console.log("Nearby hospitals updated:", newHospitals);
      apiHospitals.value = newHospitals;
    }
  }, { immediate: true, deep: true });
  
  // Combine API hospitals with Google hospitals
  const combinedHospitals = computed(() => {
    // If we have API hospitals, use them first
    if (apiHospitals.value && apiHospitals.value.length > 0) {
      // Create a map of hospital names from API for quick lookup
      const apiHospitalNames = new Map(
        apiHospitals.value.map(h => [h.hospitalName.toLowerCase(), h])
      );
      
      // Mark Google hospitals that match API hospitals as "Code Red"
      const googleHospitalsWithCodeRed = hospitals.value.map(h => {
        const name = (h.name || '').toLowerCase();
        const isCodeRed = apiHospitalNames.has(name);
        return {
          ...h,
          isCodeRed
        };
      });
      
      // Combine both sets, with API hospitals first
      return [
        ...apiHospitals.value.map(h => ({
          ...h,
          isCodeRed: true,
          availability: h.overallBedStatus?.toLowerCase() === 'available' 
            ? 'available' 
            : h.overallBedStatus?.toLowerCase() === 'limited' 
              ? 'busy' 
              : 'unavailable',
          place_id: h._id, // Use _id as place_id for API hospitals
          lastUpdated: new Date().toISOString()
        })),
        ...googleHospitalsWithCodeRed.filter(h => !apiHospitalNames.has((h.name || '').toLowerCase()))
      ];
    }
    
    // If no API hospitals, just return Google hospitals
    return hospitals.value;
  });
  
  const displayedHospitals = computed(() => {
    let filteredHospitals = combinedHospitals.value;
    
    if (selectedBedAvailability.value) {
      filteredHospitals = filteredHospitals.filter((hospital) => {
        return (
          hospital.availability === selectedBedAvailability.value?.toLowerCase()
        );
      });
    }
  
    return viewAll.value ? filteredHospitals : filteredHospitals.slice(0, 6);
  });
  
  // Function to update a hospital when we receive a WebSocket update
  const updateHospital = (updatedHospital) => {
    // Find the hospital in our list
    const index = apiHospitals.value.findIndex(h => 
      h._id === updatedHospital._id || h.id === updatedHospital.id
    );
    
    if (index !== -1) {
      // Update the hospital with new data
      apiHospitals.value[index] = {
        ...apiHospitals.value[index],
        ...updatedHospital,
        lastUpdated: new Date().toISOString()
      };
    } else {
      // If it's not in our API hospitals list, check the Google hospitals
      const googleIndex = hospitals.value.findIndex(h => 
        h.place_id === updatedHospital.place_id || 
        (h.name && updatedHospital.name && h.name.toLowerCase() === updatedHospital.name.toLowerCase())
      );
      
      if (googleIndex !== -1) {
        hospitals.value[googleIndex] = {
          ...hospitals.value[googleIndex],
          ...updatedHospital,
          lastUpdated: new Date().toISOString()
        };
      }
    }
  };
  
  // Function to apply filters from user input
  const applyFilters = (filters) => {
    console.log(filters, "filters here");
    selectedLocation.value = filters?.location || "";
    selectedBedAvailability.value = filters.status || "";
    selectedSpeciality.value = filters.speciality || "";
    selectedHospitalType.value = filters.hospitalType || "";
    showFilterModal.value = false;
  };
  
  // Watchers for each filter
  watch(
    [
      selectedLocation,
      selectedBedAvailability,
      selectedSpeciality,
      selectedHospitalType,
    ],
    ([newLocation, newAvailability, newSpecialities, newType]) => {
      fetchHospitals();
    },
    { immediate: false, deep: false }
  );
  
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          userLocation.value = { lat, lng };
          console.log("User coordinates:", userLocation.value);
  
          localStorage.setItem(
            "userLocation",
            JSON.stringify(userLocation.value)
          );
  
          try {
            const { $loadGoogleMaps } = useNuxtApp();
            const google = await $loadGoogleMaps();
            if (!google) {
              console.error("Google Maps API failed to load.");
              showToast({
                title: "Error",
                message: "Google Maps API not loaded. Try again later.",
                toastType: "error",
                duration: 3000,
              });
              return;
            }
  
            const geocoder = new google.maps.Geocoder();
  
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
              if (status === "OK" && results[0]?.formatted_address) {
                query.value = results[0].formatted_address;
                console.log("User location (address):", query.value);
  
                // Fetch nearby hospitals from API
                fetchNearbyHospitalsFromAPI(lat, lng);
                
                // Also fetch from Google Maps as a backup
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
            showToast({
              title: "Error",
              message: "An unexpected error occurred while determining your location.",
              toastType: "error",
              duration: 3000,
            });
          }
  
          forceLocationModal.value = false;
        },
        (error) => {
          console.error("Error retrieving geolocation:", error);
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
  
      forceLocationModal.value = true;
      loading.value = false;
    }
  };
  
  // Fetch nearby hospitals from our API
  const fetchNearbyHospitalsFromAPI = async (lat: number, lng: number) => {
    loading.value = true;
    try {
      console.log(`Fetching nearby hospitals from API with coordinates: lat=${lat}, lng=${lng}, maxDistance=${MAX_DISTANCE}`);
      
      // Call the composable function with the required parameters
      const HARD_CODED_LAT = 6.5568768;
      const HARD_CODED_LNG = 3.325952;
      await fetchNearbyHospitals(HARD_CODED_LAT, HARD_CODED_LNG, MAX_DISTANCE);
      
      // The nearbyHospitals ref will be updated by the composable
      // We're watching it above to update apiHospitals
      console.log("Nearby hospitals after fetch:", nearbyHospitals.value);
      
    } catch (error) {
      console.error("Error fetching nearby hospitals from API:", error);
      showToast({
        title: "Error",
        message: "Failed to fetch nearby hospitals from our database.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };
  
  // Rest of the functions remain unchanged
  const fetchHospitalsByLocation = async (lat, lng) => {
    loading.value = true;
    hospitals.value = [];
  
    try {
      console.log("Fetching hospitals near coordinates:", { lat, lng });
  
      // Load Google Maps SDK
      const google = await $loadGoogleMaps();
      if (!google) {
        console.error("Google Maps API failed to load.");
        showToast({
          title: "Error",
          message: "Google Maps API not loaded. Try again later.",
          toastType: "error",
          duration: 3000,
        });
        return;
      }
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
  
      // Use PlacesService for Nearby Search
      service.nearbySearch(
        {
          location: new google.maps.LatLng(lat, lng),
          rankBy: google.maps.places.RankBy.DISTANCE,
          type: "hospital",
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
            }));
            console.log("Hospitals found near location:", hospitals.value);
          } else {
            console.error("No hospitals found nearby. Status:", status);
            showToast({
              title: "Error",
              message: "No hospitals found near your location.",
              toastType: "error",
              duration: 3000,
            });
          }
          loading.value = false;
        }
      );
    } catch (error) {
      console.error("Error fetching hospitals near location:", error);
      showToast({
        title: "Error",
        message: "An error occurred while fetching hospitals.",
        toastType: "error",
        duration: 3000,
      });
      loading.value = false;
    }
  };
  
  // Function to open map view
  const selectHospital = (hospital) => {
    console.log(hospital, "here");
    localStorage.setItem("selectedHospital", JSON.stringify(hospital));
    selectedHospital.value = hospital;
    showMap.value = true;
    
    // Determine which ID to use (place_id for Google, _id for API)
    const id = hospital.place_id || hospital._id;
    
    router.push({
      path: "/hospital/details",
      query: {
        id: id,
        name: hospital.hospitalName || hospital.name,
        location: hospital.address || hospital.vicinity,
        status: hospital.availability,
        lat: hospital.latitude,
        lon: hospital.longitude,
        isCodeRed: hospital.isCodeRed ? 'true' : 'false'
      },
    });
  };
  
  // Selected filters
  const selectedFilters = ref({
    location: [] as string[],
    bedAvailability: [] as string[],
    hospitalType: [] as string[],
  });
  
  // Close modal
  const closeModal = () => {
    showFilterModal.value = false;
  };
  
  // Reset filters
  const resetFilters = () => {
    selectedFilters.value = {
      location: [],
      bedAvailability: [],
      hospitalType: [],
    };
  };
  
  const cache = ref<{ query: string; hospitals: any[]; timestamp: number } | null>(
    null
  );
  const CACHE_EXPIRY_TIME = 10 * 60 * 1000; // Cache expiry time (10 minutes)
  
  const fetchHospitals = async () => {
    if (
      !query.value &&
      !selectedLocation.value &&
      !selectedBedAvailability.value &&
      !selectedSpeciality.value &&
      !selectedHospitalType.value
    ) {
      showToast({
        title: "Error",
        message:
          "Please enter a location, hospital name, or select filters to search.",
        toastType: "error",
        duration: 3000,
      });
      return;
    }
  
    // Check if query exists in cache and is still valid
    if (
      cache.value &&
      cache.value.query === query.value &&
      Date.now() - cache.value.timestamp < CACHE_EXPIRY_TIME
    ) {
      console.log("Serving hospitals from cache:", cache.value.hospitals);
      hospitals.value = cache.value.hospitals; // Serve data from cache
      return;
    }
  
    loading.value = true;
    hospitals.value = [];
  
    try {
      // Set query to selectedLocation if it exists
      if (selectedLocation.value) {
        query.value = selectedLocation.value;
      }
  
      console.log("Searching for hospitals with query:", query.value);
  
      // Load Google Maps SDK
      const google = await $loadGoogleMaps();
      if (!google) {
        console.error("Google Maps API failed to load.");
        showToast({
          title: "Error",
          message: "Google Maps API not loaded. Try again later.",
          toastType: "error",
          duration: 3000,
        });
        return;
      }
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
  
      // Use PlacesService's textSearch
      service.textSearch(
        { query: query.value || "", type: "hospital" },
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
            }));
  
            // Apply additional filters
            if (selectedBedAvailability.value) {
              fetchedHospitals = fetchedHospitals.filter(
                (hospital) =>
                  hospital.availability.toLowerCase() ===
                  selectedBedAvailability.value.toLowerCase()
              );
            }
  
            if (selectedSpeciality.value) {
              fetchedHospitals = fetchedHospitals.filter((hospital) =>
                hospital.specialities.includes(selectedSpeciality.value)
              );
            }
  
            if (selectedHospitalType.value) {
              console.log(selectedHospitalType.value, "here ahgain");
              fetchedHospitals = fetchedHospitals.filter(
                (hospital) => hospital.hospitalType === selectedHospitalType.value
              );
            }
  
            // Cache the results
            cache.value = {
              query: query.value || "",
              hospitals: fetchedHospitals,
              timestamp: Date.now(),
            };
  
            hospitals.value = fetchedHospitals; // Update hospitals with the fetched data
            console.log("Filtered hospitals:", hospitals.value);
          } else {
            console.error(`Google Places textSearch error: ${status}`);
            showToast({
              title: "Error",
              message: `Search failed with status: ${status}`,
              toastType: "error",
              duration: 3000,
            });
          }
          loading.value = false;
        }
      );
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      showToast({
        title: "Error",
        message: "An error occurred while fetching hospitals. Try again later.",
        toastType: "error",
        duration: 3000,
      });
      loading.value = false;
    }
  };
  
  // Handle Enter key press in search input
  const handleEnter = () => {
    fetchHospitals();
  };
  
  // Initialize Google Places Autocomplete
  const initializeAutocomplete = () => {
    const loader = new Loader({
      apiKey: "AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg",
      version: "weekly",
      libraries: ["places"],
    });
  
    loader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.value!, {
        types: ["geocode"],
        componentRestrictions: { country: "NG" },
      });
  
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          userLocation.value.lat = place.geometry.location.lat();
          userLocation.value.lng = place.geometry.location.lng();
          query.value = place.formatted_address || place.name || "";
          fetchHospitals();
        }
      });
    });
  };
  
  // Fetch hospitals based on user's current location on mount
  onMounted(() => {
    forceLocationModal.value = true;
    loading.value = true;
    
    // Get user location
    getUserLocation();
    
    // Also fetch with hardcoded coordinates to ensure we have data
    const HARD_CODED_LAT = 6.5568768;
    const HARD_CODED_LNG = 3.325952;
    
    // Directly fetch nearby hospitals on mount to ensure we have data
    fetchNearbyHospitals(HARD_CODED_LAT, HARD_CODED_LNG, MAX_DISTANCE)
      .then(response => {
        console.log("Initial nearby hospitals fetch complete:", response);
        // If we have data from the API, use it
        if (nearbyHospitals.value && nearbyHospitals.value.length > 0) {
          apiHospitals.value = nearbyHospitals.value;
        }
      })
      .catch(error => {
        console.error("Error in initial nearby hospitals fetch:", error);
      });
  
    if (inputRef.value) {
      initializeAutocomplete();
    }
  });
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