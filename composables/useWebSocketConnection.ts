import { ref, onMounted, onUnmounted, watch } from 'vue'
import { io, Socket } from 'socket.io-client'
import { useCustomToast } from '@/composables/core/useCustomToast'

export interface BedspaceUpdate {
  hospitalId: string
  bedspace: {
    _id: string
    status: 'Available' | 'Unavailable' | 'Limited'
    availableBeds: number
    occupiedBeds: number
    totalBeds: number
    departmentName: string
    location: string
  }
  timestamp: string
  eventId: string
}

export interface EmergencyUpdate {
  hospitalId: string
  emergency: any
  timestamp: string
  eventId: string
}

export interface HospitalStatusUpdate {
  hospitalId: string
  status: string
  timestamp: string
  eventId: string
}

export function useWebSocketConnection() {
  const { showToast } = useCustomToast()
  const socket = ref<Socket | null>(null)
  const isConnected = ref(false)
  const connectionError = ref<string | null>(null)
  const lastHeartbeat = ref<string | null>(null)
  const subscribedHospitals = ref<Set<string>>(new Set())
  const subscribedRegions = ref<Set<string>>(new Set())
  
  // Store the latest updates received
  const latestBedspaceUpdates = ref<Map<string, BedspaceUpdate>>(new Map())
  const reconnectAttempts = ref(0)
  const maxReconnectAttempts = 5
  const reconnectInterval = ref(2000) // Start with 2 seconds
  let reconnectTimer: NodeJS.Timeout | null = null
  
  // Track if we've received any data
  const hasReceivedData = ref(false)
  
  // Debug mode
  const debugMode = ref(false)
  
  // Enable debug mode
  const enableDebugMode = () => {
    debugMode.value = true
    console.log('WebSocket debug mode enabled')
  }

  // Initialize WebSocket connection
  const initializeWebSocket = () => {
    try {
      // Close existing connection if any
      if (socket.value) {
        socket.value.disconnect()
      }

      if (debugMode.value) console.log('Connecting to WebSocket server...')

      // Connect to the WebSocket server
      socket.value = io(import.meta.env.VITE_BASE_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        autoConnect: true,
        forceNew: true // Force a new connection
      })

      // Connection event handlers
      socket.value.on('connect', () => {
        console.log('WebSocket connected successfully with ID:', socket.value?.id)
        isConnected.value = true
        connectionError.value = null
        reconnectAttempts.value = 0
        reconnectInterval.value = 2000
        
        showToast({
          title: 'Connected',
          message: 'Real-time updates are now active',
          toastType: 'success',
          duration: 3000
        })
        
        // Resubscribe to previously subscribed hospitals and regions
        resubscribeToAll()
      })

      socket.value.on('disconnect', (reason) => {
        console.log(`WebSocket disconnected: ${reason}`)
        isConnected.value = false
        
        showToast({
          title: 'Disconnected',
          message: 'Connection to real-time updates lost. Reconnecting...',
          toastType: 'warning',
          duration: 5000
        })
        
        // If the server closed the connection, try to reconnect manually
        if (reason === 'io server disconnect') {
          attemptReconnect()
        }
      })

      socket.value.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error)
        connectionError.value = error.message
        isConnected.value = false
        
        if (reconnectAttempts.value < maxReconnectAttempts) {
          attemptReconnect()
        } else {
          showToast({
            title: 'Connection Failed',
            message: 'Unable to connect to real-time updates. Please refresh the page.',
            toastType: 'error',
            duration: 8000
          })
        }
      })

      // Heartbeat to keep connection alive and detect disconnections
      socket.value.on('heartbeat', (data) => {
        if (debugMode.value) console.log('Heartbeat received:', data)
        lastHeartbeat.value = data.timestamp
        socket.value?.emit('heartbeat_response')
      })

      // Event listeners for bedspace updates
      socket.value.on('bedspace_updated', (data: BedspaceUpdate) => {
        console.log('Bedspace update received:', data)
        hasReceivedData.value = true
        
        if (data && data.bedspace && data.bedspace._id) {
          latestBedspaceUpdates.value.set(data.bedspace._id, data)
          
          showToast({
            title: 'Bedspace Update',
            message: `${data.bedspace.departmentName} now has ${data.bedspace.availableBeds} available beds`,
            toastType: data.bedspace.status === 'Available' ? 'success' : 'warning',
            duration: 5000
          })
        } else {
          console.error('Received invalid bedspace update data:', data)
        }
      })

      // Also listen for the hospital_bedspace_updated event (used for regional subscribers)
      socket.value.on('hospital_bedspace_updated', (data: BedspaceUpdate) => {
        console.log('Hospital bedspace update received (regional):', data)
        hasReceivedData.value = true
        
        if (data && data.bedspace && data.bedspace._id) {
          latestBedspaceUpdates.value.set(data.bedspace._id, data)
          
          showToast({
            title: 'Regional Bedspace Update',
            message: `${data.bedspace.departmentName} now has ${data.bedspace.availableBeds} available beds`,
            toastType: data.bedspace.status === 'Available' ? 'success' : 'warning',
            duration: 5000
          })
        } else {
          console.error('Received invalid regional bedspace update data:', data)
        }
      })

      socket.value.on('emergency_created', (data: EmergencyUpdate) => {
        console.log('Emergency update received:', data)
        hasReceivedData.value = true
        
        showToast({
          title: 'Emergency Alert',
          message: 'A new emergency has been registered at this hospital',
          toastType: 'error',
          duration: 8000
        })
      })

      socket.value.on('hospital_status_changed', (data: HospitalStatusUpdate) => {
        console.log('Hospital status changed:', data)
        hasReceivedData.value = true
        
        showToast({
          title: 'Hospital Status Update',
          message: `Hospital status changed to: ${data.status}`,
          toastType: data.status.toLowerCase() === 'available' ? 'success' : 'warning',
          duration: 5000
        })
      })

      socket.value.on('initial_bedspace_data', (data) => {
        console.log('Initial bedspace data received:', data)
        hasReceivedData.value = true
        
        // Store each bedspace update
        if (data.bedspaces && Array.isArray(data.bedspaces)) {
          console.log(`Processing ${data.bedspaces.length} bedspaces for hospital ${data.hospitalId}`)
          
          data.bedspaces.forEach((bedspace) => {
            if (bedspace && bedspace._id) {
              latestBedspaceUpdates.value.set(bedspace._id, {
                hospitalId: data.hospitalId,
                bedspace,
                timestamp: data.timestamp || new Date().toISOString(),
                eventId: `initial_${bedspace._id}`
              })
            } else {
              console.error('Received invalid bedspace in initial data:', bedspace)
            }
          })
          
          // Force a reactivity update by creating a new Map
          latestBedspaceUpdates.value = new Map(latestBedspaceUpdates.value)
        } else {
          console.log('No bedspaces in initial data or invalid format:', data)
        }
      })

      socket.value.on('connection_status', (data) => {
        console.log('Connection status:', data)
      })

      // Add a catch-all event listener for debugging
      socket.value.onAny((eventName, ...args) => {
        if (debugMode.value) console.log(`Event received: ${eventName}`, args)
      })

      // Error handling
      socket.value.on('error', (error) => {
        console.error('WebSocket error:', error)
        connectionError.value = error.message || 'Unknown error occurred'
        
        showToast({
          title: 'Connection Error',
          message: 'An error occurred with the real-time connection',
          toastType: 'error',
          duration: 5000
        })
      })

      // Set up a ping interval to keep the connection alive
      const pingInterval = setInterval(() => {
        if (socket.value && isConnected.value) {
          if (debugMode.value) console.log('Sending ping...')
          socket.value.emit('ping', { timestamp: new Date().toISOString() })
        }
      }, 25000) // Every 25 seconds
      
      // Store interval for cleanup
      socket.value.pingInterval = pingInterval

    } catch (error) {
      console.error('Error initializing WebSocket:', error)
      connectionError.value = error instanceof Error ? error.message : 'Unknown error'
    }
  }

  // Manual reconnection logic with exponential backoff
  const attemptReconnect = () => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
    }
    
    reconnectAttempts.value++
    
    // Exponential backoff
    const delay = Math.min(reconnectInterval.value * Math.pow(1.5, reconnectAttempts.value - 1), 30000)
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.value})`)
    
    reconnectTimer = setTimeout(() => {
      console.log(`Reconnecting... (attempt ${reconnectAttempts.value})`)
      initializeWebSocket()
    }, delay)
  }

  // Subscribe to a specific hospital's updates
  const subscribeToHospital = (hospitalId: string) => {
    if (!socket.value || !isConnected.value) {
      console.warn('Cannot subscribe: WebSocket not connected')
      return false
    }
    
    if (!hospitalId) {
      console.error('Cannot subscribe: Invalid hospital ID')
      return false
    }
    
    console.log(`Subscribing to hospital: ${hospitalId}`)
    
    socket.value.emit('subscribe_hospital', { hospitalId }, (response) => {
      if (response && response.success) {
        subscribedHospitals.value.add(hospitalId)
        console.log(`Successfully subscribed to hospital ${hospitalId}`, response)
      } else {
        console.error('Failed to subscribe to hospital:', response)
      }
    })
    
    return true
  }

  // Unsubscribe from a hospital's updates
  const unsubscribeFromHospital = (hospitalId: string) => {
    if (!socket.value || !isConnected.value) {
      console.warn('Cannot unsubscribe: WebSocket not connected')
      return false
    }
    
    if (!hospitalId) {
      console.error('Cannot unsubscribe: Invalid hospital ID')
      return false
    }
    
    console.log(`Unsubscribing from hospital: ${hospitalId}`)
    
    socket.value.emit('unsubscribe_hospital', { hospitalId }, (response) => {
      if (response && response.success) {
        subscribedHospitals.value.delete(hospitalId)
        console.log(`Successfully unsubscribed from hospital ${hospitalId}`)
      } else {
        console.error('Failed to unsubscribe from hospital:', response)
      }
    })
    
    return true
  }

  // Subscribe to a geographic region for updates
  const subscribeToRegion = (latitude: number, longitude: number, radius: number) => {
    if (!socket.value || !isConnected.value) {
      console.warn('Cannot subscribe to region: WebSocket not connected')
      return false
    }
    
    if (latitude === undefined || longitude === undefined || radius === undefined) {
      console.error('Cannot subscribe to region: Invalid coordinates or radius')
      return false
    }
    
    const regionKey = `region:${latitude.toFixed(2)}:${longitude.toFixed(2)}:${radius}`
    console.log(`Subscribing to region: ${regionKey}`)
    
    socket.value.emit('subscribe_region', { latitude, longitude, radius }, (response) => {
      if (response && response.success) {
        subscribedRegions.value.add(regionKey)
        console.log(`Successfully subscribed to region ${regionKey}`)
      } else {
        console.error('Failed to subscribe to region:', response)
      }
    })
    
    return true
  }

  // Resubscribe to all previously subscribed entities after reconnection
  const resubscribeToAll = () => {
    console.log('Resubscribing to all previous subscriptions')
    
    // Resubscribe to hospitals
    subscribedHospitals.value.forEach(hospitalId => {
      subscribeToHospital(hospitalId)
    })
    
    // Resubscribe to regions
    subscribedRegions.value.forEach(regionKey => {
      const [, latStr, lngStr, radiusStr] = regionKey.split(':')
      if (latStr && lngStr && radiusStr) {
        subscribeToRegion(parseFloat(latStr), parseFloat(lngStr), parseFloat(radiusStr))
      }
    })
  }

  // Get all possible IDs for a hospital
  const getAllPossibleHospitalIds = (hospital: any): string[] => {
    const ids = [];
    
    if (hospital._id) ids.push(hospital._id);
    if (hospital.id) ids.push(hospital.id);
    if (hospital.place_id) ids.push(hospital.place_id);
    if (hospital.placeId) ids.push(hospital.placeId);
    
    return ids;
  }

  // Get the latest bedspace status for a hospital
  const getHospitalBedspaceStatus = (hospital: any) => {
    if (!hospital) {
      console.error('Cannot get bedspace status: Invalid hospital object')
      return null
    }
    
    // Try all possible ID fields
    const possibleIds = getAllPossibleHospitalIds(hospital);
    
    if (possibleIds.length === 0) {
      console.error('Cannot get bedspace status: No valid hospital ID found', hospital)
      return null
    }
    
    // Find all bedspaces for this hospital using any of the possible IDs
    const bedspaces = Array.from(latestBedspaceUpdates.value.values())
      .filter(update => possibleIds.includes(update.hospitalId))
    
    if (bedspaces.length === 0) {
      if (debugMode.value) console.log(`No bedspace updates found for hospital IDs: ${possibleIds.join(', ')}`)
      return null
    }
    
    console.log(`Found ${bedspaces.length} bedspace updates for hospital`)
    
    // Calculate total available and occupied beds
    const totalAvailable = bedspaces.reduce((sum, update) => sum + update.bedspace.availableBeds, 0)
    const totalOccupied = bedspaces.reduce((sum, update) => sum + update.bedspace.occupiedBeds, 0)
    const totalBeds = bedspaces.reduce((sum, update) => sum + update.bedspace.totalBeds, 0)
    
    // Determine overall status
    let overallStatus = 'Unavailable'
    if (totalAvailable > 0) {
      overallStatus = totalAvailable < totalBeds * 0.2 ? 'Limited' : 'Available'
    }
    
    return {
      hospitalId: possibleIds[0], // Use the first valid ID
      overallStatus,
      totalAvailableBeds: totalAvailable,
      totalOccupiedBeds: totalOccupied,
      totalBedCount: totalBeds,
      bedspaces: bedspaces.map(update => update.bedspace),
      lastUpdated: new Date().toISOString()
    }
  }

  // Manually trigger a test to check if the connection is working
  const testConnection = () => {
    if (!socket.value || !isConnected.value) {
      console.warn('Cannot test connection: WebSocket not connected')
      return false
    }
    
    console.log('Testing WebSocket connection...')
    socket.value.emit('ping', { timestamp: new Date().toISOString() })
    return true
  }
  
  // Force update all hospitals with current bedspace data
  const forceUpdateAllHospitals = (hospitals: any[]) => {
    console.log('Forcing update of all hospitals with current bedspace data')
    
    const updatedHospitals = hospitals.map(hospital => {
      const bedspaceStatus = getHospitalBedspaceStatus(hospital)
      
      if (bedspaceStatus) {
        return {
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
      }
      
      return hospital
    })
    
    return updatedHospitals
  }

  // Lifecycle hooks
  onMounted(() => {
    console.log('Mounting WebSocket connection')
    initializeWebSocket()
  })

  onUnmounted(() => {
    console.log('Unmounting WebSocket connection')
    if (socket.value) {
      // Clear ping interval
      if (socket.value.pingInterval) {
        clearInterval(socket.value.pingInterval)
      }
      
      socket.value.disconnect()
    }
    
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
    }
  })

  return {
    socket,
    isConnected,
    connectionError,
    lastHeartbeat,
    subscribedHospitals,
    subscribedRegions,
    latestBedspaceUpdates,
    hasReceivedData,
    subscribeToHospital,
    unsubscribeFromHospital,
    subscribeToRegion,
    getHospitalBedspaceStatus,
    getAllPossibleHospitalIds,
    forceUpdateAllHospitals,
    reconnect: initializeWebSocket,
    testConnection,
    enableDebugMode,
    debugMode
  }
}