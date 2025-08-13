<template>
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-display font-bold text-gray-900">Availability Overview</h3>
        <div class="flex items-center space-x-2">
          <div 
            class="w-3 h-3 rounded-full"
            :class="isUpdating ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'"
          ></div>
          <span class="text-sm text-gray-600">
            {{ isUpdating ? 'Updating...' : 'Live' }}
          </span>
        </div>
      </div>
  
      <!-- Summary Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="text-center p-3 bg-emerald-50 rounded-lg">
          <div class="text-2xl font-bold text-emerald-600">{{ availableCount }}</div>
          <div class="text-sm text-emerald-700">Available</div>
        </div>
        <div class="text-center p-3 bg-yellow-50 rounded-lg">
          <div class="text-2xl font-bold text-yellow-600">{{ busyCount }}</div>
          <div class="text-sm text-yellow-700">Busy</div>
        </div>
        <div class="text-center p-3 bg-orange-50 rounded-lg">
          <div class="text-2xl font-bold text-orange-600">{{ emergencyCount }}</div>
          <div class="text-sm text-orange-700">Emergency</div>
        </div>
        <div class="text-center p-3 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">{{ averageWaitTime }}m</div>
          <div class="text-sm text-blue-700">Avg Wait</div>
        </div>
      </div>
  
      <!-- Quick Filters -->
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          @click="selectedFilter = 'all'"
          :class="selectedFilter === 'all' ? 'bg-medical-primary text-white' : 'bg-gray-100 text-gray-700'"
          class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
        >
          All Facilities
        </button>
        <button
          @click="selectedFilter = 'available'"
          :class="selectedFilter === 'available' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700'"
          class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
        >
          Available Now
        </button>
        <button
          @click="selectedFilter = 'emergency'"
          :class="selectedFilter === 'emergency' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'"
          class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
        >
          Emergency Rooms
        </button>
        <button
          @click="selectedFilter = 'low-wait'"
          :class="selectedFilter === 'low-wait' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'"
          class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
        >
          Low Wait Times
        </button>
      </div>
  
      <!-- Facility List with Availability -->
      <div class="space-y-3 max-h-64 overflow-y-auto">
        <div
          v-for="facility in filteredFacilities"
          :key="facility.id"
          class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          @click="$emit('selectFacility', facility)"
        >
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-gray-900 truncate">{{ facility.name }}</h4>
            <p class="text-sm text-gray-600 truncate">{{ facility.address }}</p>
          </div>
          <div class="ml-4 flex-shrink-0">
            <AvailabilityIndicator 
              :availability="getFacilityAvailability(facility.id)"
              :show-details="false"
            />
          </div>
        </div>
      </div>
  
      <!-- Last Update Info -->
      <div class="mt-4 pt-4 border-t border-gray-200 text-center">
        <p class="text-xs text-gray-500">
          Last updated {{ getTimeAgo(lastGlobalUpdate) }}
          <button 
            @click="$emit('refreshAvailability')"
            class="ml-2 text-medical-primary hover:text-blue-600 underline"
          >
            Refresh
          </button>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAvailability } from '@/composables/useAvailability'
  import type { MedicalFacility } from '@/composables/useGoogleMaps'
  
  interface Props {
    facilities: MedicalFacility[]
  }
  
  const props = defineProps<Props>()
  
  const emit = defineEmits<{
    selectFacility: [facility: MedicalFacility]
    refreshAvailability: []
  }>()
  
  const { 
    availabilityData, 
    isUpdating, 
    lastGlobalUpdate, 
    averageWaitTime,
    getFacilityAvailability 
  } = useAvailability()
  
  const selectedFilter = ref<'all' | 'available' | 'emergency' | 'low-wait'>('all')
  
  // Computed stats
  const availableCount = computed(() => {
    return props.facilities.filter(f => {
      const availability = availabilityData.value.get(f.id)
      return availability?.status === 'available'
    }).length
  })
  
  const busyCount = computed(() => {
    return props.facilities.filter(f => {
      const availability = availabilityData.value.get(f.id)
      return availability?.status === 'busy'
    }).length
  })
  
  const emergencyCount = computed(() => {
    return props.facilities.filter(f => {
      const availability = availabilityData.value.get(f.id)
      return availability?.emergencyStatus?.isEmergencyRoom
    }).length
  })
  
  const filteredFacilities = computed(() => {
    return props.facilities.filter(facility => {
      const availability = availabilityData.value.get(facility.id)
      
      switch (selectedFilter.value) {
        case 'available':
          return availability?.status === 'available'
        case 'emergency':
          return availability?.emergencyStatus?.isEmergencyRoom
        case 'low-wait':
          return availability?.waitTime && availability.waitTime <= 30
        default:
          return true
      }
    })
  })
  
  const getTimeAgo = (timestamp: number): string => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }
  </script>
  