<template>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-display font-bold text-gray-900">
            Nearby Medical Facilities
          </h3>
          <p class="text-sm text-gray-600 mt-1">
            {{ facilities.length }} facilities found within {{ maxDistance }}km
          </p>
        </div>
        
        <!-- View Toggle -->
        <div class="flex items-center space-x-2">
          <button
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-medical-primary text-white' : 'bg-gray-100 text-gray-600'"
            class="p-2 rounded-lg transition-colors"
            title="Grid view"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'bg-medical-primary text-white' : 'bg-gray-100 text-gray-600'"
            class="p-2 rounded-lg transition-colors"
            title="List view"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Filters -->
      <div class="flex flex-wrap gap-2">
        <button
          @click="selectedFilter = 'all'"
          :class="selectedFilter === 'all' ? 'bg-medical-primary text-white' : 'bg-gray-100 text-gray-700'"
          class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
        >
          All ({{ facilities.length }})
        </button>
        <button
          @click="selectedFilter = 'available'"
          :class="selectedFilter === 'available' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700'"
          class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
        >
          Available ({{ availableFacilities.length }})
        </button>
        <button
          @click="selectedFilter = 'hospital'"
          :class="selectedFilter === 'hospital' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'"
          class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
        >
          Hospitals ({{ hospitalFacilities.length }})
        </button>
      </div>
  
      <!-- Empty State -->
      <div v-if="filteredFacilities.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
        <h4 class="text-lg font-medium text-gray-900 mb-2">No facilities found</h4>
        <p class="text-gray-600">Try adjusting your filters or check your location settings.</p>
      </div>
  
      <!-- Facilities Grid/List -->
      <div 
        v-else
        :class="viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
          : 'space-y-4'"
      >
        <FacilityCard
          v-for="facility in filteredFacilities"
          :key="facility.id"
          :facility="facility"
          @select="$emit('selectFacility', facility)"
          @get-directions="$emit('getDirections', facility)"
        />
      </div>
  
      <!-- Load More Button -->
      <div v-if="hasMore" class="text-center pt-6">
        <button
          @click="loadMore"
          class="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Load More Facilities
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { MedicalFacility } from '@/composables/useGoogleMaps'
  
  interface Props {
    facilities: MedicalFacility[]
    maxDistance?: number
  }
  
  const props = withDefaults(defineProps<Props>(), {
    maxDistance: 5
  })
  
  defineEmits<{
    selectFacility: [facility: MedicalFacility]
    getDirections: [facility: MedicalFacility]
  }>()
  
  const viewMode = ref<'grid' | 'list'>('grid')
  const selectedFilter = ref<'all' | 'available' | 'hospital'>('all')
  const displayLimit = ref(12)
  
  const availableFacilities = computed(() => 
    props.facilities.filter(f => f.availability === 'available')
  )
  
  const hospitalFacilities = computed(() => 
    props.facilities.filter(f => f.types.includes('hospital'))
  )
  
  const filteredFacilities = computed(() => {
    let filtered = props.facilities
  
    switch (selectedFilter.value) {
      case 'available':
        filtered = availableFacilities.value
        break
      case 'hospital':
        filtered = hospitalFacilities.value
        break
      default:
        filtered = props.facilities
    }
  
    return filtered.slice(0, displayLimit.value)
  })
  
  const hasMore = computed(() => {
    const totalFiltered = selectedFilter.value === 'available' 
      ? availableFacilities.value.length
      : selectedFilter.value === 'hospital'
      ? hospitalFacilities.value.length
      : props.facilities.length
  
    return displayLimit.value < totalFiltered
  })
  
  const loadMore = () => {
    displayLimit.value += 6
  }
  </script>
  