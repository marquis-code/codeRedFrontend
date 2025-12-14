<template>
  <div class="relative w-full">
    <label v-if="label" class="input-label block mb-2">
      {{ label }}
    </label>
    
    <div class="relative">
      <!-- Selected items display / trigger -->
      <div
        @click="toggleDropdown"
        class="input-field min-h-[42px] cursor-pointer border border-gray-300 rounded-md p-2 flex flex-wrap gap-2 items-center"
        :class="{ 'border-green-500': isOpen }"
      >
        <!-- Selected tags -->
        <div
          v-for="item in selectedItems"
          :key="item.value"
          class="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
        >
          <span>{{ item.label }}</span>
          <button
            type="button"
            @click.stop="removeItem(item.value)"
            class="ml-2 hover:text-green-600 focus:outline-none"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Placeholder when nothing selected -->
        <span v-if="selectedItems.length === 0" class="text-gray-400 text-sm">
          {{ placeholder }}
        </span>
        
        <!-- Dropdown icon -->
        <div class="ml-auto">
          <svg
            class="w-5 h-5 text-gray-400 transition-transform"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <!-- Dropdown menu -->
      <transition name="dropdown">
        <div
          v-show="isOpen"
          class="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          <!-- Search input -->
          <div class="sticky top-0 bg-white p-2 border-b border-gray-200">
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 text-sm"
              @click.stop
            />
          </div>
          
          <!-- Options list -->
          <div class="py-1">
            <div
              v-for="option in filteredOptions"
              :key="option.value"
              @click="toggleItem(option)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between text-sm"
              :class="{ 'bg-green-50': isSelected(option.value) }"
            >
              <span>{{ option.label }}</span>
              <svg
                v-if="isSelected(option.value)"
                class="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <!-- No results message -->
            <div
              v-if="filteredOptions.length === 0"
              class="px-4 py-3 text-sm text-gray-500 text-center"
            >
              No results found
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';

interface Option {
  label: string;
  value: string;
}

interface Props {
  modelValue: string[];
  options: Option[];
  label?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Select items...'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);

const selectedItems = computed(() => {
  return props.options.filter(option => 
    props.modelValue.includes(option.value)
  );
});

const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return props.options;
  }
  
  const query = searchQuery.value.toLowerCase();
  return props.options.filter(option =>
    option.label.toLowerCase().includes(query)
  );
});

const isSelected = (value: string) => {
  return props.modelValue.includes(value);
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  } else {
    searchQuery.value = '';
  }
};

const toggleItem = (option: Option) => {
  const newValue = [...props.modelValue];
  const index = newValue.indexOf(option.value);
  
  if (index > -1) {
    newValue.splice(index, 1);
  } else {
    newValue.push(option.value);
  }
  
  emit('update:modelValue', newValue);
};

const removeItem = (value: string) => {
  const newValue = props.modelValue.filter(v => v !== value);
  emit('update:modelValue', newValue);
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (isOpen.value && !target.closest('.relative')) {
    isOpen.value = false;
    searchQuery.value = '';
  }
};

watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.input-field {
  transition: border-color 0.2s ease;
}

.input-field:hover {
  border-color: #9ca3af;
}

/* Custom scrollbar for dropdown */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>