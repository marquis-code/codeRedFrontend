<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const emit = defineEmits(['update:modelValue']);
const modelValue = ref({ address: '', latitude: 0, longitude: 0 });
const inputRef = ref<HTMLInputElement | null>(null);

const initializeAutocomplete = () => {
  const loader = new Loader({
    apiKey: 'AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg',
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
