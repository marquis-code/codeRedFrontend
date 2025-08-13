<template>
    <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div class="relative bg-white w-full h-full m-0 overflow-hidden flex flex-col">
        <!-- Modal Header -->
      <section class="px-4 py-5">
        <div class="flex items-center justify-between py-2  bg-white">
                <div class="flex items-center gap-3">
                  <h2 class="text-lg font-medium text-gray-900">All Medical Facilities</h2>
                  <span class="text-sm text-gray-500">({{ hospitals.length }} results)</span>
                </div>
                <button 
                  @click="$emit('close')" 
                  class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <p class="text-sm font-[400]">Results are automatically filtered based on your location</p>
      </section>
  
        <!-- Search Bar -->
        <div class="p-4 bg-gray-50 border-b border-gray-200">
          <div class="flex items-center border-2 border-red-600 rounded-lg bg-white p-3 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="black" stroke-width="2" fill="none"/>
              <path d="m21 21-4.35-4.35" stroke="black" stroke-width="2"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search by name or location..." 
              class="flex-grow pl-3 outline-none text-gray-500 py-3 bg-white" 
            />
          </div>
        </div>
  
        <!-- Hospital List -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="filteredHospitals.length === 0" class="text-center text-gray-500 py-8">
            <p>No hospitals found matching your search.</p>
          </div>
          
          <div v-else class="space-y-3">
            <div 
              v-for="hospital in filteredHospitals" 
              :key="hospital.place_id || hospital._id"
              @click="handleHospitalClick(hospital)"
              class="hospital-card cursor-pointer transition-all duration-200 hover:shadow-lg"
              :class="getHospitalCardClass(hospital.availability)"
            >
              <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                  <h3 
                    class="font-semibold text-lg"
                    :class="getHospitalNameClass(hospital.availability)"
                  >
                    {{ hospital.hospitalName || hospital.name }}
                  </h3>
                  <span 
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="getStatusBadgeClass(hospital.availability)"
                  >
                    {{ getStatusText(hospital.availability) }}
                  </span>
                </div>
                
                <p class="text-gray-600 text-sm mb-2">
                  {{ hospital.address || hospital.vicinity || hospital.formatted_address }}
                </p>
                
                <div v-if="hospital.distance" class="text-xs text-gray-500">
                  {{ hospital.distance.toFixed(1) }} km away
                </div>
                
                <div v-if="hospital.specialities && hospital.specialities.length > 0" class="mt-2">
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="speciality in hospital.specialities.slice(0, 3)" 
                      :key="speciality"
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {{ speciality }}
                    </span>
                    <span 
                      v-if="hospital.specialities.length > 3"
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      +{{ hospital.specialities.length - 3 }} more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  interface Hospital {
    _id?: string
    place_id?: string
    hospitalName?: string
    name?: string
    address?: string
    vicinity?: string
    formatted_address?: string
    availability: string
    distance?: number
    specialities?: string[]
  }
  
  interface Props {
    isOpen: boolean
    hospitals: Hospital[]
  }
  
  interface Emits {
    (e: 'close'): void
    (e: 'hospital-click', hospital: Hospital): void
  }
  
  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  
  const searchQuery = ref('')
  
  const filteredHospitals = computed(() => {
    if (!searchQuery.value.trim()) {
      return props.hospitals
    }
    
    const query = searchQuery.value.toLowerCase()
    return props.hospitals.filter(hospital => {
      const name = (hospital.hospitalName || hospital.name || '').toLowerCase()
      const address = (hospital.address || hospital.vicinity || hospital.formatted_address || '').toLowerCase()
      const specialities = (hospital.specialities || []).join(' ').toLowerCase()
      
      return name.includes(query) || address.includes(query) || specialities.includes(query)
    })
  })
  
  const getHospitalCardClass = (availability: string) => {
    switch (availability?.toLowerCase()) {
      case 'available':
        return 'bg-green-50 border border-green-200'
      case 'unavailable':
        return 'bg-red-50 border border-red-200'
      case 'busy':
        return 'bg-blue-50 border border-blue-200'
      default:
        return 'bg-gray-50 border border-gray-200'
    }
  }
  
  const getHospitalNameClass = (availability: string) => {
    switch (availability?.toLowerCase()) {
      case 'available':
        return 'text-green-700'
      case 'unavailable':
        return 'text-red-700'
      case 'busy':
        return 'text-blue-700'
      default:
        return 'text-gray-700'
    }
  }
  
  const getStatusBadgeClass = (availability: string) => {
    switch (availability?.toLowerCase()) {
      case 'available':
        return 'bg-green-500 text-white'
      case 'unavailable':
        return 'bg-red-500 text-white'
      case 'busy':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }
  
  const getStatusText = (availability: string) => {
    switch (availability?.toLowerCase()) {
      case 'available':
        return 'Available'
      case 'unavailable':
        return 'Unavailable'
      case 'busy':
        return 'Busy'
      default:
        return 'Unknown'
    }
  }
  
  const handleHospitalClick = (hospital: Hospital) => {
    emit('hospital-click', hospital)
  }
  </script>
  
  <style scoped>
  .hospital-card {
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
  }
  
  .hospital-card:hover {
    transform: translateY(-2px);
  }
  </style>
  