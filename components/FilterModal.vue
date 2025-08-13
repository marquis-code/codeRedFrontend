<!-- <template>
  <div class="fixed inset-0 z-[9999999] bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white z-[9999999] rounded-lg shadow-lg z-50 m-4 max-w-lg w-full max-h-[90vh] overflow-hidden">
      <div class="overflow-y-auto custom-scrollbar">
        <h2 class="text-lg font-bold mb-4 px-6 pt-6">Filter by</h2>

        <h3 class="text-sm text-[#CC1100] border-b font-semibold mb-2 px-6 pb-2">Location</h3>
        <div class="flex flex-wrap gap-3 my-4 px-6 pb-4">
          <label
            v-for="location in locations"
            :key="location"
            class="cursor-pointer"
          >
            <input
              type="radio"
              :value="location"
              v-model="selectedLocation"
              class="hidden"
            />
            <span
              :class="selectedLocation === location ? 'bg-[#CC1100] text-white' : 'bg-gray-200 text-gray-700'"
              class="px-3 py-1.5 rounded-full mb-3 text-sm"
            >
              {{ location }}
            </span>
          </label>
        </div>

        <h3 class="text-sm text-[#CC1100] border-b font-semibold mb-2 px-6 pb-2">Bed Availability</h3>
        <div class="flex flex-wrap gap-3 mb-4 px-6 pb-4">
          <label
            v-for="status in statuses"
            :key="status"
            class="cursor-pointer"
          >
            <input
              type="radio"
              :value="status"
              v-model="selectedStatus"
              class="hidden"
            />
            <span
              :class="selectedStatus === status ? 'bg-[#CC1100] text-white' : 'bg-gray-200 text-gray-700'"
              class="px-3 py-1.5 rounded-full mb-3 text-sm"
            >
              {{ status }}
            </span>
          </label>
        </div>

        <h3 class="text-sm text-[#CC1100] border-b font-semibold mb-2 px-6 pb-2">Hospital Type</h3>
        <div class="flex flex-wrap gap-3 mb-4 px-6 pb-4">
          <label
            v-for="type in hospitalTypes"
            :key="type"
            class="cursor-pointer"
          >
            <input
              type="radio"
              :value="type"
              v-model="selectedType"
              class="hidden"
            />
            <span
              :class="selectedType === type ? 'bg-[#CC1100] text-white' : 'bg-gray-200 text-gray-700'"
              class="px-3 py-1.5 rounded-full mb-3 text-sm"
            >
              {{ type }}
            </span>
          </label>
        </div>

        <h3 class="text-sm font-semibold border-b text-[#CC1100] mb-2 px-6 pb-2">Specialities</h3>
        <div class="flex flex-wrap gap-3 px-6 pb-4">
          <label
            v-for="speciality in specialities"
            :key="speciality"
            class="cursor-pointer"
          >
            <input
              type="radio"
              :value="speciality"
              v-model="selectedSpeciality"
              class="hidden"
            />
            <span
              :class="selectedSpeciality === speciality ? 'bg-[#CC1100] text-white' : 'bg-gray-200 text-gray-700'"
              class="px-3 py-1.5 rounded-full mb-3 text-xs"
            >
              {{ speciality }}
            </span>
          </label>
        </div>
      </div>

      <div class="mt-6 px-6 pb-6">
        <button @click="applyFilters" class="mt-6 w-full bg-[#CC1100] text-white py-2 rounded-md">Apply Filter to Search</button>
        <button @click="$emit('close')" class="mt-4 w-full text-center text-gray-500">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Realistic data for Nigeria
const locations = [
  // 'Nearest to you',
  'Surulere',
  'Oshodi',
  'Ikeja',
  'Isolo',
  'Mushin',
  'Yaba',
  'Idi-Araba',
  'Lekki',
  'Victoria Island',
  'Ajah',
  'Ikorodu',
  'Badagry',
  'Iyana Ipaja',
  'Ojota'
];
const statuses = ['Available', 'Unavailable', 'Busy'];
const hospitalTypes = ['Teaching Hospital', 'General', 'Private', 'FMC', 'Specialist Hospital', 'Primary Healthcare Center'];
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
  "Swelling"
];

const emit = defineEmits(['filters-applied', 'close']);

// Selected filters
const selectedLocation = ref<string | null>(null);
const selectedStatus = ref<string | null>(null);
const selectedType = ref<string | null>(null);
const selectedSpeciality = ref<string | null>(null);

const applyFilters = () => {
  // Emit the selected filters to the parent component
  const filters = {
    location: selectedLocation.value,
    status: selectedStatus.value,
    hospitalType: selectedType.value,
    speciality: selectedSpeciality.value,
  };
  console.log('Filters applied:', filters); // For debugging
  emit('filters-applied', filters);
};
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar {
  max-height: 60vh; /* Adjust height for internal scrolling */
  overflow-y: auto;
  scrollbar-width: none; /* Hide scrollbar in Firefox */
}

/* Hide scrollbar for Webkit browsers */
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}
</style> -->


<template>
  <div class="fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-50" @click.self="$emit('close')">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Filter Hospitals</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bed Availability</label>
            <select v-model="localFilters.bedAvailability" class="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="busy">Limited</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hospital Type</label>
            <select v-model="localFilters.hospitalType" class="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="">All Types</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
              <option value="specialty">Specialty</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
            <select v-model="localFilters.speciality" class="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="">All Specialities</option>
              <option value="emergency">Emergency</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="pediatrics">Pediatrics</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button 
            @click="resetFilters"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button 
            @click="applyFilters"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  filters: any
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'apply'])

// All reactive state at top level
const localFilters = ref({ ...props.filters })

const resetFilters = () => {
  localFilters.value = {
    hospitalType: '',
    speciality: '',
    bedAvailability: '',
    location: ''
  }
}

const applyFilters = () => {
  emit('apply', localFilters.value)
  emit('close')
}
</script>
