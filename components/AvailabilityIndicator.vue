<template>
    <div class="availability-indicator">
      <!-- Main Status Badge -->
      <div 
        class="flex items-center space-x-2 px-3 py-2 rounded-lg border"
        :class="getAvailabilityBadgeClass(availability?.status || 'unknown')"
      >
        <div class="flex items-center space-x-1">
          <div 
            class="w-2 h-2 rounded-full animate-pulse"
            :class="{
              'bg-emerald-500': availability?.status === 'available',
              'bg-yellow-500': availability?.status === 'busy',
              'bg-orange-500': availability?.status === 'emergency-only',
              'bg-red-500': availability?.status === 'closed',
              'bg-gray-400': !availability?.status || availability?.status === 'unknown'
            }"
          ></div>
          <span class="text-sm font-medium capitalize">
            {{ getStatusText(availability?.status) }}
          </span>
        </div>
        
        <!-- Confidence Indicator -->
        <div v-if="showConfidence && availability?.confidence" class="text-xs opacity-75">
          {{ Math.round(availability.confidence * 100) }}%
        </div>
      </div>
  
      <!-- Detailed Information -->
      <div v-if="showDetails && availability" class="mt-2 space-y-2">
        <!-- Wait Time -->
        <div v-if="availability.waitTime !== undefined" class="flex items-center space-x-2 text-sm">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-gray-600">{{ getWaitTimeText(availability.waitTime) }}</span>
        </div>
  
        <!-- Capacity -->
        <div v-if="availability.capacity" class="space-y-1">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Capacity</span>
            <span class="font-medium">{{ availability.capacity.percentage }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="h-2 rounded-full transition-all duration-300"
              :class="{
                'bg-emerald-500': availability.capacity.percentage < 50,
                'bg-yellow-500': availability.capacity.percentage >= 50 && availability.capacity.percentage < 80,
                'bg-red-500': availability.capacity.percentage >= 80
              }"
              :style="{ width: `${availability.capacity.percentage}%` }"
            ></div>
          </div>
        </div>
  
        <!-- Emergency Information -->
        <div v-if="availability.emergencyStatus?.isEmergencyRoom" class="p-2 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center space-x-2 mb-1">
            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <span class="text-sm font-medium text-red-800">Emergency Room</span>
          </div>
          <div class="text-xs text-red-700 space-y-1">
            <div v-if="availability.emergencyStatus.emergencyWaitTime">
              Emergency wait: {{ getWaitTimeText(availability.emergencyStatus.emergencyWaitTime) }}
            </div>
            <div v-if="availability.emergencyStatus.traumaLevel">
              Trauma Level {{ availability.emergencyStatus.traumaLevel }}
            </div>
          </div>
        </div>
  
        <!-- Last Updated -->
        <div class="flex items-center space-x-2 text-xs text-gray-500">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>Updated {{ getTimeAgo(availability.lastUpdated) }}</span>
          <div 
            v-if="isDataStale(availability)"
            class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
            title="Data may be outdated"
          ></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useAvailability } from '@/composables/useAvailability'
  import type { AvailabilityData, AvailabilityStatus } from '@/composables/useAvailability'
  
  interface Props {
    availability: AvailabilityData | null
    showDetails?: boolean
    showConfidence?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
    showDetails: true,
    showConfidence: false
  })
  
  const { getAvailabilityBadgeClass, getWaitTimeText, isDataStale } = useAvailability()
  
  const getStatusText = (status?: AvailabilityStatus): string => {
    switch (status) {
      case 'available':
        return 'Available'
      case 'busy':
        return 'Busy'
      case 'emergency-only':
        return 'Emergency Only'
      case 'closed':
        return 'Closed'
      default:
        return 'Unknown'
    }
  }
  
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
  