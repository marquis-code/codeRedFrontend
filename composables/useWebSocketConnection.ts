// import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
// import { io, Socket } from 'socket.io-client'
// import { useCustomToast } from '@/composables/core/useCustomToast'

// export interface BedspaceUpdate {
//   hospitalId: string
//   bedspace: {
//     _id: string
//     status: 'Available' | 'Unavailable' | 'Limited'
//     availableBeds: number
//     occupiedBeds: number
//     totalBeds: number
//     departmentName: string
//     location: string
//   }
//   timestamp: string
//   eventId: string
// }

// export interface EmergencyUpdate {
//   hospitalId: string
//   emergency: any
//   timestamp: string
//   eventId: string
// }

// export interface HospitalStatusUpdate {
//   hospitalId: string
//   status: string
//   timestamp: string
//   eventId: string
// }

// export function useWebSocketConnection() {
//   const { showToast } = useCustomToast()
//   const socket = ref<Socket | null>(null)
//   const isConnected = ref(false)
//   const connectionError = ref<string | null>(null)
//   const lastHeartbeat = ref<string | null>(null)
//   const subscribedHospitals = ref<Set<string>>(new Set())
//   const subscribedRegions = ref<Set<string>>(new Set())
  
//   // Use a non-reactive data store for the raw updates
//   const _bedspaceUpdatesStore = new Map<string, BedspaceUpdate>()
  
//   // Use shallowRef for better performance with large collections
//   const latestBedspaceUpdates = shallowRef<Map<string, BedspaceUpdate>>(new Map())
  
//   // Add an update counter to trigger reactivity without causing recursive updates
//   const updateCounter = ref(0)
  
//   const reconnectAttempts = ref(0)
//   const maxReconnectAttempts = 5
//   const reconnectInterval = ref(2000) // Start with 2 seconds
//   let reconnectTimer: NodeJS.Timeout | null = null
  
//   // Track if we've received any data
//   const hasReceivedData = ref(false)
  
//   // Debug mode
//   const debugMode = ref(false)
  
//   // Enable debug mode
//   const enableDebugMode = () => {
//     debugMode.value = true
//     console.log('WebSocket debug mode enabled')
//   }

//   // Safely update the bedspace data without causing recursive updates
//   const updateBedspaceData = (updates: Map<string, BedspaceUpdate> | Array<[string, BedspaceUpdate]>) => {
//     // Update the non-reactive store
//     if (updates instanceof Map) {
//       updates.forEach((update, id) => {
//         _bedspaceUpdatesStore.set(id, update)
//       })
//     } else {
//       updates.forEach(([id, update]) => {
//         _bedspaceUpdatesStore.set(id, update)
//       })
//     }
    
//     // Create a new Map to ensure reactivity
//     latestBedspaceUpdates.value = new Map(_bedspaceUpdatesStore)
    
//     // Increment counter to notify watchers
//     updateCounter.value++
//   }

//   // Update a single bedspace entry
//   const updateSingleBedspace = (id: string, update: BedspaceUpdate) => {
//     _bedspaceUpdatesStore.set(id, update)
//     updateBedspaceData(new Map()) // This will create a new Map from _bedspaceUpdatesStore
//   }

//   // Initialize WebSocket connection
//   const initializeWebSocket = () => {
//     try {
//       // Close existing connection if any
//       if (socket.value) {
//         socket.value.disconnect()
//       }

//       if (debugMode.value) console.log('Connecting to WebSocket server...')

//       // Connect to the WebSocket server
//       socket.value = io(import.meta.env.VITE_BASE_URL, {
//         transports: ['websocket', 'polling'],
//         reconnection: true,
//         reconnectionAttempts: 10,
//         reconnectionDelay: 1000,
//         reconnectionDelayMax: 5000,
//         timeout: 20000,
//         autoConnect: true,
//         forceNew: true // Force a new connection
//       })

//       // Connection event handlers
//       socket.value.on('connect', () => {
//         console.log('WebSocket connected successfully with ID:', socket.value?.id)
//         isConnected.value = true
//         connectionError.value = null
//         reconnectAttempts.value = 0
//         reconnectInterval.value = 2000
        
//         showToast({
//           title: 'Connected',
//           message: 'Real-time updates are now active',
//           toastType: 'success',
//           duration: 3000
//         })
        
//         // Resubscribe to previously subscribed hospitals and regions
//         resubscribeToAll()
//       })

//       socket.value.on('disconnect', (reason) => {
//         console.log(`WebSocket disconnected: ${reason}`)
//         isConnected.value = false
        
//         showToast({
//           title: 'Disconnected',
//           message: 'Connection to real-time updates lost. Reconnecting...',
//           toastType: 'warning',
//           duration: 5000
//         })
        
//         // If the server closed the connection, try to reconnect manually
//         if (reason === 'io server disconnect') {
//           attemptReconnect()
//         }
//       })

//       socket.value.on('connect_error', (error) => {
//         console.error('WebSocket connection error:', error)
//         connectionError.value = error.message
//         isConnected.value = false
        
//         if (reconnectAttempts.value < maxReconnectAttempts) {
//           attemptReconnect()
//         } else {
//           showToast({
//             title: 'Connection Failed',
//             message: 'Unable to connect to real-time updates. Please refresh the page.',
//             toastType: 'error',
//             duration: 8000
//           })
//         }
//       })

