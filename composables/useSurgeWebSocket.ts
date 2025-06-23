// import { ref, onMounted, onUnmounted, watch } from 'vue'
// import { io, Socket } from 'socket.io-client'
// import { useRoute } from 'vue-router'

// export interface SurgePayload {
//   hospitalId: string
//   latitude: number
//   longitude: number
//   address?: string
//   emergencyType?: string
//   description?: string
//   metadata?: Record<string, any>
// }

// export interface SurgeResponse {
//   success: boolean
//   message: string
//   surge?: any
//   timestamp: string
// }

// export interface LocationData {
//   latitude: number
//   longitude: number
//   address?: string
//   accuracy?: number
//   timestamp: number
// }

// export const useSurgeWebSocket = () => {
//   const socket = ref<Socket | null>(null)
//   const isConnected = ref(false)
//   const connectionError = ref<string | null>(null)
//   const lastEvent = ref<any>(null)
//   const subscribedHospitals = ref<Set<string>>(new Set())
//   const surgeEvents = ref<any[]>([])

//   // Connection status
//   const connecting = ref(false)
//   const reconnectAttempts = ref(0)
//   const maxReconnectAttempts = 5

//   // Location data
//   const location = ref<LocationData | null>(null)
//   const locationLoading = ref(false)
//   const locationError = ref<{ code: number; message: string } | null>(null)

//   // Surge creation status
//   const surgeCreated = ref(false)
//   const creatingSurge = ref(false)
//   const surgeError = ref<string | null>(null)

//   // Get hospital ID from route
//   const route = useRoute()
//   const hospitalId = ref<string | null>(null)

//   // Update hospitalId when route changes
//   watch(() => route.params.id || route.query.hospitalId, (newId) => {
//     if (newId) {
//       hospitalId.value = Array.isArray(newId) ? newId[0] : newId.toString()
//     }
//   }, { immediate: true })

//   // Initialize socket connection
//   const initializeSocket = () => {
//     if (socket.value) return

//     connecting.value = true
//     connectionError.value = null

//     // Get the API URL from environment or use default
//     const apiUrl = process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000'
    
//     try {
//       socket.value = io(apiUrl, {
//         transports: ['websocket', 'polling'],
//         reconnectionAttempts: maxReconnectAttempts,
//         reconnectionDelay: 1000,
//         timeout: 10000,
//         autoConnect: true
//       })

//       // Setup event listeners
//       socket.value.on('connect', handleConnect)
//       socket.value.on('disconnect', handleDisconnect)
//       socket.value.on('connect_error', handleConnectionError)
//       socket.value.on('surge_connection_status', handleConnectionStatus)
//       socket.value.on('surge_created', handleSurgeCreated)
//       socket.value.on('surge_updated', handleSurgeUpdated)
//       socket.value.on('initial_surge_data', handleInitialSurgeData)
//       socket.value.on('surge_heartbeat', handleHeartbeat)
//       socket.value.on('new_surge', handleSurgeCreated)
//       socket.value.on('global_surge_created', handleSurgeCreated)
//       socket.value.on('emergency_surge', handleSurgeCreated)
//     } catch (error) {
//       console.error('Socket initialization error:', error)
//       connectionError.value = error instanceof Error ? error.message : 'Unknown connection error'
//       connecting.value = false
//     }
//   }

//   // Event handlers
//   const handleConnect = () => {
//     console.log('Connected to surge websocket server')
//     isConnected.value = true
//     connecting.value = false
//     reconnectAttempts.value = 0
    
//     // Resubscribe to previously subscribed hospitals
//     subscribedHospitals.value.forEach(hospitalId => {
//       subscribeToHospitalSurges(hospitalId)
//     })

//     // Auto-create surge if we have location and hospitalId
//     checkAndCreateSurge()
//   }

//   const handleDisconnect = (reason: string) => {
//     console.log(`Disconnected from surge websocket server: ${reason}`)
//     isConnected.value = false
    
//     // If we're not already trying to reconnect and haven't exceeded max attempts
//     if (!connecting.value && reconnectAttempts.value < maxReconnectAttempts) {
//       reconnectAttempts.value++
//       connecting.value = true
      
