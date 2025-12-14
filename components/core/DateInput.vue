<template>
  <div class="relative w-full">
    <!-- Input field -->
    <input
      :value="displayValue"
      @click="toggleCalendar"
      :placeholder="placeholder"
      readonly
      class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
    />
    
    <!-- Calendar Icon -->
    <svg
      class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>

    <!-- Calendar Dropdown -->
    <Teleport to="body">
      <div
        v-if="showCalendar"
        class="fixed inset-0 z-40"
        @click="handleBackdropClick"
      />
    </Teleport>

    <div
      v-if="showCalendar"
      class="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-lg border border-gray-200"
    >
        <CustomCalendar
                    v-model="selectedDate"
                    :max-date="new Date()"
                  />
      <!-- <CustomCalendar
        :v-model="selectedDate"
        @update:model-value="handleDateSelect"
      /> -->
    </div>
  </div>
</template>


 <!-- v-model="startDate"
                    :max-date="endDate || new Date()"
                    @update:model-value="closeStartDatePicker" -->

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import CustomCalendar from "@/components/core/CustomCalendar.vue"

interface Props {
  modelValue: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'DD / MM / YY'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const showCalendar = ref(false)
const selectedDate = ref('')

const displayValue = computed(() => {
  if (selectedDate.value) {
    try {
      const date = new Date(selectedDate.value + 'T00:00:00')
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = String(date.getFullYear()).slice(-2)
      return `${day} / ${month} / ${year}`
    } catch {
      return ''
    }
  }
  return ''
})

const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value
}

const closeCalendar = () => {
  showCalendar.value = false
}

const handleBackdropClick = () => {
  closeCalendar()
}

const handleDateSelect = (date: string) => {
  selectedDate.value = date
  emit('update:modelValue', date)
  closeCalendar()
}

// Watch for external modelValue changes
watch(
  () => selectedDate,
  (newValue) => {
    emit('update:modelValue', newValue.value)
  }
)
</script>