//       // Heartbeat to keep connection alive and detect disconnections
//       socket.value.on('heartbeat', (data) => {
//         if (debugMode.value) console.log('Heartbeat received:', data)
//         lastHeartbeat.value = data.timestamp
//         socket.value?.emit('heartbeat_response')
//       })

//       // Event listeners for bedspace updates
//       socket.value.on('bedspace_updated', (data: BedspaceUpdate) => {
//         console.log('Bedspace update received:', data)
//         hasReceivedData.value = true
        
//         if (data && data.bedspace && data.bedspace._id) {
//           // Use the safe update method
//           updateSingleBedspace(data.bedspace._id, data)
          
//           showToast({
//             title: 'Bedspace Update',
//             message: `${data.bedspace.departmentName} now has ${data.bedspace.availableBeds} available beds`,
//             toastType: data.bedspace.status === 'Available' ? 'success' : 'warning',
//             duration: 5000
//           })
//         } else {
//           console.error('Received invalid bedspace update data:', data)
//         }
//       })

//       // Also listen for the hospital_bedspace_updated event (used for regional subscribers)
//       socket.value.on('hospital_bedspace_updated', (data: BedspaceUpdate) => {
//         console.log('Hospital bedspace update received (regional):', data)
//         hasReceivedData.value = true
        
//         if (data && data.bedspace && data.bedspace._id) {
//           // Use the safe update method
//           updateSingleBedspace(data.bedspace._id, data)
          
//           showToast({
//             title: 'Regional Bedspace Update',
//             message: `${data.bedspace.departmentName} now has ${data.bedspace.availableBeds} available beds`,
//             toastType: data.bedspace.status === 'Available' ? 'success' : 'warning',
//             duration: 5000
//           })
//         } else {
//           console.error('Received invalid regional bedspace update data:', data)
//         }
//       })

//       socket.value.on('emergency_created', (data: EmergencyUpdate) => {
//         console.log('Emergency update received:', data)
//         hasReceivedData.value = true
        
//         showToast({
//           title: 'Emergency Alert',
//           message: 'A new emergency has been registered at this hospital',
//           toastType: 'error',
//           duration: 8000
//         })
//       })

//       socket.value.on('hospital_status_changed', (data: HospitalStatusUpdate) => {
//         console.log('Hospital status changed:', data)
//         hasReceivedData.value = true
        
//         showToast({
//           title: 'Hospital Status Update',
//           message: `Hospital status changed to: ${data.status}`,
//           toastType: data.status.toLowerCase() === 'available' ? 'success' : 'warning',
//           duration: 5000
//         })
//       })

//       socket.value.on('initial_bedspace_data', (data) => {
//         console.log('Initial bedspace data received:', data)
//         hasReceivedData.value = true
        
//         // Store each bedspace update
//         if (data.bedspaces && Array.isArray(data.bedspaces)) {
//           console.log(`Processing ${data.bedspaces.length} bedspaces for hospital ${data.hospitalId}`)
          
//           // Create a batch of updates to apply at once
//           const batchUpdates = new Map<string, BedspaceUpdate>()
          
//           data.bedspaces.forEach((bedspace) => {
//             if (bedspace && bedspace._id) {
//               batchUpdates.set(bedspace._id, {
//                 hospitalId: data.hospitalId,
//                 bedspace,
//                 timestamp: data.timestamp || new Date().toISOString(),
//                 eventId: `initial_${bedspace._id}`
//               })
//             } else {
//               console.error('Received invalid bedspace in initial data:', bedspace)
//             }
//           })
          
//           // Apply all updates at once
//           updateBedspaceData(batchUpdates)
          
//         } else {
//           console.log('No bedspaces in initial data or invalid format:', data)
//         }
//       })

//       socket.value.on('connection_status', (data) => {
//         console.log('Connection status:', data)
//       })

//       // Add a catch-all event listener for debugging
//       socket.value.onAny((eventName, ...args) => {
//         if (debugMode.value) console.log(`Event received: ${eventName}`, args)
//       })

//       // Error handling
//       socket.value.on('error', (error) => {
//         console.error('WebSocket error:', error)
//         connectionError.value = error.message || 'Unknown error occurred'
        
//         showToast({
//           title: 'Connection Error',
//           message: 'An error occurred with the real-time connection',
//           toastType: 'error',
//           duration: 5000
//         })
//       })

//       // Set up a ping interval to keep the connection alive
//       const pingInterval = setInterval(() => {
//         if (socket.value && isConnected.value) {
//           if (debugMode.value) console.log('Sending ping...')
//           socket.value.emit('ping', { timestamp: new Date().toISOString() })
//         }
//       }, 25000) // Every 25 seconds
      
//       // Store interval for cleanup
//       socket.value.pingInterval = pingInterval

//     } catch (error) {
//       console.error('Error initializing WebSocket:', error)
//       connectionError.value = error instanceof Error ? error.message : 'Unknown error'
//     }
//   }

//   // Manual reconnection logic with exponential backoff
//   const attemptReconnect = () => {
//     if (reconnectTimer) {
//       clearTimeout(reconnectTimer)
//     }
    
//     reconnectAttempts.value++
    
//     // Exponential backoff
//     const delay = Math.min(reconnectInterval.value * Math.pow(1.5, reconnectAttempts.value - 1), 30000)
    
//     console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.value})`)
    
//     reconnectTimer = setTimeout(() => {
//       console.log(`Reconnecting... (attempt ${reconnectAttempts.value})`)
//       initializeWebSocket()
//     }, delay)
//   }

