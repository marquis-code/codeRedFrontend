<!-- CustomCalendar.vue -->
<template>
  <div class="bg-white rounded-lg shadow-2xl p-6 w-80 border-0">
    <!-- Calendar Header -->
    <div class="flex items-center justify-between mb-6">
      <button
        @click="previousMonth"
        class="p-1 hover:bg-gray-50 rounded transition-colors"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <h3 class="text-lg font-medium text-gray-900">
        {{ currentMonth }} {{ currentYear }}
      </h3>
      
      <button
        @click="nextMonth"
        class="p-1 hover:bg-gray-50 rounded transition-colors"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-1 mb-3">
      <div
        v-for="day in weekDays"
        :key="day"
        class="text-center text-sm font-medium text-gray-600 py-2"
      >
        {{ day }}
      </div>
    </div>

    <div class="grid grid-cols-7 gap-1">
      <button
        v-for="date in calendarDates"
        :key="`${date.year}-${date.month}-${date.day}`"
        @click="selectDate(date)"
        :disabled="date.disabled"
        class="h-10 w-10 text-sm rounded-full transition-all duration-200 flex items-center justify-center relative"
        :class="{
          'text-gray-300': !date.isCurrentMonth,
          'text-gray-900 hover:bg-gray-100': date.isCurrentMonth && !date.isSelected && !date.disabled,
          'bg-primary text-white shadow-lg': date.isSelected,
          'cursor-not-allowed opacity-30': date.disabled,
          'cursor-pointer': !date.disabled
        }"
      >
        {{ date.day }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CalendarDate {
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  isSelected: boolean
  disabled: boolean
  fullDate: Date
}

interface Props {
  modelValue?: Date | null
  minDate?: Date
  maxDate?: Date
}

interface Emits {
  (e: 'update:modelValue', value: Date | null): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  minDate: undefined,
  maxDate: undefined
})

const emit = defineEmits<Emits>()

const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(props.modelValue)

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const currentMonth = computed(() => months[currentDate.value.getMonth()])
const currentYear = computed(() => currentDate.value.getFullYear())

const calendarDates = computed((): CalendarDate[] => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const startDate = new Date(firstDay)
  const dayOfWeek = (firstDay.getDay() + 6) % 7
  startDate.setDate(firstDay.getDate() - dayOfWeek)
  
  const dates: CalendarDate[] = []
  const currentDateObj = new Date(startDate)
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(currentDateObj)
    const isCurrentMonth = date.getMonth() === month
    const isSelected = selectedDate.value && 
      date.getDate() === selectedDate.value.getDate() &&
      date.getMonth() === selectedDate.value.getMonth() &&
      date.getFullYear() === selectedDate.value.getFullYear()
    
    const disabled = 
      (props.minDate && date < props.minDate) ||
      (props.maxDate && date > props.maxDate)
    
    dates.push({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentMonth,
      isSelected: !!isSelected,
      disabled,
      fullDate: new Date(date)
    })
    
    currentDateObj.setDate(currentDateObj.getDate() + 1)
  }
  
  return dates
})

const selectDate = (date: CalendarDate) => {
  if (date.disabled) return
  
  selectedDate.value = new Date(date.fullDate)
  emit('update:modelValue', selectedDate.value)
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

watch(() => props.modelValue, (newValue) => {
  selectedDate.value = newValue
  if (newValue) {
    currentDate.value = new Date(newValue.getFullYear(), newValue.getMonth(), 1)
  }
})
</script>