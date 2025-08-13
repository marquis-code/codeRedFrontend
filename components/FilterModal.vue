<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black bg-opacity-50">
    <div class="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-4">
        <button @click="$emit('close')" class="text-gray-600 hover:text-gray-800">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2 class="text-lg font-medium text-red-600">Filter by</h2>
        <button @click="resetFilters" class="text-gray-400 hover:text-gray-600 text-sm">
          Reset
        </button>
      </div>

      <div class="p-4 space-y-6">
        <!-- Location Section -->
        <div>
          <h3 class="text-red-600 font-medium mb-3 pb-2 border-b text-sm border-gray-100">LOCATION</h3>
          <div class="space-y-2 grid grid-cols-3 gap-2">
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.location" 
                value="nearest"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Nearest to you</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointe border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.location" 
                value="Surulere"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Surulere</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.location" 
                value="Oshodi"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Oshodi</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.location" 
                value="Ikeja"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Ikeja</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.location" 
                value="Isolo"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Isolo</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.location" 
                value="Mushin"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Mushin</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.location" 
                value="Yaba"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Yaba</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.location" 
                value="Idi-Araba"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Idi-Araba</span>
            </label>
          </div>
        </div>

        <!-- Bed Availability Section -->
        <div>
          <h3 class="text-red-600 font-medium mb-3 pb-2 border-b text-sm border-gray-100">BED AVAILABILITY</h3>
          <div class="space-y-2 grid grid-cols-3 gap-2">
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.bedAvailability" 
                value="available"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Available</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.bedAvailability" 
                value="unavailable"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Unavailable</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.bedAvailability" 
                value="busy"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Busy</span>
            </label>
          </div>
        </div>

        <!-- Hospital Type Section -->
        <div>
          <h3 class="text-red-600 font-medium mb-3 pb-2 border-b text-sm border-gray-100">HOSPITAL TYPE</h3>
          <div class="space-y-2 grid grid-cols-3 gap-2">
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.hospitalType" 
                value="Teaching Hospital"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Teaching Hospital</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.hospitalType" 
                value="General"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">General</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.hospitalType" 
                value="Private"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">Private</span>
            </label>
            <label class="flex items-center space-x-3 cursor-pointer border-[0.5px] text-xs py-1.5 px-1 rounded-full">
              <input 
                type="radio" 
                v-model="localFilters.hospitalType" 
                value="FMC"
                class="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span class="text-[#979797] font-[400]">FMC</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Apply Button -->
      <div class="p-4 border-t">
        <button 
          @click="applyFilters"
          class="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          APPLY FILTER TO SEARCH
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Props
const props = defineProps<{
  filters: {
    location: string
    bedAvailability: string
    hospitalType: string
    speciality: string
  }
}>()

// Emits
const emit = defineEmits<{
  close: []
  'filters-applied': [filters: any]
  apply: [filters: any]
}>()

// Local reactive state for filters
const localFilters = ref({
  location: props.filters.location || '',
  bedAvailability: props.filters.bedAvailability || '',
  hospitalType: props.filters.hospitalType || '',
  speciality: props.filters.speciality || ''
})

// Watch for prop changes and update local filters
watch(() => props.filters, (newFilters) => {
  localFilters.value = {
    location: newFilters.location || '',
    bedAvailability: newFilters.bedAvailability || '',
    hospitalType: newFilters.hospitalType || '',
    speciality: newFilters.speciality || ''
  }
}, { deep: true, immediate: true })

// Methods
const applyFilters = () => {
  const filtersToApply = {
    location: localFilters.value.location,
    status: localFilters.value.bedAvailability, // Map to 'status' to match existing code
    hospitalType: localFilters.value.hospitalType,
    speciality: localFilters.value.speciality
  }
  
  emit('filters-applied', filtersToApply)
  emit('apply', filtersToApply)
  emit('close')
}

const resetFilters = () => {
  localFilters.value = {
    location: '',
    bedAvailability: '',
    hospitalType: '',
    speciality: ''
  }
}
</script>

<style scoped>
/* Custom radio button styling */
input[type="radio"] {
  appearance: none;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
  cursor: pointer;
}

input[type="radio"]:checked {
  border-color: #dc2626;
  background-color: #dc2626;
}

input[type="radio"]:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: white;
}

input[type="radio"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}
</style>
