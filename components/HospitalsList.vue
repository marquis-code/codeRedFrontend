<template>
    <div class="overflow-x-auto py-4 max-w-7xl mx-auto hide-scrollbar px-3 lg:px-0">
      <div v-if="loading" class="text-center text-gray-600">
        <div class="spinner"></div>
        Searching...
      </div>
      <div v-else-if="!searched && hospitals?.length === 0" class="text-center text-gray-600 border rounded border-gray-100 py-6">
        <div class="flex justify-center items-center flex-col gap-y-2">
          <img src="@/assets/icons/location-search.svg" class="h-20 w-20" alt="location search" />
          <p> Search for bed spaces closest to you</p>
        </div>
      </div>
      <div v-else-if="searched && hospitals?.length === 0" class="text-center text-gray-600">
        <!-- Bed space not available -->
        <div class="flex justify-center items-center flex-col gap-y-2">
          <img src="@/assets/icons/location-search.svg" class="h-20 w-20" alt="location search" />
          <p> Bed space not available</p>
        </div>
      </div>
      <div v-else class="inline-flex space-x-4">
        <HospitalCard
          v-for="hospital in hospitals"
          :key="hospital.id"
          :hospital="hospital"
          class="hospital-card"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import HospitalCard from '@/components/HospitalCard.vue';
  
  export default defineComponent({
    name: 'HospitalsList',
    components: {
      HospitalCard
    },
    props: {
      hospitals: {
        type: Array,
        required: true
      },
      searched: {
        type: Boolean,
        required: true
      },
      loading: {
        type: Boolean,
        required: true
      }
    }
  });
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
  </style>
  