//       console.log(`Attempting to reconnect (${reconnectAttempts.value}/${maxReconnectAttempts})...`)
      
//       // Try to reconnect after a delay
//       setTimeout(() => {
//         if (socket.value) {
//           socket.value.connect()
//         } else {
//           initializeSocket()
//         }
//       }, 2000)
//     }
//   }

//   const handleConnectionError = (error: Error) => {
//     console.error('Connection error:', error)
//     connectionError.value = error.message
//     connecting.value = false
//   }

//   const handleConnectionStatus = (data: any) => {
//     console.log('Connection status:', data)
//     lastEvent.value = data
//   }

//   const handleSurgeCreated = (data: any) => {
//     console.log('Surge created:', data)
//     surgeEvents.value.push(data)
//     lastEvent.value = data
//   }

//   const handleSurgeUpdated = (data: any) => {
//     console.log('Surge updated:', data)
    
//     // Update the surge in our local array
//     const index = surgeEvents.value.findIndex(
//       event => event.surge?._id === data.surge?._id
//     )
    
//     if (index !== -1) {
//       surgeEvents.value[index] = data
//     } else {
//       surgeEvents.value.push(data)
//     }
    
//     lastEvent.value = data
//   }

//   const handleInitialSurgeData = (data: any) => {
//     console.log('Initial surge data received:', data)
    
//     if (data.surges && Array.isArray(data.surges)) {
//       // Add all surges to our local array
//       data.surges.forEach((surge: any) => {
//         surgeEvents.value.push({
//           hospitalId: data.hospitalId,
//           surge,
//           timestamp: data.timestamp
//         })
//       })
//     }
    
//     lastEvent.value = data
//   }

//   const handleHeartbeat = (data: any) => {
//     console.log('Heartbeat received:', data)
//   }

//   // Subscribe to hospital surges
//   const subscribeToHospitalSurges = (hospitalId: string): Promise<boolean> => {
//     return new Promise((resolve, reject) => {
//       if (!socket.value || !isConnected.value) {
//         console.error('Cannot subscribe: Socket not connected')
//         reject(new Error('Socket not connected'))
//         return
//       }

//       socket.value.emit(
//         'subscribe_hospital_surges', 
//         { hospitalId }, 
//         (response: any) => {
//           if (response.success) {
//             subscribedHospitals.value.add(hospitalId)
//             console.log(`Subscribed to hospital surges: ${hospitalId}`)
//             resolve(true)
//           } else {
//             console.error(`Failed to subscribe to hospital surges: ${response.message}`)
//             reject(new Error(response.message))
//           }
//         }
//       )
//     })
//   }

//   // Unsubscribe from hospital surges
//   const unsubscribeFromHospitalSurges = (hospitalId: string): Promise<boolean> => {
//     return new Promise((resolve, reject) => {
//       if (!socket.value || !isConnected.value) {
//         console.error('Cannot unsubscribe: Socket not connected')
//         reject(new Error('Socket not connected'))
//         return
//       }

//       socket.value.emit(
//         'unsubscribe_hospital_surges', 
//         { hospitalId }, 
//         (response: any) => {
//           if (response.success) {
//             subscribedHospitals.value.delete(hospitalId)
//             console.log(`Unsubscribed from hospital surges: ${hospitalId}`)
//             resolve(true)
//           } else {
//             console.error(`Failed to unsubscribe from hospital surges: ${response.message}`)
//             reject(new Error(response.message))
//           }
//         }
//       )
//     })
//   }

//   // Create a surge event
//   const createSurge = (payload: SurgePayload): Promise<SurgeResponse> => {
//     return new Promise((resolve, reject) => {
//       if (!socket.value || !isConnected.value) {
//         console.error('Cannot create surge: Socket not connected')
//         reject(new Error('Socket not connected'))
//         return
//       }

//       console.log('Creating surge with payload:', payload)
//       creatingSurge.value = true
//       surgeError.value = null

//       socket.value.emit('create_surge', payload, (response: SurgeResponse) => {
//         creatingSurge.value = false
        
