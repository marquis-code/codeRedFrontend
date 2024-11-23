import { Loader } from "@googlemaps/js-api-loader";

export function useGoogleMaps() {
  const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY_UPDATED;
  const loader = new Loader({
    apiKey,
    libraries: ["places"],
  });

  async function getUserLocation(): Promise<google.maps.LatLngLiteral | null> {
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

  async function getPlaceDetails(placeId: string): Promise<google.maps.places.PlaceResult | null> {
    await loader.load();

    const service = new google.maps.places.PlacesService(document.createElement("div"));

    return new Promise((resolve, reject) => {
      service.getDetails({ placeId }, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(result);
        } else {
          console.error("Failed to fetch place details", status);
          reject(status);
        }
      });
    });
  }

  return { getUserLocation, getPlaceDetails };
}
