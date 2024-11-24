// // composables/useGoogleLocation.ts
// import { ref } from 'vue';

// export function useGoogleLocation() {
//   const locationText = ref<string | null>(null);
//   const error = ref<string | null>(null);

//   const getLocationText = async (latitude: number, longitude: number): Promise<string | null> => {
//     try {
//       const apiKey = 'AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg'; // Replace with your Google API key
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
//       );

//       const data = await response.json();

//       if (data.status === 'OK' && data.results.length > 0) {
//         return data.results[0].formatted_address; // Get the formatted address
//       } else {
//         throw new Error(data.error_message || 'No location data found.');
//       }
//     } catch (err: any) {
//       throw new Error(err.message || 'Failed to fetch location.');
//     }
//   };

//   const fetchUserLocation = async (): Promise<void> => {
//     if (!navigator.geolocation) {
//       error.value = 'Geolocation is not supported by this browser.';
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const loc = await getLocationText(latitude, longitude);
//           locationText.value = loc;
//         } catch (err: any) {
//           error.value = err.message || 'Failed to fetch location text.';
//         }
//       },
//       (geoError) => {
//         error.value = geoError.message || 'Failed to fetch geolocation.';
//       }
//     );
//   };

//   return {
//     locationText,
//     error,
//     fetchUserLocation,
//   };
// }

export function useGoogleLocation() {
    const locationText = ref<string | null>(null);
    const error = ref<string | null>(null);
  
    const getLocationText = async (latitude: number, longitude: number): Promise<string | null> => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY_UPDATED // Replace with your Google API key
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );
  
        const data = await response.json();
  
        if (data.status === 'OK' && data.results.length > 0) {
          return data.results[0].formatted_address; // Get the formatted address
        } else {
          throw new Error(data.error_message || 'No location data found.');
        }
      } catch (err: any) {
        throw new Error(err.message || 'Failed to fetch location.');
      }
    };
  
    const fetchUserLocation = async (): Promise<void> => {
      if (!navigator.geolocation) {
        error.value = 'Geolocation is not supported by this browser.';
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const loc = await getLocationText(latitude, longitude);
            locationText.value = loc;
          } catch (err: any) {
            error.value = err.message || 'Failed to fetch location text.';
          }
        },
        (geoError) => {
          error.value = geoError.message || 'Failed to fetch geolocation.';
        },
        {
          enableHighAccuracy: true, // Requests GPS for better accuracy
          timeout: 10000, // Timeout after 10 seconds
          maximumAge: 0, // Do not cache location
        }
      );
    };
  
    return {
      locationText,
      error,
      fetchUserLocation,
    };
  }
  