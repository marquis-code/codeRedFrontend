<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg z-50 max-w-lg w-full">
      <h2 class="text-lg font-bold mb-4">Filter by</h2>

      <!-- Location Filter -->
      <h3 class="text-xs font-semibold mb-2">Location</h3>
      <div class="flex flex-wrap gap-2 mb-4">
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
            :class="selectedLocation === location ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-3 py-1 rounded-full text-sm"
          >
            {{ location }}
          </span>
        </label>
      </div>

      <!-- Availability Filter -->
      <h3 class="text-xs font-semibold mb-2">Bed Availability</h3>
      <div class="flex flex-wrap gap-2 mb-4">
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
            :class="selectedStatus === status ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-3 py-1 rounded-full text-sm"
          >
            {{ status }}
          </span>
        </label>
      </div>

      <!-- Hospital Type Filter -->
      <h3 class="text-xs font-semibold mb-2">Hospital Type</h3>
      <div class="flex flex-wrap gap-2 mb-4">
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
            :class="selectedType === type ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-3 py-1 rounded-full text-sm"
          >
            {{ type }}
          </span>
        </label>
      </div>

      <!-- Specialities Filter -->
      <h3 class="text-xs font-semibold mb-2">Specialities</h3>
      <div class="flex flex-wrap gap-2">
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
            :class="selectedSpeciality === speciality ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-3 py-1 rounded-full text-sm"
          >
            {{ speciality }}
          </span>
        </label>
      </div>

      <div class="mt-6">
        <button @click="applyFilters" class="mt-6 w-full bg-red-500 text-white py-2 rounded-md">Apply Filter to Search</button>
        <button @click="$emit('close')" class="mt-4 w-full text-center text-gray-500">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Realistic data for Nigeria
const locations = [
  'Nearest to you',
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