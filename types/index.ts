export interface LocationData {
    latitude: number
    longitude: number
    accuracy?: number
    address?: string
    city?: string
    country?: string
    timestamp: number
  }
  
  export interface MedicalFacility {
    place_id: string
    name: string
    vicinity: string
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
    types: string[]
    rating?: number
    user_ratings_total?: number
    opening_hours?: {
      open_now: boolean
      weekday_text?: string[]
    }
    photos?: Array<{
      photo_reference: string
      height: number
      width: number
    }>
    formatted_phone_number?: string
    website?: string
    availability?: AvailabilityStatus
    distance?: number
  }
  
  export interface AvailabilityStatus {
    status: "available" | "busy" | "emergency-only" | "closed"
    waitTime?: number
    capacity?: number
    confidence: number
    lastUpdated: number
    emergencyServices?: boolean
  }
  