//         if (response.success) {
//           console.log('Surge created successfully:', response)
//           surgeCreated.value = true
//           resolve(response)
//         } else {
//           console.error('Failed to create surge:', response.message)
//           surgeError.value = response.message
//           reject(new Error(response.message))
//         }
//       })
//     })
//   }

//   // Update surge status
//   const updateSurgeStatus = (
//     surgeId: string, 
//     status: string, 
//     metadata?: Record<string, any>
//   ): Promise<SurgeResponse> => {
//     return new Promise((resolve, reject) => {
//       if (!socket.value || !isConnected.value) {
//         console.error('Cannot update surge: Socket not connected')
//         reject(new Error('Socket not connected'))
//         return
//       }

//       socket.value.emit(
//         'update_surge_status', 
//         { surgeId, status, metadata }, 
//         (response: SurgeResponse) => {
//           if (response.success) {
//             console.log('Surge updated successfully:', response)
//             resolve(response)
//           } else {
//             console.error('Failed to update surge:', response.message)
//             reject(new Error(response.message))
//           }
//         }
//       )
//     })
//   }

//   // Get current location
//   const getCurrentLocation = async (): Promise<LocationData> => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         const error = {
//           code: 0,
//           message: 'Geolocation is not supported by this browser'
//         }
//         locationError.value = error
//         reject(error)
//         return
//       }

//       locationLoading.value = true
//       locationError.value = null

//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           try {
//             const { latitude, longitude, accuracy } = position.coords
//             const timestamp = position.timestamp

//             // Get address using reverse geocoding
//             const address = await getAddressFromCoordinates(latitude, longitude)

//             const locationData: LocationData = {
//               latitude,
//               longitude,
//               address,
//               accuracy,
//               timestamp
//             }

//             location.value = locationData
//             locationLoading.value = false
            
//             // Check if we can create a surge now
//             checkAndCreateSurge()
            
//             resolve(locationData)
//           } catch (err) {
//             const error = {
//               code: 0,
//               message: 'Failed to get address information'
//             }
//             locationError.value = error
//             locationLoading.value = false
//             reject(error)
//           }
//         },
//         (err) => {
//           const error = {
//             code: err.code,
//             message: err.message
//           }
//           locationError.value = error
//           locationLoading.value = false
//           reject(error)
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 300000 // 5 minutes
//         }
//       )
//     })
//   }

//   // Reverse geocoding to get address from coordinates
//   const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string | undefined> => {
//     try {
//       // Using a free geocoding service
//       const response = await fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//       )

//       if (response.ok) {
//         const data = await response.json()
//         return data.principalSubdivision && data.locality 
//           ? `${data.locality}, ${data.principalSubdivision}, ${data.countryName}`
//           : data.formattedAddress || `${data.latitude}, ${data.longitude}`
//       }
//     } catch (err) {
//       console.warn('Failed to get address:', err)
//     }
//     return undefined
//   }

//   // Auto-create surge when everything is ready
//   const checkAndCreateSurge = async () => {
//     if (!surgeCreated.value && !creatingSurge.value && hospitalId.value && location.value && isConnected.value) {
//       try {
//         // Subscribe to hospital surges first
//         await subscribeToHospitalSurges(hospitalId.value)

//         // Create the surge
//         const surgePayload = {
//           hospitalId: hospitalId.value,
//           latitude: location.value.latitude,
//           longitude: location.value.longitude,
//           address: location.value.address,
//           emergencyType: 'auto-generated',
//           description: 'Automatically generated surge from hospital details page',
//           metadata: {
//             source: 'hospital-details-page',
//             accuracy: location.value.accuracy,
//             timestamp: location.value.timestamp,
//             userAgent: navigator.userAgent,
//           },
//         }

//         await createSurge(surgePayload)
//       } catch (error) {
//         console.error('Failed to auto-create surge:', error)
//         surgeError.value = error instanceof Error ? error.message : 'Failed to create surge'
//       }
//     }
//   }

//   // Disconnect socket
//   const disconnect = () => {
//     if (socket.value) {
//       socket.value.disconnect()
//       socket.value = null
//       isConnected.value = false
//       connecting.value = false
//     }
//   }

