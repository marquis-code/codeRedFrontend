// import { ref } from 'vue';

// export default function useUserLocation() {
//   const latitude = ref<number | null>(null);
//   const longitude = ref<number | null>(null);
//   const error = ref<string | null>(null);
//   const address = ref<string | null>(null) as any;
//   const loading = ref<boolean>(false);

//   const fetchLocationData = async (lat: number, lng: number) => {
//     const url = `https://map-geocoding.p.rapidapi.com/json?latlng=${lat},${lng}`;
//     const options = {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': 'c64c6e5fbemsh8b35eab2d48024cp194516jsn49c1249498e6',
//         'x-rapidapi-host': 'map-geocoding.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await fetch(url, options);
//       const result = await response.json();

//       // Assuming the API returns a `results` array with address components
//       if (result.results && result.results.length > 0) {
//         address.value = result.results[0].formatted_address;
//       } else {
//         error.value = 'Address not found';
//       }
//     } catch (err) {
//       error.value = 'Failed to fetch location data';
//       console.error(err);
//     }
//   };

//   const getUserLocation = () => {
//     if (!navigator.geolocation) {
//       error.value = 'Geolocation is not supported by your browser';
//       return;
//     }

//     loading.value = true;
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         latitude.value = position.coords.latitude;
//         longitude.value = position.coords.longitude;
//         await fetchLocationData(latitude.value, longitude.value);
//         loading.value = false;
//       },
//       (err) => {
//         error.value = 'Unable to retrieve location';
//         console.error(err);
//         loading.value = false;
//       }
//     );
//   };

//   onMounted(() => {
//     getUserLocation(); // Fetch the user's location when the page mounts
//   });

//   return {
//     latitude,
//     longitude,
//     error,
//     address,
//     loading,
//     getUserLocation,
//   };
// }


import { ref, onMounted } from 'vue';

export default function useUserLocation() {
  const latitude = ref<number | null>(null);
  const longitude = ref<number | null>(null);
  const error = ref<string | null>(null);
  const address = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const fetchLocationData = async (lat: number, lng: number) => {
    const url = `https://map-geocoding.p.rapidapi.com/json?latlng=${lat},${lng}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'c64c6e5fbemsh8b35eab2d48024cp194516jsn49c1249498e6',
        'x-rapidapi-host': 'map-geocoding.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.results && result.results.length > 0) {
        address.value = result.results[0].formatted_address;
      } else {
        error.value = 'Address not found';
      }
    } catch (err) {
      error.value = 'Failed to fetch location data';
      console.error(err);
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      error.value = 'Geolocation is not supported by your browser';
      return;
    }

    loading.value = true;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        await fetchLocationData(latitude.value, longitude.value);
        loading.value = false;
      },
      (err) => {
        error.value = 'Unable to retrieve location';
        console.error(err);
        loading.value = false;
      }
    );
  };

  onMounted(() => {
    getUserLocation();
  });

  return {
    latitude,
    longitude,
    error,
    address,
    loading,
    getUserLocation,
  };
}
