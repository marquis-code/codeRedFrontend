<!-- <script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useGoogleAutocomplete } from '@/composables/core/useGoogleAutocomplete';

// Define the payload object
const payload = ref({
  address: '',
  latitude: 0,
  longitude: 0,
});

// Input element reference
const inputRef = ref<HTMLInputElement | null>(null);

// Initialize the autocomplete
const { initializeAutocomplete } = useGoogleAutocomplete(payload.value);

onMounted(() => {
  if (inputRef.value) {
    initializeAutocomplete(inputRef.value);
  }
});
</script>

<template>
  <div>
    <input
      ref="inputRef"
      v-model="payload.address"
      type="text"
      class="input-field"
      placeholder="Enter your address"
    />
    <div v-if="payload.latitude && payload.longitude">
      <p>Latitude: {{ payload.latitude }}</p>
      <p>Longitude: {{ payload.longitude }}</p>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style> -->

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const emit = defineEmits(['update:modelValue']);
const modelValue = ref({ address: '', latitude: 0, longitude: 0 });
const inputRef = ref<HTMLInputElement | null>(null);

const initializeAutocomplete = () => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['places'],
  });

  loader.load().then(() => {
    const autocomplete = new google.maps.places.Autocomplete(inputRef.value!, {
      types: ['geocode'],
      componentRestrictions: { country: 'NG' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        modelValue.value = {
          address: place.formatted_address || place.name || '',
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        };
        emit('update:modelValue', modelValue.value);
      }
    });
  });
};

onMounted(() => {
  if (inputRef.value) {
    initializeAutocomplete();
  }
});
</script>

<template>
  <div>
    <input
      ref="inputRef"
      type="text"
       class="input-field"
      placeholder="Enter your address"
    />
  </div>
</template>
