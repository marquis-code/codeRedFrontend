<template>
  <div class="mb-2 relative">
    <div class="relative input-container">
      <label 
        :for="inputId"
        :class="[
          'absolute transition-all duration-300 ease-in-out pointer-events-none z-10',
          isFocused || modelValue ? 
            'text-xs text-gray-500 left-3 top-2' : 
            'text-base text-gray-500 left-3 top-1/2 transform -translate-y-1/2'
        ]"
      >
        {{ label }}
      </label>
      
      <input 
        :id="inputId"
        :type="computedType" 
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly || type === 'date'"
        :autocomplete="autocomplete"
        :class="[
          'w-full py-4 pt-6 px-3 bg-[#1A1A1B09] border-[0.5px] border-transparent focus:outline-none focus:ring-1 focus:ring-[#3BAB22] focus:border-[#3BAB22] transition-all duration-300',
          roundedClasses,
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          type === 'date' ? 'cursor-pointer' : '',
          (hasError || (errorMessage && showError)) ? 'border-[0.5px] ring-red-500 border-red-500' : ''
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="handleInputClick"
        @keydown="$emit('keydown', $event)"
        @keyup="$emit('keyup', $event)"
      />
      
      <!-- Password toggle button -->
      <button 
        v-if="type === 'password'"
        type="button" 
        @click="togglePasswordVisibility" 
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-20"
        :tabindex="-1"
      >
        <svg v-if="showPassword" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.70467 5.97342C2.0876 5.71812 2.605 5.82161 2.8603 6.20455C2.88214 6.23575 2.94429 6.3243 2.99039 6.38677C3.08266 6.51177 3.22232 6.69407 3.40606 6.91456C3.77446 7.35664 4.31504 7.94619 5.00091 8.53404C6.3858 9.72112 8.28184 10.8335 10.5002 10.8335C12.7187 10.8335 14.6144 9.72112 15.9993 8.53404C16.6852 7.94619 17.2257 7.35664 17.5942 6.91456C17.7779 6.69407 17.9176 6.51177 18.0098 6.38677C18.0559 6.3243 18.1181 6.23575 18.1399 6.20455C18.3952 5.82161 18.9127 5.71812 19.2956 5.97342C19.6785 6.22872 19.782 6.74611 19.5267 7.12905L19.522 7.13572C19.4885 7.1836 19.403 7.30584 19.3508 7.37652C19.2412 7.52494 19.0814 7.73327 18.8746 7.98153C18.4617 8.47696 17.8564 9.13737 17.084 9.79954C15.5522 11.1125 13.2818 12.5001 10.5002 12.5001C7.71866 12.5001 5.44805 11.1125 3.91625 9.79954C3.1438 9.13737 2.53855 8.47696 2.1257 7.98153C1.9188 7.73327 1.75899 7.52494 1.64944 7.37652C1.59463 7.30227 1.50297 7.17109 1.47354 7.12905C1.21825 6.74611 1.32173 6.22872 1.70467 5.97342Z" fill="#7A7A7A"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.42276 8.57746C4.74819 8.90287 4.74819 9.43054 4.42276 9.75596L2.75609 11.4226C2.43065 11.748 1.90301 11.748 1.57757 11.4226C1.25214 11.0972 1.25214 10.5695 1.57757 10.2441L3.24424 8.57746C3.56968 8.25201 4.09731 8.25201 4.42276 8.57746ZM16.5776 8.57746C16.903 8.25201 17.4307 8.25201 17.7561 8.57746L19.4227 10.2441C19.7482 10.5695 19.7482 11.0972 19.4227 11.4226C19.0973 11.748 18.5697 11.748 18.2442 11.4226L16.5776 9.75596C16.2522 9.43054 16.2522 8.90287 16.5776 8.57746ZM8.42891 10.5355C8.82356 10.7723 8.9515 11.2841 8.71474 11.6788L7.46474 13.7621C7.22795 14.1568 6.71606 14.2847 6.32141 14.048C5.92676 13.8111 5.7988 13.2993 6.03559 12.9046L7.28559 10.8213C7.52238 10.4266 8.03426 10.2987 8.42891 10.5355ZM12.5714 10.5355C12.9661 10.2987 13.4779 10.4266 13.7147 10.8213L14.9647 12.9046C15.2015 13.2993 15.0736 13.8111 14.6789 14.048C14.2842 14.2847 13.7724 14.1568 13.5356 13.7621L12.2856 11.6788C12.0488 11.2841 12.1767 10.7723 12.5714 10.5355Z" fill="#7A7A7A"/>
        </svg>
        <svg 
          v-else 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>
      
      <!-- Calendar icon for date input -->
      <button 
        v-if="type === 'date'"
        type="button" 
        @click="toggleDatePicker" 
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#3BAB22] transition-colors z-20"
        :tabindex="-1"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </button>
      
      <!-- Custom right slot for other icons/buttons -->
      <div 
        v-if="$slots.right && type !== 'password' && type !== 'date'" 
        class="absolute right-3 top-1/2 transform -translate-y-1/2 z-20"
      >
        <slot name="right" />
      </div>
    </div>
    
    <!-- Custom Date Picker -->
    <Transition name="slide-fade">
      <div 
        v-if="showDatePicker && type === 'date'"
        ref="datePickerRef"
        class="absolute z-50 mt-2 bg-white rounded-xl shadow-lg border-[0.5px] border-gray-50 p-4 w-80"
      >
        <!-- Date Picker Header -->
        <div class="flex items-center justify-between mb-4">
          <button 
            type="button"
            @click="previousMonth" 
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div class="flex items-center gap-2">
            <select 
              v-model="currentMonth" 
              class="px-2 py-1 border-[0.5px] border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#3BAB22]"
            >
              <option v-for="(month, idx) in months" :key="idx" :value="idx">{{ month }}</option>
            </select>
            
            <select 
              v-model="currentYear" 
              class="px-2 py-1 border-[0.5px] border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#3BAB22]"
            >
              <option v-for="year in yearRange" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
          
          <button 
            type="button"
            @click="nextMonth" 
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        
        <!-- Week Days -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div 
            v-for="day in weekDays" 
            :key="day" 
            class="text-center text-xs font-medium text-gray-500 py-2"
          >
            {{ day }}
          </div>
        </div>
        
        <!-- Calendar Days -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="(day, idx) in calendarDays"
            :key="idx"
            type="button"
            :disabled="!day.isCurrentMonth"
            :class="[
              'p-2 text-sm rounded-lg transition-all duration-200',
              day.isCurrentMonth ? 'hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed',
              day.isToday ? 'border border-[#3BAB22]' : '',
              day.isSelected ? 'bg-[#3BAB22] text-white hover:bg-[#2d8a1a]' : '',
              !day.isCurrentMonth ? 'opacity-40' : ''
            ]"
            @click="selectDate(day)"
          >
            {{ day.date }}
          </button>
        </div>
        
        <!-- Quick Actions -->
        <div class="mt-4 pt-4 border-t-[0.5px] border-gray-50 flex justify-between items-center">
          <button 
            type="button"
            @click="selectToday" 
            class="text-sm text-[#3BAB22] hover:text-[#2d8a1a] font-medium transition-colors"
          >
            Today
          </button>
          <button 
            type="button"
            @click="clearDate" 
            class="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useId, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue?: string | number
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number' | 'date'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  autocomplete?: string
  errorMessage?: string
  showError?: boolean
  position?: 'top' | 'middle' | 'bottom' | 'standalone'
  hasError?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  autocomplete: 'off',
  errorMessage: '',
  showError: true,
  position: 'standalone',
  hasError: false
})

