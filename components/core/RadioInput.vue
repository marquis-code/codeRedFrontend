<template>
  <label class="relative cursor-pointer">
    <input
      type="radio"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
      class="sr-only"
    />
    <div
      :class="[
        'flex items-center justify-center p-4 border-2 rounded-lg transition-all',
        {
          'border-green-600 bg-green-50': modelValue === value,
          'border-gray-200 bg-white hover:bg-gray-50': modelValue !== value
        }
      ]"
    >
      <span
        :class="[
          'font-medium',
          {
            'text-primary': modelValue === value,
            'text-gray-700': modelValue !== value
          }
        ]"
      >
        {{ label }}
      </span>
      <div
        v-if="modelValue === value"
        class="absolute top-2 right-2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center"
      >
        <CheckIcon class="w-3 h-3 text-white" />
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'

interface Props {
  modelValue: string
  value: string
  label: string
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