//   // Subscribe to a specific hospital's updates
//   const subscribeToHospital = (hospitalId: string) => {
//     if (!socket.value || !isConnected.value) {
//       console.warn('Cannot subscribe: WebSocket not connected')
//       return false
//     }
    
//     if (!hospitalId) {
//       console.error('Cannot subscribe: Invalid hospital ID')
//       return false
//     }
    
//     console.log(`Subscribing to hospital: ${hospitalId}`)
    
//     socket.value.emit('subscribe_hospital', { hospitalId }, (response) => {
//       if (response && response.success) {
//         subscribedHospitals.value.add(hospitalId)
//         console.log(`Successfully subscribed to hospital ${hospitalId}`, response)
//       } else {
//         console.error('Failed to subscribe to hospital:', response)
//       }
//     })
    
//     return true
//   }

//   // Unsubscribe from a hospital's updates
//   const unsubscribeFromHospital = (hospitalId: string) => {
//     if (!socket.value || !isConnected.value) {
//       console.warn('Cannot unsubscribe: WebSocket not connected')
//       return false
//     }
    
//     if (!hospitalId) {
//       console.error('Cannot unsubscribe: Invalid hospital ID')
//       return false
//     }
    
//     console.log(`Unsubscribing from hospital: ${hospitalId}`)
    
//     socket.value.emit('unsubscribe_hospital', { hospitalId }, (response) => {
//       if (response && response.success) {
//         subscribedHospitals.value.delete(hospitalId)
//         console.log(`Successfully unsubscribed from hospital ${hospitalId}`)
//       } else {
//         console.error('Failed to unsubscribe from hospital:', response)
//       }
//     })
    
//     return true
//   }

//   // Subscribe to a geographic region for updates
//   const subscribeToRegion = (latitude: number, longitude: number, radius: number) => {
//     if (!socket.value || !isConnected.value) {
//       console.warn('Cannot subscribe to region: WebSocket not connected')
//       return false
//     }
    
//     if (latitude === undefined || longitude === undefined || radius === undefined) {
//       console.error('Cannot subscribe to region: Invalid coordinates or radius')
//       return false
//     }
    
//     const regionKey = `region:${latitude.toFixed(2)}:${longitude.toFixed(2)}:${radius}`
//     console.log(`Subscribing to region: ${regionKey}`)
    
//     socket.value.emit('subscribe_region', { latitude, longitude, radius }, (response) => {
//       if (response && response.success) {
//         subscribedRegions.value.add(regionKey)
//         console.log(`Successfully subscribed to region ${regionKey}`)
//       } else {
//         console.error('Failed to subscribe to region:', response)
//       }
//     })
    
//     return true
//   }

//   // Resubscribe to all previously subscribed entities after reconnection
//   const resubscribeToAll = () => {
//     console.log('Resubscribing to all previous subscriptions')
    
//     // Resubscribe to hospitals
//     subscribedHospitals.value.forEach(hospitalId => {
//       subscribeToHospital(hospitalId)
//     })
    
//     // Resubscribe to regions
//     subscribedRegions.value.forEach(regionKey => {
//       const [, latStr, lngStr, radiusStr] = regionKey.split(':')
//       if (latStr && lngStr && radiusStr) {
//         subscribeToRegion(parseFloat(latStr), parseFloat(lngStr), parseFloat(radiusStr))
//       }
//     })
//   }

//   // Get all possible IDs for a hospital
//   const getAllPossibleHospitalIds = (hospital: any): string[] => {
//     const ids = [];
    
//     if (hospital._id) ids.push(hospital._id);
//     if (hospital.id) ids.push(hospital.id);
//     if (hospital.place_id) ids.push(hospital.place_id);
//     if (hospital.placeId) ids.push(hospital.placeId);
    
//     return ids;
//   }

//   // Get the latest bedspace status for a hospital
//   const getHospitalBedspaceStatus = (hospital: any) => {
//     if (!hospital) {
//       console.error('Cannot get bedspace status: Invalid hospital object')
//       return null
//     }
    
//     // Try all possible ID fields
//     const possibleIds = getAllPossibleHospitalIds(hospital);
    
//     if (possibleIds.length === 0) {
//       console.error('Cannot get bedspace status: No valid hospital ID found', hospital)
//       return null
//     }
    
//     // Find all bedspaces for this hospital using any of the possible IDs
//     const bedspaces = Array.from(latestBedspaceUpdates.value.values())
//       .filter(update => possibleIds.includes(update.hospitalId))
    
//     if (bedspaces.length === 0) {
//       if (debugMode.value) console.log(`No bedspace updates found for hospital IDs: ${possibleIds.join(', ')}`)
//       return null
//     }
    
//     console.log(`Found ${bedspaces.length} bedspace updates for hospital`)
    
//     // Calculate total available and occupied beds
//     const totalAvailable = bedspaces.reduce((sum, update) => sum + update.bedspace.availableBeds, 0)
//     const totalOccupied = bedspaces.reduce((sum, update) => sum + update.bedspace.occupiedBeds, 0)
//     const totalBeds = bedspaces.reduce((sum, update) => sum + update.bedspace.totalBeds, 0)
    
//     // Determine overall status
//     let overallStatus = 'Unavailable'
//     if (totalAvailable > 0) {
//       overallStatus = totalAvailable < totalBeds * 0.2 ? 'Limited' : 'Available'
//     }
    
