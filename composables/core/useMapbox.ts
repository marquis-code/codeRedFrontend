import { useRuntimeConfig } from "#app";

export function useMapbox() {
  const config = useRuntimeConfig();

  async function getUserLocation(): Promise<{lat: number, lng: number} | null> {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return null;
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location", error);
          reject(error);
        }
      );
    });
  }

  async function getPlaceDetails(placeId: string): Promise<any | null> {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${placeId}.json?country=ng&access_token=${config.public.mapboxAccessToken}`)
      const data = await response.json()
      if (data && data.features && data.features.length > 0) {
        return data.features[0]
      }
      return null
    } catch (error) {
      console.error("Failed to fetch place details", error);
      return null;
    }
  }

  return { getUserLocation, getPlaceDetails };
}
