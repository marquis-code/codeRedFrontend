<template>
  <div class="relative w-full">
    <!-- Input Field -->
    <div class="relative">
      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <input
        ref="inputRef"
        v-model="address"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        :disabled="isLoading"
        @focus="onFocus"
      />
      <div v-if="isLoading" class="absolute right-3 top-1/2 -translate-y-1/2">
        <svg class="animate-spin h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>

    <!-- Autocomplete Dropdown -->
    <Transition name="fade-slide">
      <div
        v-if="showSuggestions && predictions.length > 0"
        class="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto"
      >
        <button
          v-for="prediction in predictions"
          :key="prediction.id"
          @click="selectAddress(prediction)"
          type="button"
          class="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-start gap-3"
        >
          <svg class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-gray-900">
              {{ prediction.text }}
            </div>
            <div class="text-xs text-gray-500 truncate">
              {{ prediction.place_name }}
            </div>
          </div>
        </button>
      </div>
    </Transition>

    <!-- Current Location Button -->
    <button
      type="button"
      @click="useCurrentLocation"
      :disabled="isLoading"
      class="mt-2 text-green-500 hover:text-green-600 font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Use my current location
    </button>

    <!-- Display Selected Coordinates -->
    <div
      v-if="modelValue.latitude !== 0 && modelValue.longitude !== 0"
      class="mt-2 text-xs text-gray-500"
    >
      Coordinates: {{ modelValue.latitude.toFixed(6) }}, {{ modelValue.longitude.toFixed(6) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRuntimeConfig } from '#app';

interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
}

interface Prediction {
  id: string;
  text: string;
  place_name: string;
  center: [number, number];
}

interface Props {
  modelValue: LocationData;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Enter your address',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: LocationData): void;
}>();

const config = useRuntimeConfig();
const address = ref(props.modelValue.address || '');
const predictions = ref<Prediction[]>([]);
const showSuggestions = ref(false);
const isLoading = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});

const handleClickOutside = (e: MouseEvent) => {
  if (inputRef.value && !inputRef.value.contains(e.target as Node)) {
    showSuggestions.value = false;
  }
};

watch(address, (newValue) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  if (!newValue || newValue.length < 3) {
    predictions.value = [];
    showSuggestions.value = false;
    return;
  }

  debounceTimer = setTimeout(() => {
    fetchPredictions(newValue);
  }, 300);
});

const fetchPredictions = async (input: string) => {
  isLoading.value = true;
  try {
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?country=ng&access_token=${config.public.mapboxAccessToken}`);
    const data = await res.json();
    if (data.features) {
      predictions.value = data.features;
      showSuggestions.value = true;
    } else {
      predictions.value = [];
      showSuggestions.value = false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const selectAddress = (prediction: Prediction) => {
  address.value = prediction.place_name;
  showSuggestions.value = false;
  predictions.value = [];
  
  emit('update:modelValue', {
    address: prediction.place_name,
    latitude: prediction.center[1],
    longitude: prediction.center[0]
  });
};

const onFocus = () => {
  if (predictions.value.length > 0) {
    showSuggestions.value = true;
  }
};

const useCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }

  isLoading.value = true;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?country=ng&access_token=${config.public.mapboxAccessToken}`);
        const data = await res.json();
        
        isLoading.value = false;
        
        if (data.features && data.features.length > 0) {
          const formattedAddress = data.features[0].place_name;
          address.value = formattedAddress;
          emit('update:modelValue', {
            address: formattedAddress,
            latitude,
            longitude
          });
        } else {
          alert('Could not get your location address');
        }
      } catch (error) {
        isLoading.value = false;
        alert('Unable to retrieve your location');
        console.error(error);
      }
    },
    (error) => {
      isLoading.value = false;
      alert('Unable to retrieve your location');
      console.error(error);
    }
  );
};
</script>

<style scoped>
.fade-slide-enter-active {
  transition: all 0.2s ease-out;
}

.fade-slide-leave-active {
  transition: all 0.15s ease-in;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>