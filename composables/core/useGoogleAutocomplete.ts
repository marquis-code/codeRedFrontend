// composables/useGoogleAutocomplete.ts
import { ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

export function useGoogleAutocomplete(payload: { address: string; latitude: number; longitude: number }) {
  const autocomplete = ref<google.maps.places.Autocomplete | null>(null);
  const googleMapsApiKey = 'AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg'

  const initializeAutocomplete = (inputElement: HTMLInputElement) => {
    const loader = new Loader({
      apiKey: googleMapsApiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      autocomplete.value = new google.maps.places.Autocomplete(inputElement, {
        types: ['geocode'], // Only geocoding results
        componentRestrictions: { country: 'NG' }, // Restrict to Nigeria
      });

      autocomplete.value.addListener('place_changed', () => {
        const place = autocomplete.value?.getPlace();
        if (place?.geometry) {
          payload.address = place.formatted_address || place.name || '';
          payload.latitude = place.geometry.location.lat();
          payload.longitude = place.geometry.location.lng();
        }
      });
    });
  };

  return {
    initializeAutocomplete,
  };
}
