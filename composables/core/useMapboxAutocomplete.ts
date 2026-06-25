import { ref } from 'vue';
import { useRuntimeConfig } from "#app";

export function useMapboxAutocomplete(payload: { address: string; latitude: number; longitude: number }) {
  const config = useRuntimeConfig();

  const initializeAutocomplete = (inputElement: HTMLInputElement) => {
    inputElement.addEventListener('input', async (e) => {
      const target = e.target as HTMLInputElement;
      const val = target.value;
      if (val.length < 3) return;

      try {
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(val)}.json?country=ng&access_token=${config.public.mapboxAccessToken}`);
        const data = await res.json();
        // Just demonstrating how it could be handled, but usually UI handles the dropdown.
        // We'll update components/Autocomplete.vue directly instead.
      } catch (err) {
        console.error(err);
      }
    });
  };

  return {
    initializeAutocomplete,
  };
}
