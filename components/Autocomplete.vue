<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from '#app';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const emit = defineEmits(['update:modelValue']);
const modelValue = ref({ address: '', latitude: 0, longitude: 0 });
const geocoderContainer = ref<HTMLDivElement | null>(null);
const config = useRuntimeConfig();

onMounted(() => {
  if (geocoderContainer.value) {
    const geocoder = new MapboxGeocoder({
      accessToken: config.public.mapboxAccessToken as string,
      types: 'address,poi,place',
      countries: 'ng',
    });

    geocoder.addTo(geocoderContainer.value);

    geocoder.on('result', (e: any) => {
      const place = e.result;
      if (place.geometry) {
        modelValue.value = {
          address: place.place_name || place.text || '',
          latitude: place.center[1],
          longitude: place.center[0],
        };
        emit('update:modelValue', modelValue.value);
      }
    });
  }
});
</script>

<template>
  <div ref="geocoderContainer" class="w-full"></div>
</template>

<style scoped>
.mapboxgl-ctrl-geocoder {
  width: 100%;
  max-width: none;
}
</style>