//     return {
//       hospitalId: possibleIds[0], // Use the first valid ID
//       overallStatus,
//       totalAvailableBeds: totalAvailable,
//       totalOccupiedBeds: totalOccupied,
//       totalBedCount: totalBeds,
//       bedspaces: bedspaces.map(update => update.bedspace),
//       lastUpdated: new Date().toISOString()
//     }
//   }

//   // Manually trigger a test to check if the connection is working
//   const testConnection = () => {
//     if (!socket.value || !isConnected.value) {
//       console.warn('Cannot test connection: WebSocket not connected')
//       return false
//     }
    
//     console.log('Testing WebSocket connection...')
//     socket.value.emit('ping', { timestamp: new Date().toISOString() })
//     return true
//   }
  
//   // Force update all hospitals with current bedspace data
//   const forceUpdateAllHospitals = (hospitals: any[]) => {
//     console.log('Forcing update of all hospitals with current bedspace data')
    
//     // Create a new array to avoid mutating the original
//     return hospitals.map(hospital => {
//       const bedspaceStatus = getHospitalBedspaceStatus(hospital)
      
//       if (bedspaceStatus) {
//         return {
//           ...hospital,
//           totalAvailableBeds: bedspaceStatus.totalAvailableBeds,
//           totalBedCount: bedspaceStatus.totalBedCount,
//           overallBedStatus: bedspaceStatus.overallStatus,
//           bedspaces: bedspaceStatus.bedspaces,
//           // Map the status to the format expected by the UI
//           availability: bedspaceStatus.overallStatus.toLowerCase() === 'available' 
//             ? 'available' 
//             : bedspaceStatus.overallStatus.toLowerCase() === 'limited' 
//               ? 'busy' 
//               : 'unavailable'
//         }
//       }
      
//       return hospital
//     })
//   }

//   // Lifecycle hooks
//   onMounted(() => {
//     console.log('Mounting WebSocket connection')
//     initializeWebSocket()
//   })

//   onUnmounted(() => {
//     console.log('Unmounting WebSocket connection')
//     if (socket.value) {
//       // Clear ping interval
//       if (socket.value.pingInterval) {
//         clearInterval(socket.value.pingInterval)
//       }
      
//       socket.value.disconnect()
//     }
    
//     if (reconnectTimer) {
//       clearTimeout(reconnectTimer)
//     }
//   })

//   return {
//     socket,
//     isConnected,
//     connectionError,
//     lastHeartbeat,
//     subscribedHospitals,
//     subscribedRegions,
//     latestBedspaceUpdates,
//     hasReceivedData,
//     subscribeToHospital,
//     unsubscribeFromHospital,
//     subscribeToRegion,
//     getHospitalBedspaceStatus,
//     getAllPossibleHospitalIds,
//     forceUpdateAllHospitals,
//     reconnect: initializeWebSocket,
//     testConnection,
//     enableDebugMode,
//     debugMode,
//     // Export the update counter for components that need to watch for changes
//     updateCounter
//   }
// }

import { ref, onMounted, onUnmounted, shallowRef } from "vue"
import { io, type Socket } from "socket.io-client"
import { useCustomToast } from "@/composables/core/useCustomToast"