//   // Initialize on mount
//   onMounted(() => {
//     initializeSocket()
//     getCurrentLocation().catch(console.error)
//   })

//   // Clean up on component unmount
//   onUnmounted(() => {
//     disconnect()
//   })

//   // Watch for changes that might allow us to create a surge
//   watch([location, isConnected, hospitalId], () => {
//     checkAndCreateSurge()
//   })

//   return {
//     // Socket state
//     socket,
//     isConnected,
//     connectionError,
//     connecting,
//     reconnectAttempts,
//     lastEvent,
//     surgeEvents,
//     subscribedHospitals,
    
//     // Location state
//     location,
//     locationLoading,
//     locationError,
    
//     // Surge state
//     surgeCreated,
//     creatingSurge,
//     surgeError,
//     hospitalId,
    
//     // Methods
//     initializeSocket,
//     subscribeToHospitalSurges,
//     unsubscribeFromHospitalSurges,
//     createSurge,
//     updateSurgeStatus,
//     getCurrentLocation,
//     disconnect
//   }
// }

import { ref, onMounted, onUnmounted, watch } from "vue"
import { io, type Socket } from "socket.io-client"
import { useRoute } from "vue-router"
import { useCustomToast } from "@/composables/core/useCustomToast"

export interface SurgePayload {
  hospitalId: string
  latitude: number
  longitude: number
  address?: string
  emergencyType?: string
  description?: string
  metadata?: Record<string, any>
}

export interface SurgeResponse {
  success: boolean
  message: string
  surge?: any
  timestamp: string
}

export interface LocationData {
  latitude: number
  longitude: number
  address?: string
  accuracy?: number
  timestamp: number
}

// NEW: Hospital Click Interfaces for Surge WebSocket
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

