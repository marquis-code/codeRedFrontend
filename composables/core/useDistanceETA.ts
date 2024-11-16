export const useDistanceETA = () => {
    /**
     * Calculate distance in kilometers and ETA (walking and driving)
     * @param userLocation - User's latitude and longitude
     * @param selectedLocation - Selected hospital's latitude and longitude
     * @returns { distance: string, etaWalking: number, etaDriving: number }
     */
    const calculateDistanceAndETA = (
      userLocation: { lat: number; lng: number },
      selectedLocation: { latitude: number; longitude: number }
    ) => {
      const R = 6371; // Earth's radius in kilometers
  
      // Convert degrees to radians
      const toRadians = (degree: number) => (degree * Math.PI) / 180;
  
      const lat1 = toRadians(userLocation.lat);
      const lon1 = toRadians(userLocation.lng);
      const lat2 = toRadians(selectedLocation.latitude);
      const lon2 = toRadians(selectedLocation.longitude);
  
      // Haversine formula
      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;
  
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      // Distance in kilometers
      const distance = R * c;
  
      // Avoid returning 0 for very small distances
      const distanceInKm = distance > 0 ? distance : 0.001; // Minimum distance of 1 meter
  
      // Speed in km/h
      const walkingSpeed = 5; // Average walking speed in km/h
      const drivingSpeed = 50; // Average driving speed in km/h
  
      // ETA calculations in minutes
      const etaWalking = (distanceInKm / walkingSpeed) * 60;
      const etaDriving = (distanceInKm / drivingSpeed) * 60;
  
      return {
        distance: distanceInKm.toFixed(2), // Distance in kilometers rounded to 2 decimals
        etaWalking: Math.round(etaWalking), // Walking ETA in minutes
        etaDriving: Math.round(etaDriving), // Driving ETA in minutes
      };
    };
  
    return { calculateDistanceAndETA };
  };
  