export interface BedspaceUpdate {
  hospitalId: string
  bedspace: {
    _id: string
    status: "Available" | "Unavailable" | "Limited"
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

// NEW: Hospital Click Interfaces
export interface HospitalClickData {
  hospitalId: string
  latitude: number
  longitude: number
  userAgent?: string
}

export interface HospitalClickResponse {
  success: boolean
  clickCount: number
  surgeTriggered: boolean
  message: string
  isValidLocation: boolean
  distanceFromHospital: number
  sessionId: string
  timestamp: string
}

export interface HospitalClickStats {
  hospitalId: string
  currentClickCount: number
  totalSurgesTriggered: number
  totalValidClicks: number
  totalInvalidClicks: number
  status: string
  lastClickTime: string | null
  lastSurgeTime: string | null
  timestamp: string
}

export interface SurgeTriggeredEvent {
  hospitalId: string
  clickCount: number
  surgeTriggered: boolean
  message: string
  surgeData?: any
  timestamp: string
  eventType: string
}

export function useWebSocketConnection() {
  const { showToast } = useCustomToast()
  const socket = ref<Socket | null>(null)
  const isConnected = ref(false)
  const connectionError = ref<string | null>(null)
  const lastHeartbeat = ref<string | null>(null)
  const subscribedHospitals = ref<Set<string>>(new Set())
  const subscribedRegions = ref<Set<string>>(new Set())

  // Use a non-reactive data store for the raw updates
  const _bedspaceUpdatesStore = new Map<string, BedspaceUpdate>()

  // Use shallowRef for better performance with large collections
  const latestBedspaceUpdates = shallowRef<Map<string, BedspaceUpdate>>(new Map())

  // NEW: Hospital Click State
  const hospitalClickStats = ref<Map<string, HospitalClickStats>>(new Map())
  const lastClickResponse = ref<HospitalClickResponse | null>(null)
  const clickInProgress = ref(false)
  const surgeEvents = ref<SurgeTriggeredEvent[]>([])

  // Add an update counter to trigger reactivity without causing recursive updates
  const updateCounter = ref(0)

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
    console.log("🐛 WebSocket debug mode enabled")
  }

  // Safely update the bedspace data without causing recursive updates
  const updateBedspaceData = (updates: Map<string, BedspaceUpdate> | Array<[string, BedspaceUpdate]>) => {
    // Update the non-reactive store
    if (updates instanceof Map) {
      updates.forEach((update, id) => {
        _bedspaceUpdatesStore.set(id, update)
      })
    } else {
      updates.forEach(([id, update]) => {
        _bedspaceUpdatesStore.set(id, update)
      })
    }

    // Create a new Map to ensure reactivity
    latestBedspaceUpdates.value = new Map(_bedspaceUpdatesStore)

    // Increment counter to notify watchers
    updateCounter.value++
  }

  // Update a single bedspace entry
  const updateSingleBedspace = (id: string, update: BedspaceUpdate) => {
    _bedspaceUpdatesStore.set(id, update)
    updateBedspaceData(new Map()) // This will create a new Map from _bedspaceUpdatesStore
  }

  // NEW: Hospital Click Functions
  const sendHospitalClick = async (
    hospitalId: string,
    userLocation: { lat: number; lng: number },
  ): Promise<HospitalClickResponse> => {
    return new Promise((resolve, reject) => {
      if (!socket.value || !isConnected.value) {
        const error = "WebSocket not connected"
        console.error("❌ Cannot send hospital click:", error)
        reject(new Error(error))
        return
      }

      if (!hospitalId || !userLocation.lat || !userLocation.lng) {
        const error = "Missing required data: hospitalId, latitude, or longitude"
        console.error("❌ Cannot send hospital click:", error)
        reject(new Error(error))
        return
      }

      clickInProgress.value = true
      console.log("🖱️ Sending hospital click:", {
        hospitalId,
        location: userLocation,
        timestamp: new Date().toISOString(),
      })

      const clickData: HospitalClickData = {
        hospitalId,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        userAgent: navigator.userAgent,
      }

      // Send the hospital click event
      socket.value.emit("hospital-click", clickData, (response: HospitalClickResponse) => {
        clickInProgress.value = false

        if (response.success) {
          console.log("✅ Hospital click successful:", response)
          lastClickResponse.value = response

          // Show appropriate toast based on response
          if (response.surgeTriggered) {
            showToast({
              title: "🚨 Surge Triggered!",
              message: response.message,
              toastType: "error",
              duration: 8000,
            })
          } else if (response.isValidLocation) {
            showToast({
              title: "✅ Click Registered",
              message: response.message,
              toastType: "success",
              duration: 5000,
            })
          } else {
            showToast({
              title: "❌ Invalid Location",
              message: response.message,
              toastType: "warning",
              duration: 6000,
            })
          }

          resolve(response)
        } else {
          console.error("❌ Hospital click failed:", response)
          reject(new Error(response.message || "Hospital click failed"))
        }
      })

      // Set a timeout for the response
      setTimeout(() => {
        if (clickInProgress.value) {
          clickInProgress.value = false
          const error = "Hospital click timeout"
          console.error("⏰ Hospital click timeout")
          reject(new Error(error))
        }
      }, 10000) // 10 second timeout
    })
  }

  // NEW: Get Hospital Click Statistics
  const getHospitalClickStats = (hospitalId: string): Promise<HospitalClickStats> => {
    return new Promise((resolve, reject) => {
      if (!socket.value || !isConnected.value) {
        reject(new Error("WebSocket not connected"))
        return
      }

      console.log("📊 Requesting click stats for hospital:", hospitalId)

      socket.value.emit("get-hospital-click-stats", { hospitalId }, (response) => {
        if (response.success) {
          console.log("📊 Hospital click stats received:", response.stats)
          hospitalClickStats.value.set(hospitalId, response.stats)
          resolve(response.stats)
        } else {
          console.error("❌ Failed to get hospital click stats:", response.error)
          reject(new Error(response.error))
        }
      })
    })
  }

  // NEW: Subscribe to Hospital Clicks
  const subscribeToHospitalClicks = (hospitalId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!socket.value || !isConnected.value) {
        reject(new Error("WebSocket not connected"))
        return
      }

      console.log("🔔 Subscribing to hospital clicks:", hospitalId)

      socket.value.emit("subscribe_hospital_clicks", { hospitalId }, (response) => {
        if (response.success) {
          console.log("✅ Successfully subscribed to hospital clicks:", hospitalId)
          subscribedHospitals.value.add(`${hospitalId}:clicks`)
          resolve(true)
        } else {
          console.error("❌ Failed to subscribe to hospital clicks:", response.message)
          reject(new Error(response.message))
        }
      })
    })
  }

  // Initialize WebSocket connection
  const initializeWebSocket = () => {
    try {
      // Close existing connection if any
      if (socket.value) {
        socket.value.disconnect()
      }

      if (debugMode.value) console.log("🔌 Connecting to WebSocket server...")

      // Connect to the WebSocket server
      socket.value = io(import.meta.env.VITE_BASE_URL || "http://localhost:3000", {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        autoConnect: true,
        forceNew: true, // Force a new connection
      })

      // Connection event handlers
      socket.value.on("connect", () => {
        console.log("🔗 WebSocket connected successfully with ID:", socket.value?.id)
        isConnected.value = true
        connectionError.value = null
        reconnectAttempts.value = 0
        reconnectInterval.value = 2000

        showToast({
          title: "Connected",
          message: "Real-time updates are now active",
          toastType: "success",
          duration: 3000,
        })

        // Resubscribe to previously subscribed hospitals and regions
        resubscribeToAll()
      })

      socket.value.on("disconnect", (reason) => {
        console.log(`💔 WebSocket disconnected: ${reason}`)
        isConnected.value = false

        showToast({
          title: "Disconnected",
          message: "Connection to real-time updates lost. Reconnecting...",
          toastType: "warning",
          duration: 5000,
        })

        // If the server closed the connection, try to reconnect manually
        if (reason === "io server disconnect") {
          attemptReconnect()
        }
      })

      socket.value.on("connect_error", (error) => {
        console.error("❌ WebSocket connection error:", error)
        connectionError.value = error.message
        isConnected.value = false

        if (reconnectAttempts.value < maxReconnectAttempts) {
          attemptReconnect()
        } else {
          showToast({
            title: "Connection Failed",
            message: "Unable to connect to real-time updates. Please refresh the page.",
            toastType: "error",
            duration: 8000,
          })
        }
      })

      // Heartbeat to keep connection alive and detect disconnections
      socket.value.on("heartbeat", (data) => {
        if (debugMode.value) console.log("💓 Heartbeat received:", data)
        lastHeartbeat.value = data.timestamp
        socket.value?.emit("heartbeat_response")
      })

      // NEW: Hospital Click Event Listeners
      socket.value.on("hospital-click-response", (data: HospitalClickResponse) => {
        console.log("🖱️ Hospital click response received:", data)
        lastClickResponse.value = data
        hasReceivedData.value = true
      })

      socket.value.on("click-count-updated", (data) => {
        console.log("🔢 Click count updated:", data)
        hasReceivedData.value = true

        showToast({
          title: "Click Count Updated",
          message: `Hospital now has ${data.clickCount} clicks`,
          toastType: data.surgeTriggered ? "error" : "info",
          duration: 4000,
        })
      })

      socket.value.on("hospital-click-processed", (data) => {
        console.log("✅ Hospital click processed:", data)
        hasReceivedData.value = true
      })

      socket.value.on("location-validated-surge-triggered", (data: SurgeTriggeredEvent) => {
        console.log("🚨 LOCATION-VALIDATED SURGE TRIGGERED:", data)
        surgeEvents.value.push(data)
        hasReceivedData.value = true

        showToast({
          title: "🚨 SURGE ALERT!",
          message: `Location-validated surge triggered at hospital!`,
          toastType: "error",
          duration: 10000,
        })
      })

      socket.value.on("hospital-click-threshold-reached", (data) => {
        console.log("🎯 Hospital click threshold reached:", data)
        surgeEvents.value.push(data)
        hasReceivedData.value = true

        showToast({
          title: "🎯 Threshold Reached!",
          message: data.message,
          toastType: "error",
          duration: 8000,
        })
      })

      socket.value.on("hospital-clicks-data", (data: HospitalClickStats) => {
        console.log("📊 Hospital clicks data received:", data)
        hospitalClickStats.value.set(data.hospitalId, data)
        hasReceivedData.value = true
      })

      socket.value.on("hospital-click-stats", (data: HospitalClickStats) => {
        console.log("📈 Hospital click stats received:", data)
        hospitalClickStats.value.set(data.hospitalId, data)
        hasReceivedData.value = true
      })

      socket.value.on("hospital-click-error", (data) => {
        console.error("❌ Hospital click error:", data)
        showToast({
          title: "Click Error",
          message: data.error || "An error occurred while processing your click",
          toastType: "error",
          duration: 5000,
        })
      })

      socket.value.on("hospital-clicks-subscription-confirmed", (data) => {
        console.log("✅ Hospital clicks subscription confirmed:", data)
      })

      // Event listeners for bedspace updates
      socket.value.on("bedspace_updated", (data: BedspaceUpdate) => {
        console.log("🛏️ Bedspace update received:", data)
        hasReceivedData.value = true

        if (data && data.bedspace && data.bedspace._id) {
          // Use the safe update method
          updateSingleBedspace(data.bedspace._id, data)

          showToast({
            title: "Bedspace Update",
            message: `${data.bedspace.departmentName} now has ${data.bedspace.availableBeds} available beds`,
            toastType: data.bedspace.status === "Available" ? "success" : "warning",
            duration: 5000,
          })
        } else {
          console.error("❌ Received invalid bedspace update data:", data)
        }
      })

      // Also listen for the hospital_bedspace_updated event (used for regional subscribers)
      socket.value.on("hospital_bedspace_updated", (data: BedspaceUpdate) => {
        console.log("🏥 Hospital bedspace update received (regional):", data)
        hasReceivedData.value = true

        if (data && data.bedspace && data.bedspace._id) {
          // Use the safe update method
          updateSingleBedspace(data.bedspace._id, data)

          showToast({
            title: "Regional Bedspace Update",
            message: `${data.bedspace.departmentName} now has ${data.bedspace.availableBeds} available beds`,
            toastType: data.bedspace.status === "Available" ? "success" : "warning",
            duration: 5000,
          })
        } else {
          console.error("❌ Received invalid regional bedspace update data:", data)
        }
      })

      socket.value.on("emergency_created", (data: EmergencyUpdate) => {
        console.log("🚨 Emergency update received:", data)
        hasReceivedData.value = true

        showToast({
          title: "Emergency Alert",
          message: "A new emergency has been registered at this hospital",
          toastType: "error",
          duration: 8000,
        })
      })

      socket.value.on("hospital_status_changed", (data: HospitalStatusUpdate) => {
        console.log("🏥 Hospital status changed:", data)
        hasReceivedData.value = true

        showToast({
          title: "Hospital Status Update",
          message: `Hospital status changed to: ${data.status}`,
          toastType: data.status.toLowerCase() === "available" ? "success" : "warning",
          duration: 5000,
        })
      })

      socket.value.on("initial_bedspace_data", (data) => {
        console.log("📊 Initial bedspace data received:", data)
        hasReceivedData.value = true

        // Store each bedspace update
        if (data.bedspaces && Array.isArray(data.bedspaces)) {
          console.log(`📊 Processing ${data.bedspaces.length} bedspaces for hospital ${data.hospitalId}`)

          // Create a batch of updates to apply at once
          const batchUpdates = new Map<string, BedspaceUpdate>()

          data.bedspaces.forEach((bedspace) => {
            if (bedspace && bedspace._id) {
              batchUpdates.set(bedspace._id, {
                hospitalId: data.hospitalId,
                bedspace,
                timestamp: data.timestamp || new Date().toISOString(),
                eventId: `initial_${bedspace._id}`,
              })
            } else {
              console.error("❌ Received invalid bedspace in initial data:", bedspace)
            }
          })

          // Apply all updates at once
          updateBedspaceData(batchUpdates)
        } else {
          console.log("📭 No bedspaces in initial data or invalid format:", data)
        }
      })

      socket.value.on("connection_status", (data) => {
        console.log("🔗 Connection status:", data)
      })

      // Add a catch-all event listener for debugging
      socket.value.onAny((eventName, ...args) => {
        if (debugMode.value) console.log(`📡 Event received: ${eventName}`, args)
      })

      // Error handling
      socket.value.on("error", (error) => {
        console.error("❌ WebSocket error:", error)
        connectionError.value = error.message || "Unknown error occurred"

        showToast({
          title: "Connection Error",
          message: "An error occurred with the real-time connection",
          toastType: "error",
          duration: 5000,
        })
      })

      // Set up a ping interval to keep the connection alive
      const pingInterval = setInterval(() => {
        if (socket.value && isConnected.value) {
          if (debugMode.value) console.log("🏓 Sending ping...")
          socket.value.emit("ping", { timestamp: new Date().toISOString() })
        }
      }, 25000) // Every 25 seconds

      // Store interval for cleanup
      socket.value.pingInterval = pingInterval
    } catch (error) {
      console.error("❌ Error initializing WebSocket:", error)
      connectionError.value = error instanceof Error ? error.message : "Unknown error"
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

    console.log(`🔄 Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.value})`)

    reconnectTimer = setTimeout(() => {
      console.log(`🔄 Reconnecting... (attempt ${reconnectAttempts.value})`)
      initializeWebSocket()
    }, delay)
  }

  // Subscribe to a specific hospital's updates
  const subscribeToHospital = (hospitalId: string) => {
    if (!socket.value || !isConnected.value) {
      console.warn("⚠️ Cannot subscribe: WebSocket not connected")
      return false
    }

    if (!hospitalId) {
      console.error("❌ Cannot subscribe: Invalid hospital ID")
      return false
    }

    console.log(`🔔 Subscribing to hospital: ${hospitalId}`)

    socket.value.emit("subscribe_hospital", { hospitalId }, (response) => {
      if (response && response.success) {
        subscribedHospitals.value.add(hospitalId)
        console.log(`✅ Successfully subscribed to hospital ${hospitalId}`, response)
      } else {
        console.error("❌ Failed to subscribe to hospital:", response)
      }
    })

    return true
  }

  // Unsubscribe from a hospital's updates
  const unsubscribeFromHospital = (hospitalId: string) => {
    if (!socket.value || !isConnected.value) {
      console.warn("⚠️ Cannot unsubscribe: WebSocket not connected")
      return false
    }

    if (!hospitalId) {
      console.error("❌ Cannot unsubscribe: Invalid hospital ID")
      return false
    }

    console.log(`🔕 Unsubscribing from hospital: ${hospitalId}`)

    socket.value.emit("unsubscribe_hospital", { hospitalId }, (response) => {
      if (response && response.success) {
        subscribedHospitals.value.delete(hospitalId)
        console.log(`✅ Successfully unsubscribed from hospital ${hospitalId}`)
      } else {
        console.error("❌ Failed to unsubscribe from hospital:", response)
      }
    })

    return true
  }

  // Subscribe to a geographic region for updates
  const subscribeToRegion = (latitude: number, longitude: number, radius: number) => {
    if (!socket.value || !isConnected.value) {
      console.warn("⚠️ Cannot subscribe to region: WebSocket not connected")
      return false
    }

    if (latitude === undefined || longitude === undefined || radius === undefined) {
      console.error("❌ Cannot subscribe to region: Invalid coordinates or radius")
      return false
    }

    const regionKey = `region:${latitude.toFixed(2)}:${longitude.toFixed(2)}:${radius}`
    console.log(`🌍 Subscribing to region: ${regionKey}`)

    socket.value.emit("subscribe_region", { latitude, longitude, radius }, (response) => {
      if (response && response.success) {
        subscribedRegions.value.add(regionKey)
        console.log(`✅ Successfully subscribed to region ${regionKey}`)
      } else {
        console.error("❌ Failed to subscribe to region:", response)
      }
    })

    return true
  }

  // Resubscribe to all previously subscribed entities after reconnection
  const resubscribeToAll = () => {
    console.log("🔄 Resubscribing to all previous subscriptions")

    // Resubscribe to hospitals
    subscribedHospitals.value.forEach((hospitalId) => {
      if (hospitalId.includes(":clicks")) {
        const actualHospitalId = hospitalId.replace(":clicks", "")
        subscribeToHospitalClicks(actualHospitalId)
      } else {
        subscribeToHospital(hospitalId)
      }
    })

    // Resubscribe to regions
    subscribedRegions.value.forEach((regionKey) => {
      const [, latStr, lngStr, radiusStr] = regionKey.split(":")
      if (latStr && lngStr && radiusStr) {
        subscribeToRegion(Number.parseFloat(latStr), Number.parseFloat(lngStr), Number.parseFloat(radiusStr))
      }
    })
  }

  // Get all possible IDs for a hospital
  const getAllPossibleHospitalIds = (hospital: any): string[] => {
    const ids = []

    if (hospital._id) ids.push(hospital._id)
    if (hospital.id) ids.push(hospital.id)
    if (hospital.place_id) ids.push(hospital.place_id)
    if (hospital.placeId) ids.push(hospital.placeId)

    return ids
  }

  // Get the latest bedspace status for a hospital
  const getHospitalBedspaceStatus = (hospital: any) => {
    if (!hospital) {
      console.error("❌ Cannot get bedspace status: Invalid hospital object")
      return null
    }

    // Try all possible ID fields
    const possibleIds = getAllPossibleHospitalIds(hospital)

    if (possibleIds.length === 0) {
      console.error("❌ Cannot get bedspace status: No valid hospital ID found", hospital)
      return null
    }

    // Find all bedspaces for this hospital using any of the possible IDs
    const bedspaces = Array.from(latestBedspaceUpdates.value.values()).filter((update) =>
      possibleIds.includes(update.hospitalId),
    )

    if (bedspaces.length === 0) {
      if (debugMode.value) console.log(`📭 No bedspace updates found for hospital IDs: ${possibleIds.join(", ")}`)
      return null
    }

    console.log(`📊 Found ${bedspaces.length} bedspace updates for hospital`)

    // Calculate total available and occupied beds
    const totalAvailable = bedspaces.reduce((sum, update) => sum + update.bedspace.availableBeds, 0)
    const totalOccupied = bedspaces.reduce((sum, update) => sum + update.bedspace.occupiedBeds, 0)
    const totalBeds = bedspaces.reduce((sum, update) => sum + update.bedspace.totalBeds, 0)

    // Determine overall status
    let overallStatus = "Unavailable"
    if (totalAvailable > 0) {
      overallStatus = totalAvailable < totalBeds * 0.2 ? "Limited" : "Available"
    }

    return {
      hospitalId: possibleIds[0], // Use the first valid ID
      overallStatus,
      totalAvailableBeds: totalAvailable,
      totalOccupiedBeds: totalOccupied,
      totalBedCount: totalBeds,
      bedspaces: bedspaces.map((update) => update.bedspace),
      lastUpdated: new Date().toISOString(),
    }
  }

  // Manually trigger a test to check if the connection is working
  const testConnection = () => {
    if (!socket.value || !isConnected.value) {
      console.warn("⚠️ Cannot test connection: WebSocket not connected")
      return false
    }

    console.log("🧪 Testing WebSocket connection...")
    socket.value.emit("ping", { timestamp: new Date().toISOString() })
    return true
  }

  // Force update all hospitals with current bedspace data
  const forceUpdateAllHospitals = (hospitals: any[]) => {
    console.log("🔄 Forcing update of all hospitals with current bedspace data")

    // Create a new array to avoid mutating the original
    return hospitals.map((hospital) => {
      const bedspaceStatus = getHospitalBedspaceStatus(hospital)

      if (bedspaceStatus) {
        return {
          ...hospital,
          totalAvailableBeds: bedspaceStatus.totalAvailableBeds,
          totalBedCount: bedspaceStatus.totalBedCount,
          overallBedStatus: bedspaceStatus.overallStatus,
          bedspaces: bedspaceStatus.bedspaces,
          // Map the status to the format expected by the UI
          availability:
            bedspaceStatus.overallStatus.toLowerCase() === "available"
              ? "available"
              : bedspaceStatus.overallStatus.toLowerCase() === "limited"
                ? "busy"
                : "unavailable",
        }
      }

      return hospital
    })
  }

  // Lifecycle hooks
  onMounted(() => {
    console.log("🚀 Mounting WebSocket connection")
    initializeWebSocket()
  })

  onUnmounted(() => {
    console.log("🛑 Unmounting WebSocket connection")
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

    // NEW: Hospital Click functionality
    hospitalClickStats,
    lastClickResponse,
    clickInProgress,
    surgeEvents,
    sendHospitalClick,
    getHospitalClickStats,
    subscribeToHospitalClicks,

    // Existing functionality
    subscribeToHospital,
    unsubscribeFromHospital,
    subscribeToRegion,
    getHospitalBedspaceStatus,
    getAllPossibleHospitalIds,
    forceUpdateAllHospitals,
    reconnect: initializeWebSocket,
    testConnection,
    enableDebugMode,
    debugMode,
    // Export the update counter for components that need to watch for changes
    updateCounter,
  }
}