interface Emits {
  'update:modelValue': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'keydown': [event: KeyboardEvent]
  'keyup': [event: KeyboardEvent]
}

const emit = defineEmits<Emits>()

// State
const isFocused = ref(false)
const showPassword = ref(false)
const showDatePicker = ref(false)
const inputId = useId()
const datePickerRef = ref<HTMLElement | null>(null)

// Date picker state
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Computed
const computedType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  if (props.type === 'date') {
    return 'text'
  }
  return props.type
})

const displayValue = computed(() => {
  if (props.type === 'date' && props.modelValue) {
    return formatDateForDisplay(props.modelValue as string)
  }
  return props.modelValue
})

const roundedClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return 'rounded-t-xl rounded-b-sm'
    case 'middle':
      return 'rounded-sm'
    case 'bottom':
      return 'rounded-b-xl rounded-t-sm'
    case 'standalone':
    default:
      return 'rounded-xl'
  }
})

const yearRange = computed(() => {
  const currentYearVal = new Date().getFullYear()
  const years = []
  for (let i = currentYearVal - 100; i <= currentYearVal + 10; i++) {
    years.push(i)
  }
  return years
})

interface CalendarDay {
  date: number
  fullDate: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

const calendarDays = computed<CalendarDay[]>(() => {
  const year = currentYear.value
  const month = currentMonth.value
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevLastDay = new Date(year, month, 0)
  
  const firstDayOfWeek = firstDay.getDay()
  const lastDate = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()
  
  const days: CalendarDay[] = []
  
  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = prevLastDate - i
    days.push({
      date,
      fullDate: new Date(year, month - 1, date),
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    })
  }
  
  // Current month days
  const today = new Date()
  const selectedDate = props.modelValue ? new Date(props.modelValue as string) : null
  
  for (let i = 1; i <= lastDate; i++) {
    const fullDate = new Date(year, month, i)
    const isToday = 
      today.getDate() === i &&
      today.getMonth() === month &&
      today.getFullYear() === year
    
    const isSelected = selectedDate
      ? selectedDate.getDate() === i &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year
      : false
    
    days.push({
      date: i,
      fullDate,
      isCurrentMonth: true,
      isToday,
      isSelected
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      fullDate: new Date(year, month + 1, i),
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    })
  }
  
  return days
})

// Methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleInputClick = () => {
  if (props.type === 'date') {
    toggleDatePicker()
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value
  
  if (showDatePicker.value && props.modelValue) {
    const date = new Date(props.modelValue as string)
    currentMonth.value = date.getMonth()
    currentYear.value = date.getFullYear()
  }
}

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const selectDate = (day: CalendarDay) => {
  if (!day.isCurrentMonth) return
  
  const dateStr = formatDateForModel(day.fullDate)
  emit('update:modelValue', dateStr)
  showDatePicker.value = false
}

const selectToday = () => {
  const today = new Date()
  const dateStr = formatDateForModel(today)
  emit('update:modelValue', dateStr)
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
  showDatePicker.value = false
}

const clearDate = () => {
  emit('update:modelValue', '')
  showDatePicker.value = false
}

const formatDateForDisplay = (dateStr: string): string => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return date.toLocaleDateString('en-US', options)
}

const formatDateForModel = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Click outside to close date picker
const handleClickOutside = (event: MouseEvent) => {
  if (datePickerRef.value && !datePickerRef.value.contains(event.target as Node)) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement
    if (inputElement && !inputElement.contains(event.target as Node)) {
      showDatePicker.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Expose methods
defineExpose({
  focus: () => {
    const input = document.getElementById(inputId) as HTMLInputElement
    input?.focus()
  },
  blur: () => {
    const input = document.getElementById(inputId) as HTMLInputElement
    input?.blur()
  }
})
</script>

<style scoped>
input:focus {
  border-color: #3BAB22;
}

.input-container {
  position: relative;
}

.input-container label {
  background: transparent;
  padding: 0 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.input-container input {
  position: relative;
  z-index: 0;
}

/* Date picker transitions */
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
</style>