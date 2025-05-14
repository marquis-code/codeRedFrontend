<template>
  <div class="websocket-status ml-3" v-if="showStatus">
    <div class="status-indicator" :class="{ 'connected': isConnected, 'disconnected': !isConnected }"></div>
    <span>{{ isConnected ? 'Connected to real-time updates' : 'Disconnected from real-time updates' }}</span>
    <span v-if="isConnected && debugMode" class="debug-info">
      ({{ subscribedCount }} subscriptions active)
    </span>
    <button v-if="debugMode" @click="forceRefresh" class="refresh-button">
      Refresh Data
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useWebSocketConnection } from '@/composables/useWebSocketConnection'

const props = defineProps({
  hospitals: {
    type: Array,
    required: true
  },
  userLocation: {
    type: Object,
    default: () => ({ lat: null, lng: null })
  },
  showStatus: {
    type: Boolean,
    default: true
  },
  debugMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['hospital-updated', 'hospitals-updated'])

// Initialize WebSocket connection
const {
  isConnected,
  subscribeToHospital,
  subscribeToRegion,
  getHospitalBedspaceStatus,
  latestBedspaceUpdates,
  reconnect,
  getAllPossibleHospitalIds,
  forceUpdateAllHospitals,
  enableDebugMode,
  debugMode
} = useWebSocketConnection()

// If debug mode is enabled in props, enable it in the composable
if (props.debugMode) {
  enableDebugMode()
}

// Track which hospitals we've subscribed to
const subscribedHospitalIds = ref(new Set())
const hasSubscribedToRegion = ref(false)

// For debugging
const subscribedCount = computed(() => subscribedHospitalIds.value.size)

// Subscribe to all hospitals in the list
const subscribeToAllHospitals = () => {
  console.log('Subscribing to all hospitals:', props.hospitals.length)
  
  props.hospitals.forEach(hospital => {
    // Try all possible ID fields
    const possibleIds = getAllPossibleHospitalIds(hospital)
    
    possibleIds.forEach(hospitalId => {
      if (hospitalId && !subscribedHospitalIds.value.has(hospitalId)) {
        console.log(`Attempting to subscribe to hospital: ${hospitalId}`)
        
        if (subscribeToHospital(hospitalId)) {
          subscribedHospitalIds.value.add(hospitalId)
          console.log(`Successfully subscribed to hospital: ${hospitalId}`)
        }
      }
    })
  })
}

// Subscribe to the user's region
const subscribeToUserRegion = () => {
  if (
    props.userLocation && 
    props.userLocation.lat && 
    props.userLocation.lng && 
    !hasSubscribedToRegion.value
  ) {
    console.log(`Subscribing to region: ${props.userLocation.lat}, ${props.userLocation.lng}`)
    
    if (subscribeToRegion(props.userLocation.lat, props.userLocation.lng, 10)) {
      hasSubscribedToRegion.value = true
      console.log('Successfully subscribed to region')
    }
  }
}

// Update hospital data when we receive WebSocket updates
const updateHospitalData = () => {
  console.log('Updating hospital data from WebSocket updates')
  console.log('Latest bedspace updates:', Array.from(latestBedspaceUpdates.value.entries()).length)
  
  props.hospitals.forEach(hospital => {
    const bedspaceStatus = getHospitalBedspaceStatus(hospital)
    
    if (bedspaceStatus) {
      console.log(`Found bedspace status for hospital:`, bedspaceStatus)
      
      // Create updated hospital object with new bedspace data
      const updatedHospital = {
        ...hospital,
        totalAvailableBeds: bedspaceStatus.totalAvailableBeds,
        totalBedCount: bedspaceStatus.totalBedCount,
        overallBedStatus: bedspaceStatus.overallStatus,
        bedspaces: bedspaceStatus.bedspaces,
        // Map the status to the format expected by the UI
        availability: bedspaceStatus.overallStatus.toLowerCase() === 'available' 
          ? 'available' 
          : bedspaceStatus.overallStatus.toLowerCase() === 'limited' 
            ? 'busy' 
            : 'unavailable'
      }
      
      // Emit the updated hospital data
      emit('hospital-updated', updatedHospital)
    } else {
      console.log(`No bedspace status found for hospital`, hospital._id || hospital.id || hospital.place_id || hospital.placeId)
    }
  })
}

// Force refresh all hospitals
const forceRefresh = () => {
  console.log('Forcing refresh of all hospitals')
  
  // Update all hospitals at once
  const updatedHospitals = forceUpdateAllHospitals(props.hospitals)
  
  // Emit the updated hospitals
  emit('hospitals-updated', updatedHospitals)
  
  // Also emit individual updates
  updatedHospitals.forEach(hospital => {
    if (hospital.totalAvailableBeds !== undefined) {
      emit('hospital-updated', hospital)
    }
  })
}

// Force reconnect and resubscribe
const forceReconnect = () => {
  console.log('Forcing WebSocket reconnection')
  subscribedHospitalIds.value.clear()
  hasSubscribedToRegion.value = false
  reconnect()
  
  // Wait for connection to be established before resubscribing
  const checkConnection = setInterval(() => {
    if (isConnected.value) {
      clearInterval(checkConnection)
      subscribeToAllHospitals()
      if (props.userLocation?.lat && props.userLocation?.lng) {
        subscribeToUserRegion()
      }
    }
  }, 1000)
}

// Watch for changes in the WebSocket updates
watch(latestBedspaceUpdates, () => {
  console.log('latestBedspaceUpdates changed, updating hospital data')
  updateHospitalData()
}, { deep: true })

// Watch for changes in the hospitals list
watch(() => props.hospitals, (newHospitals) => {
  console.log('Hospitals list changed:', newHospitals.length)
  if (isConnected.value && newHospitals.length > 0) {
    subscribeToAllHospitals()
    updateHospitalData()
  }
}, { deep: true })

// Watch for changes in user location
watch(() => props.userLocation, (newLocation) => {
  if (isConnected.value && newLocation.lat && newLocation.lng) {
    subscribeToUserRegion()
  }
}, { deep: true })

// Watch for connection status changes
watch(isConnected, (connected) => {
  console.log('WebSocket connection status changed:', connected)
  if (connected) {
    // When connection is established, subscribe to hospitals and region
    if (props.hospitals.length > 0) {
      subscribeToAllHospitals()
    }
    
    if (props.userLocation?.lat && props.userLocation?.lng) {
      subscribeToUserRegion()
    }
    
    // Also update hospital data in case we already have cached updates
    updateHospitalData()
  }
})

const hasLocation = ref(false)
const initialTimeoutDone = ref(false)

watch(() => props.userLocation, (newLocation) => {
  hasLocation.value = !!(newLocation.lat && newLocation.lng)
}, { deep: true, immediate: true })

// Initialize on component mount
onMounted(() => {
  console.log('WebSocketManager mounted')
  
  // Wait a short time to ensure WebSocket connection is ready
  setTimeout(() => {
    initialTimeoutDone.value = true
    if (isConnected.value) {
      if (props.hospitals.length > 0) {
        subscribeToAllHospitals()
      }
      
      if (hasLocation.value) {
        subscribeToUserRegion()
      }
      
      // Initial update in case we already have data
      updateHospitalData()
      
      // Force a refresh after a short delay to ensure we have the latest data
      setTimeout(() => {
        forceRefresh()
      }, 2000)
    } else {
      console.log('WebSocket not connected yet, will subscribe when connected')
      // Force reconnect if not connected after a delay
      setTimeout(() => {
        if (!isConnected.value) {
          forceReconnect()
        }
      }, 5000)
    }
  }, 1000)
})
</script>

<style scoped>
.websocket-status {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.connected {
  background-color: #10b981;
  box-shadow: 0 0 5px #10b981;
}

.disconnected {
  background-color: #ef4444;
  box-shadow: 0 0 5px #ef4444;
}

.debug-info {
  margin-left: 0.5rem;
  font-size: 0.7rem;
  color: #888;
}

.refresh-button {
  margin-left: 0.5rem;
  font-size: 0.7rem;
  padding: 2px 6px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
}

.refresh-button:hover {
  background-color: #e5e7eb;
}
</style>