export const useSurgeWebSocket = () => {
  const { showToast } = useCustomToast()
  const socket = ref<Socket | null>(null)
  const isConnected = ref(false)
  const connectionError = ref<string | null>(null)
  const lastEvent = ref<any>(null)
  const subscribedHospitals = ref<Set<string>>(new Set())
  const surgeEvents = ref<any[]>([])

  // Connection status
  const connecting = ref(false)
  const reconnectAttempts = ref(0)
  const maxReconnectAttempts = 5

  // Location data
  const location = ref<LocationData | null>(null)
  const locationLoading = ref(false)
  const locationError = ref<{ code: number; message: string } | null>(null)

  // Surge creation status
  const surgeCreated = ref(false)
  const creatingSurge = ref(false)
  const surgeError = ref<string | null>(null)

  // NEW: Hospital Click State
  const hospitalClickStats = ref<Map<string, any>>(new Map())
  const lastClickResponse = ref<HospitalClickResponse | null>(null)
  const clickInProgress = ref(false)

  // Get hospital ID from route
  const route = useRoute()
  const hospitalId = ref<string | null>(null)

  // Update hospitalId when route changes
  watch(
    () => route.params.id || route.query.hospitalId,
    (newId) => {
      if (newId) {
        hospitalId.value = Array.isArray(newId) ? newId[0] : newId.toString()
        console.log("🏥 Hospital ID updated from route:", hospitalId.value)
      }
    },
    { immediate: true },
  )

  // Initialize socket connection
  const initializeSocket = () => {
    if (socket.value) return

    connecting.value = true
    connectionError.value = null

    // Get the API URL from environment or use default
    const apiUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000"

    console.log("🔌 Initializing surge WebSocket connection to:", apiUrl)

    try {
      socket.value = io(apiUrl, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: maxReconnectAttempts,
        reconnectionDelay: 1000,
        timeout: 10000,
        autoConnect: true,
      })

      // Setup event listeners
      socket.value.on("connect", handleConnect)
      socket.value.on("disconnect", handleDisconnect)
      socket.value.on("connect_error", handleConnectionError)

      // Surge-specific events
      socket.value.on("surge_connection_status", handleConnectionStatus)
      socket.value.on("surge_created", handleSurgeCreated)
      socket.value.on("surge_updated", handleSurgeUpdated)
      socket.value.on("initial_surge_data", handleInitialSurgeData)
      socket.value.on("surge_heartbeat", handleHeartbeat)
      socket.value.on("new_surge", handleSurgeCreated)
      socket.value.on("global_surge_created", handleSurgeCreated)
      socket.value.on("emergency_surge", handleSurgeCreated)
      socket.value.on("location-validated-surge-created", handleLocationValidatedSurge)
      socket.value.on("location-validated-surge-triggered", handleLocationValidatedSurge)

      // NEW: Hospital Click Events
      socket.value.on("hospital-click-response", handleHospitalClickResponse)
      socket.value.on("click-count-updated", handleClickCountUpdated)
      socket.value.on("hospital-click-processed", handleHospitalClickProcessed)
      socket.value.on("hospital-click-threshold-reached", handleSurgeThresholdReached)
      socket.value.on("hospital-clicks-data", handleHospitalClicksData)
      socket.value.on("hospital-click-stats", handleHospitalClickStats)
      socket.value.on("hospital-click-error", handleHospitalClickError)
    } catch (error) {
      console.error("❌ Socket initialization error:", error)
      connectionError.value = error instanceof Error ? error.message : "Unknown connection error"
      connecting.value = false
    }
  }

  // Event handlers
  const handleConnect = () => {
    console.log("✅ Connected to surge websocket server with ID:", socket.value?.id)
    isConnected.value = true
    connecting.value = false
    reconnectAttempts.value = 0

    showToast({
      title: "Surge System Connected",
      message: "Real-time surge monitoring is now active",
      toastType: "success",
      duration: 3000,
    })

    // Resubscribe to previously subscribed hospitals
    subscribedHospitals.value.forEach((hospitalId) => {
      subscribeToHospitalSurges(hospitalId)
    })

    // Auto-create surge if we have location and hospitalId
    checkAndCreateSurge()
  }

  const handleDisconnect = (reason: string) => {
    console.log(`💔 Disconnected from surge websocket server: ${reason}`)
    isConnected.value = false

    // If we're not already trying to reconnect and haven't exceeded max attempts
    if (!connecting.value && reconnectAttempts.value < maxReconnectAttempts) {
      reconnectAttempts.value++
      connecting.value = true

      console.log(`🔄 Attempting to reconnect (${reconnectAttempts.value}/${maxReconnectAttempts})...`)

      // Try to reconnect after a delay
      setTimeout(() => {
        if (socket.value) {
          socket.value.connect()
        } else {
          initializeSocket()
        }
      }, 2000)
    }
  }

  const handleConnectionError = (error: Error) => {
    console.error("❌ Connection error:", error)
    connectionError.value = error.message
    connecting.value = false
  }

  const handleConnectionStatus = (data: any) => {
    console.log("🔗 Connection status:", data)
    lastEvent.value = data
  }

  const handleSurgeCreated = (data: any) => {
    console.log("🚨 Surge created:", data)
    surgeEvents.value.push(data)
    lastEvent.value = data

    showToast({
      title: "🚨 Surge Created",
      message: "A new surge event has been registered",
      toastType: "error",
      duration: 8000,
    })
  }

  const handleLocationValidatedSurge = (data: any) => {
    console.log("🎯 Location-validated surge:", data)
    surgeEvents.value.push(data)
    lastEvent.value = data

    showToast({
      title: "🎯 Location-Validated Surge!",
      message: "Surge triggered by validated location clicks",
      toastType: "error",
      duration: 10000,
    })
  }

  const handleSurgeUpdated = (data: any) => {
    console.log("📝 Surge updated:", data)

    // Update the surge in our local array
    const index = surgeEvents.value.findIndex((event) => event.surge?._id === data.surge?._id)

    if (index !== -1) {
      surgeEvents.value[index] = data
    } else {
      surgeEvents.value.push(data)
    }

    lastEvent.value = data
  }

  const handleInitialSurgeData = (data: any) => {
    console.log("📊 Initial surge data received:", data)

    if (data.surges && Array.isArray(data.surges)) {
      // Add all surges to our local array
      data.surges.forEach((surge: any) => {
        surgeEvents.value.push({
          hospitalId: data.hospitalId,
          surge,
          timestamp: data.timestamp,
        })
      })
    }

    lastEvent.value = data
  }

  const handleHeartbeat = (data: any) => {
    console.log("💓 Heartbeat received:", data)
  }

  // NEW: Hospital Click Event Handlers
  const handleHospitalClickResponse = (data: HospitalClickResponse) => {
    console.log("🖱️ Hospital click response:", data)
    lastClickResponse.value = data
    clickInProgress.value = false
  }

  const handleClickCountUpdated = (data: any) => {
    console.log("🔢 Click count updated:", data)

    showToast({
      title: "Click Count Updated",
      message: `Hospital now has ${data.clickCount} clicks`,
      toastType: data.surgeTriggered ? "error" : "info",
      duration: 4000,
    })
  }

  const handleHospitalClickProcessed = (data: any) => {
    console.log("✅ Hospital click processed:", data)
  }

  const handleSurgeThresholdReached = (data: any) => {
    console.log("🎯 Surge threshold reached:", data)
    surgeEvents.value.push(data)

    showToast({
      title: "🎯 Threshold Reached!",
      message: data.message || "Hospital click threshold reached!",
      toastType: "error",
      duration: 8000,
    })
  }

  const handleHospitalClicksData = (data: any) => {
    console.log("📊 Hospital clicks data:", data)
    hospitalClickStats.value.set(data.hospitalId, data)
  }

  const handleHospitalClickStats = (data: any) => {
    console.log("📈 Hospital click stats:", data)
    hospitalClickStats.value.set(data.hospitalId, data)
  }

  const handleHospitalClickError = (data: any) => {
    console.error("❌ Hospital click error:", data)
    clickInProgress.value = false

    showToast({
      title: "Click Error",
      message: data.error || "An error occurred while processing your click",
      toastType: "error",
      duration: 5000,
    })
  }

  // Subscribe to hospital surges
  const subscribeToHospitalSurges = (hospitalId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!socket.value || !isConnected.value) {
        console.error("❌ Cannot subscribe: Socket not connected")
        reject(new Error("Socket not connected"))
        return
      }

      console.log("🔔 Subscribing to hospital surges:", hospitalId)

      socket.value.emit("subscribe_hospital_surges", { hospitalId }, (response: any) => {
        if (response.success) {
          subscribedHospitals.value.add(hospitalId)
          console.log(`✅ Subscribed to hospital surges: ${hospitalId}`)
          resolve(true)
        } else {
          console.error(`❌ Failed to subscribe to hospital surges: ${response.message}`)
          reject(new Error(response.message))
        }
      })
    })
  }

  // NEW: Subscribe to hospital clicks
  const subscribeToHospitalClicks = (hospitalId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!socket.value || !isConnected.value) {
        console.error("❌ Cannot subscribe to clicks: Socket not connected")
        reject(new Error("Socket not connected"))
        return
      }

      console.log("🔔 Subscribing to hospital clicks:", hospitalId)

      socket.value.emit("subscribe_hospital_clicks", { hospitalId }, (response: any) => {
        if (response.success) {
          console.log(`✅ Subscribed to hospital clicks: ${hospitalId}`)
          resolve(true)
        } else {
          console.error(`❌ Failed to subscribe to hospital clicks: ${response.message}`)
          reject(new Error(response.message))
        }
      })
    })
  }

  // NEW: Send hospital click
  const sendHospitalClick = (
    hospitalId: string,
    userLocation: { lat: number; lng: number },
  ): Promise<HospitalClickResponse> => {
    return new Promise((resolve, reject) => {
      if (!socket.value || !isConnected.value) {
        console.error("❌ Cannot send hospital click: Socket not connected")
        reject(new Error("Socket not connected"))
        return
      }

      if (!hospitalId || !userLocation.lat || !userLocation.lng) {
        const error = "Missing required data: hospitalId, latitude, or longitude"
        console.error("❌ Cannot send hospital click:", error)
        reject(new Error(error))
        return
      }

      clickInProgress.value = true
      console.log("🖱️ Sending hospital click via surge WebSocket:", {
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

      socket.value.emit("hospital-click", clickData, (response: HospitalClickResponse) => {
        clickInProgress.value = false

        if (response.success) {
          console.log("✅ Hospital click successful via surge WebSocket:", response)
          lastClickResponse.value = response
          resolve(response)
        } else {
          console.error("❌ Hospital click failed via surge WebSocket:", response)
          reject(new Error(response.message || "Hospital click failed"))
        }
      })

      // Set a timeout for the response
      setTimeout(() => {
        if (clickInProgress.value) {
          clickInProgress.value = false
          const error = "Hospital click timeout"
          console.error("⏰ Hospital click timeout via surge WebSocket")
          reject(new Error(error))
        }
      }, 10000) // 10 second timeout
    })
  }

  // NEW: Get hospital click statistics
  const getHospitalClickStats = (hospitalId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!socket.value || !isConnected.value) {
        reject(new Error("Socket not connected"))
        return
      }

      console.log("📊 Requesting click stats via surge WebSocket:", hospitalId)

      socket.value.emit("get-hospital-click-stats", { hospitalId }, (response) => {
        if (response.success) {
          console.log("📊 Hospital click stats received via surge WebSocket:", response.stats)
          hospitalClickStats.value.set(hospitalId, response.stats)
          resolve(response.stats)
        } else {
          console.error("❌ Failed to get hospital click stats via surge WebSocket:", response.error)
          reject(new Error(response.error))
        }
      })
    })
  }

  // Unsubscribe from hospital surges
  const unsubscribeFromHospitalSurges = (hospitalId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!socket.value || !isConnected.value) {
        console.error("❌ Cannot unsubscribe: Socket not connected")
        reject(new Error("Socket not connected"))
        return
      }

      socket.value.emit("unsubscribe_hospital_surges", { hospitalId }, (response: any) => {
        if (response.success) {
          subscribedHospitals.value.delete(hospitalId)
          console.log(`✅ Unsubscribed from hospital surges: ${hospitalId}`)
          resolve(true)
        } else {
          console.error(`❌ Failed to unsubscribe from hospital surges: ${response.message}`)
          reject(new Error(response.message))
        }
      })
    })
  }

  // Create a surge event
  const createSurge = (payload: SurgePayload): Promise<SurgeResponse> => {
    return new Promise((resolve, reject) => {
      if (!socket.value || !isConnected.value) {
        console.error("❌ Cannot create surge: Socket not connected")
        reject(new Error("Socket not connected"))
        return
      }

      console.log("🚨 Creating surge with payload:", payload)
      creatingSurge.value = true
      surgeError.value = null

      socket.value.emit("create_surge", payload, (response: SurgeResponse) => {
        creatingSurge.value = false

        if (response.success) {
          console.log("✅ Surge created successfully:", response)
          surgeCreated.value = true
          resolve(response)
        } else {
          console.error("❌ Failed to create surge:", response.message)
          surgeError.value = response.message
          reject(new Error(response.message))
        }
      })
    })
  }

  // Update surge status
  const updateSurgeStatus = (
    surgeId: string,
    status: string,
    metadata?: Record<string, any>,
  ): Promise<SurgeResponse> => {
    return new Promise((resolve, reject) => {
      if (!socket.value || !isConnected.value) {
        console.error("❌ Cannot update surge: Socket not connected")
        reject(new Error("Socket not connected"))
        return
      }

      socket.value.emit("update_surge_status", { surgeId, status, metadata }, (response: SurgeResponse) => {
        if (response.success) {
          console.log("✅ Surge updated successfully:", response)
          resolve(response)
        } else {
          console.error("❌ Failed to update surge:", response.message)
          reject(new Error(response.message))
        }
      })
    })
  }

  // Get current location
  const getCurrentLocation = async (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = {
          code: 0,
          message: "Geolocation is not supported by this browser",
        }
        locationError.value = error
        reject(error)
        return
      }

      locationLoading.value = true
      locationError.value = null

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude, accuracy } = position.coords
            const timestamp = position.timestamp

            // Get address using reverse geocoding
            const address = await getAddressFromCoordinates(latitude, longitude)

            const locationData: LocationData = {
              latitude,
              longitude,
              address,
              accuracy,
              timestamp,
            }

            location.value = locationData
            locationLoading.value = false

            console.log("📍 Location obtained via surge WebSocket:", locationData)

            // Check if we can create a surge now
            checkAndCreateSurge()

            resolve(locationData)
          } catch (err) {
            const error = {
              code: 0,
              message: "Failed to get address information",
            }
            locationError.value = error
            locationLoading.value = false
            reject(error)
          }
        },
        (err) => {
          const error = {
            code: err.code,
            message: err.message,
          }
          locationError.value = error
          locationLoading.value = false
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        },
      )
    })
  }

  // Reverse geocoding to get address from coordinates
  const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string | undefined> => {
    try {
      // Using a free geocoding service
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      )

      if (response.ok) {
        const data = await response.json()
        return data.principalSubdivision && data.locality
          ? `${data.locality}, ${data.principalSubdivision}, ${data.countryName}`
          : data.formattedAddress || `${data.latitude}, ${data.longitude}`
      }
    } catch (err) {
      console.warn("⚠️ Failed to get address:", err)
    }
    return undefined
  }

  // Auto-create surge when everything is ready
  const checkAndCreateSurge = async () => {
    if (!surgeCreated.value && !creatingSurge.value && hospitalId.value && location.value && isConnected.value) {
      try {
        console.log("🔄 Auto-creating surge for hospital:", hospitalId.value)

        // Subscribe to hospital surges first
        await subscribeToHospitalSurges(hospitalId.value)

        // Also subscribe to hospital clicks
        await subscribeToHospitalClicks(hospitalId.value)

        // Create the surge
        const surgePayload = {
          hospitalId: hospitalId.value,
          latitude: location.value.latitude,
          longitude: location.value.longitude,
          address: location.value.address,
          emergencyType: "auto-generated",
          description: "Automatically generated surge from hospital details page",
          metadata: {
            source: "hospital-details-page",
            accuracy: location.value.accuracy,
            timestamp: location.value.timestamp,
            userAgent: navigator.userAgent,
          },
        }

        await createSurge(surgePayload)
        console.log("✅ Auto-surge created successfully")
      } catch (error) {
        console.error("❌ Failed to auto-create surge:", error)
        surgeError.value = error instanceof Error ? error.message : "Failed to create surge"
      }
    }
  }

  // Disconnect socket
  const disconnect = () => {
    if (socket.value) {
      console.log("🛑 Disconnecting surge WebSocket")
      socket.value.disconnect()
      socket.value = null
      isConnected.value = false
      connecting.value = false
    }
  }

  // Initialize on mount
  onMounted(() => {
    console.log("🚀 Mounting surge WebSocket")
    initializeSocket()
    getCurrentLocation().catch(console.error)
  })

  // Clean up on component unmount
  onUnmounted(() => {
    console.log("🛑 Unmounting surge WebSocket")
    disconnect()
  })

  // Watch for changes that might allow us to create a surge
  watch([location, isConnected, hospitalId], () => {
    checkAndCreateSurge()
  })

  return {
    // Socket state
    socket,
    isConnected,
    connectionError,
    connecting,
    reconnectAttempts,
    lastEvent,
    surgeEvents,
    subscribedHospitals,

    // Location state
    location,
    locationLoading,
    locationError,

    // Surge state
    surgeCreated,
    creatingSurge,
    surgeError,
    hospitalId,

    // NEW: Hospital Click state
    hospitalClickStats,
    lastClickResponse,
    clickInProgress,

    // Methods
    initializeSocket,
    subscribeToHospitalSurges,
    subscribeToHospitalClicks,
    unsubscribeFromHospitalSurges,
    createSurge,
    updateSurgeStatus,
    getCurrentLocation,
    disconnect,

    // NEW: Hospital Click methods
    sendHospitalClick,
    getHospitalClickStats,
  }
}
