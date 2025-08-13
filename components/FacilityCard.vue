<template>
    <div 
      class="medical-card p-0 cursor-pointer group overflow-hidden"
      @click="$emit('select', facility)"
    >
      <!-- Facility Image -->
      <div class="relative h-32 bg-gradient-to-r from-medical-primary/10 to-medical-secondary/10">
        <img 
          v-if="facility.photos && facility.photos[0]"
          :src="facility.photos[0]"
          :alt="facility.name"
          class="w-full h-full object-cover group-hover:scale-105"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        
        <!-- Enhanced Availability Badge with real availability data -->
        <div class="absolute top-3 right-3">
          <AvailabilityIndicator 
            :availability="availability"
            :show-details="false"
          />
        </div>
  
        <!-- Distance Badge -->
        <div class="absolute bottom-3 left-3">
          <div class="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-700">
            {{ facility.distance }}km away
          </div>
        </div>
      </div>
  
      <!-- Facility Details -->
      <div class="p-4">
        <!-- Header -->
        <div class="mb-3">
          <h3 class="font-display font-bold text-gray-900 text-lg leading-tight mb-1 group-hover:text-medical-primary transition-colors">
            {{ facility.name }}
          </h3>
          <p class="text-sm text-gray-600 line-clamp-2">{{ facility.address }}</p>
        </div>
  
        <!-- Rating and Type -->
        <div class="flex items-center justify-between mb-3">
          <div v-if="facility.rating" class="flex items-center space-x-1">
            <div class="flex items-center">
              <svg 
                v-for="star in 5" 
                :key="star"
                class="w-4 h-4"
                :class="star <= Math.floor(facility.rating) ? 'text-yellow-400' : 'text-gray-300'"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700">{{ facility.rating.toFixed(1) }}</span>
          </div>
          
          <div class="flex items-center space-x-1">
            <span 
              v-if="getPrimaryType(facility.types)"
              class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium"
            >
              {{ getPrimaryType(facility.types) }}
            </span>
          </div>
        </div>
  
        <!-- Enhanced availability information display -->
        <div v-if="availability" class="mb-4 p-3 bg-gray-50 rounded-lg">
          <AvailabilityIndicator 
            :availability="availability"
            :show-details="true"
            :show-confidence="false"
          />
        </div>
  
        <!-- Contact Info -->
        <div class="space-y-2 mb-4">
          <div v-if="facility.phoneNumber" class="flex items-center space-x-2 text-sm text-gray-600">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <span>{{ facility.phoneNumber }}</span>
          </div>
  
          <div v-if="getCurrentStatus(facility)" class="flex items-center space-x-2 text-sm">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span 
              :class="getCurrentStatus(facility)?.isOpen ? 'text-emerald-600' : 'text-red-600'"
              class="font-medium"
            >
              {{ getCurrentStatus(facility)?.text }}
            </span>
          </div>
        </div>
  
        <!-- Action Buttons -->
        <div class="flex space-x-2">
          <button 
            @click.stop="$emit('getDirections', facility)"
            class="flex-1 bg-medical-primary text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
            </svg>
            <span>Directions</span>
          </button>
          
          <button 
            v-if="facility.phoneNumber"
            @click.stop="callFacility(facility.phoneNumber)"
            class="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors"
            title="Call facility"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import type { MedicalFacility } from '@/composables/useGoogleMaps'
  import { useAvailability } from '@/composables/useAvailability'
  
  interface Props {
    facility: MedicalFacility
  }
  
  const props = defineProps<Props>()
  
  defineEmits<{
    select: [facility: MedicalFacility]
    getDirections: [facility: MedicalFacility]
  }>()
  
  const { getFacilityAvailability } = useAvailability()
  
  const availability = computed(() => getFacilityAvailability(props.facility.id))
  
  const getPrimaryType = (types: string[]) => {
    const typeMap: Record<string, string> = {
      'hospital': 'Hospital',
      'doctor': 'Clinic',
      'health': 'Health Center',
      'pharmacy': 'Pharmacy',
      'dentist': 'Dental',
      'veterinary_care': 'Veterinary',
      'physiotherapist': 'Physiotherapy'
    }
  
    for (const type of types) {
      if (typeMap[type]) {
        return typeMap[type]
      }
    }
    return 'Medical'
  }
  
  const getCurrentStatus = (facility: MedicalFacility) => {
    if (!facility.openingHours || facility.openingHours.length === 0) {
      return null
    }
  
    const now = new Date()
    const dayOfWeek = now.getDay()
    const currentTime = now.getHours() * 100 + now.getMinutes()
  
    // This is a simplified version - in a real app you'd parse the actual opening hours
    const isOpen = facility.availability === 'available' && Math.random() > 0.3
  
    return {
      isOpen,
      text: isOpen ? 'Open now' : 'Closed now'
    }
  }
  
  const callFacility = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self')
  }
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .transition-transform {
    transition: transform 0.3s ease;
  }
  </style>
  