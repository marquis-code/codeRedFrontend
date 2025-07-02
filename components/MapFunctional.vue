<template>
  <main>
    <!-- {{nearbyHospitals}} -->
    <div class="container mx-auto">
  

      <div
        v-if="loading"
        class="text-center text-gray-600 py-10 max-w-xs mx-auto"
      >
        <div class="spinner"></div>
        Hang tight! We're finding the closest facilities for you!
      </div>

      <div
        v-else-if="!location && hospitals?.length === 0"
        class="text-center text-gray-600 border rounded border-gray-100 py-6"
      >
        <div class="flex justify-center items-center flex-col gap-y-2">
          <img
            src="@/assets/icons/location-search.svg"
            class="h-20 w-20"
            alt="location search"
          />
          <p>Search for bed spaces closest to you search</p>
        </div>
      </div>

      <div
        v-else-if="location && hospitals?.length === 0"
        class="text-center text-gray-600"
      >
        <!-- Bed space not available -->
        <div class="flex justify-center items-center flex-col gap-y-2">
          <img
            src="@/assets/icons/location-search.svg"
            class="h-20 w-20"
            alt="location search"
          />
          <p>Bed space not available</p>
        </div>
      </div>

      <BedspaceAvailability />

      <FilterModal
        v-if="showFilterModal"
        @filters-applied="applyFilters"
        @close="showFilterModal = false"
      />

      <div
        v-if="showMap"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="relative bg-white w-full max-w-lg h-3/4 m-3 rounded-lg shadow-lg overflow-hidden"
        >
          <button
            @click="showMap = false"
            class="absolute z-50 top-4 right-4 bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4a4a4a"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
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
const { showToast } = useCustomToast();
import { ref, onMounted, computed, watch } from "vue";
const router = useRouter();
import { useNuxtApp } from "#app";

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

// Mock function to assign random availability status
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

  // Shuffle the array and pick the first `numberOfSpecialities` items
  const shuffledSpecialities = [...specialities].sort(
    () => 0.5 - Math.random()
  );
  return shuffledSpecialities.slice(0, numberOfSpecialities);
};

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
        availability: 'available', // Default availability for API hospitals
        place_id: h._id // Use _id as place_id for API hospitals
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
    const HARD_CODED_LAT = 6.5568768
    const HARD_CODED_LNG = 3.325952
    const response = await fetchNearbyHospitals(HARD_CODED_LAT, HARD_CODED_LNG, MAX_DISTANCE);
    
    if (response && response.length > 0) {
      console.log("API Hospitals found:", response);
      apiHospitals.value = response;
    } else {
      console.log("No hospitals found from API, will use Google results only");
      apiHospitals.value = [];
    }
  } catch (error) {
    console.error("Error fetching nearby hospitals from API:", error);
    showToast({
      title: "Error",
      message: "Failed to fetch nearby hospitals from our database.",
      toastType: "error",
      duration: 3000,
    });
    apiHospitals.value = [];
  } finally {
    loading.value = false;
  }
};

const fetchHospitalsByLocation = async (lat, lng) => {
  loading.value = true;
  hospitals.value = [];

  try {
    console.log("Fetching hospitals near coordinates:", { lat, lng });

    // Load Google Maps SDK
    const google = await $loadGoogleMaps();
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    // Use PlacesService for Nearby Search
    service.nearbySearch(
      {
        location: new google.maps.LatLng(lat, lng),
        rankBy: google.maps.places.RankBy.DISTANCE,
        // radius: 5000, // Search within 5km radius
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

const hospitalName = ref(""); // New state for hospital name

// Helper to filter hospitals based on name
const filterHospitals = (results) => {
  if (hospitalName.value) {
    return results.filter((hospital) =>
      hospital.name.toLowerCase().includes(hospitalName.value.toLowerCase())
    );
  }
  return results;
};

// Handle modal close event
const closeFilterModal = () => {
  showFilterModal.value = false;
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
  getUserLocation();
  const HARD_CODED_LAT = 6.5568768
  const HARD_CODED_LNG = 3.325952
  fetchNearbyHospitalsFromAPI(HARD_CODED_LAT, HARD_CODED_LNG)

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