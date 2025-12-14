<template>
    <div class="">
      <div class="md:col-span-2">
    <div class="lg:flex justify-between items-center">
        <label for="operatingHours" class="input-label pb-3 lg:pb-0">Operating Hours (24/7 or specific hours)</label>
        <div
          @click="showModal = true"
          class="mt-6 py-2.5 inline lg:block  text-xs bg-black max-w-xs cursor-pointer text-white px-4 py-2 rounded-md"
        >
          Add Operating Hours
        </div>
    </div>
      </div>
  
      <!-- Modal -->
      <Teleport to="body">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white m-2 rounded-lg space-y-4 w-full max-w-lg">
            <h2 class="text-lg font-semibold px-6 py-4 mb-4 border-b-[0.5px] border-gray-100">Add Operating Hours</h2>
            <div class="mb-6 px-6 ">
              <SelectInput
                v-model="newOperatingHour.day"
                label="Day"
                :options="dayOptions"
                position="standalone"
              />
            </div>
            <div class="mb-4 px-6 ">
              <label for="timeRange" class="block mb-2 text-sm font-semibold">Time Range</label>
              <VueDatePicker
                v-model="newOperatingHour.time"
                :is-24="false"
                time-picker
                disable-time-range-validation
                range
                placeholder="Select Time Range"
                class="custom-input"
              />
            </div>
            <div class="flex justify-end pt-6 p-6  gap-4 w-full">
              <button
                @click="showModal = false"
                class="bg-gray-500 py-3 w-full text-sm text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                @click="addOperatingHour"
                class="bg-black py-3 w-full text-sm text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Teleport>
  
      <!-- Display Operating Hours -->
     <!-- Display Operating Hours -->
<div>
  <div v-if="operatingHours.length" class="mt-5">
    <h3 class="text-base font-medium mb-3">Operating Hours</h3>
    <ul class="space-y-2">
      <li
        v-for="(hour, index) in operatingHours"
        :key="index"
        class="flex text-sm justify-between items-center bg-gray-100 px-4 py-3 rounded-lg"
      >
        <span>{{ hour.day }}: {{ formatTimeRange(hour.time) }}</span>
        <button
          @click="removeOperatingHour(index)"
          class="text-red-500 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d0021b"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </li>
    </ul>
  </div>

  <div v-else class="border-[0.5px] flex mt-3 mt-8 flex-col text-gray-500 justify-center items-center text-sm rounded-lg py-6 border-gray-100">
    <img src="@/assets/icons/illustration.svg" alt="No operating hours illustration" />
    <p>No Operating Hours added.</p>
  </div>
</div>

    </div>
  </template>
  
  <!-- <script lang="ts" setup>
  import { ref, computed } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import SelectInput from '@/components/ui/SelectInput.vue';
  
  interface OperatingHour {
    day: string;
    time: { start: Date; end: Date } | null;
  }
  
  const showModal = ref(false);
  const operatingHours = ref<OperatingHour[]>([]);
  const newOperatingHour = ref<OperatingHour>({
    day: '',
    time: null,
  });
  
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const dayOptions = computed(() => {
    return days.map(day => ({ label: day, value: day }));
  });

  // Utility function to format time
const formatTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Emit event to parent
const emit = defineEmits<{
  (e: 'update-operating-hours', hours: { day: string; startTime: string; endTime: string }[]): void;
}>();

  
  const addOperatingHour = () => {
    if (newOperatingHour.value.day && newOperatingHour.value.time) {
      operatingHours.value.push({ ...newOperatingHour.value });
      // newOperatingHour.value = { day: '', time: null }; // Clear fields
  // Emit updated operating hours in the required format
  const formattedHours = operatingHours.value.map((hour) => ({
      day: hour.day,
      startTime: formatTime(hour.time!.start),
      endTime: formatTime(hour.time!.end),
    }));

    emit('update-operating-hours', formattedHours);
    newOperatingHour.value = { day: '', time: null }; // Clear fields
      // emit('update-operating-hours', operatingHours.value); // Emit updated operating hours
      showModal.value = false; // Close modal
    } else {
      alert('Please select both day and time range.');
    }
  };
  
  const removeOperatingHour = (index: number) => {
    operatingHours.value.splice(index, 1);
 // Emit updated operating hours in the required format
 const formattedHours = operatingHours.value.map((hour) => ({
    day: hour.day,
    startTime: formatTime(hour.time!.start),
    endTime: formatTime(hour.time!.end),
  }));

  emit('update-operating-hours', formattedHours);
  };
  
  const formatTimeRange = (time: { start: Date; end: Date } | null) => {
    if (!time) return '';
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const start = new Intl.DateTimeFormat('en-US', options).format(time.start);
    const end = new Intl.DateTimeFormat('en-US', options).format(time.end);
    return `${start} - ${end}`;
  };
  </script> -->
  
  <script lang="ts" setup>
import { ref, computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import SelectInput from '@/components/ui/SelectInput.vue';

interface OperatingHour {
  day: string;
  time: { start: Date; end: Date } | null;
}

const showModal = ref(false);
const operatingHours = ref<OperatingHour[]>([]);
const newOperatingHour = ref<OperatingHour>({
  day: '',
  time: null,
});

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const dayOptions = computed(() => {
  return days.map(day => ({ label: day, value: day }));
});

// Utility function to format time to 24-hour format (HH:MM)
const formatTime24Hour = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Utility function to format time for display (12-hour format)
const formatTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Emit event to parent with correct field names
const emit = defineEmits<{
  (e: 'update-operating-hours', hours: { day: string; open: string; close: string; is24Hours: boolean }[]): void;
}>();

const addOperatingHour = () => {
  if (newOperatingHour.value.day && newOperatingHour.value.time) {
    operatingHours.value.push({ ...newOperatingHour.value });
    
    // Emit updated operating hours in the correct format
    const formattedHours = operatingHours.value.map((hour) => ({
      day: hour.day,
      open: formatTime24Hour(hour.time!.start),   // Use "open" instead of "startTime"
      close: formatTime24Hour(hour.time!.end),    // Use "close" instead of "endTime"
      is24Hours: false                             // Add is24Hours field
    }));

    emit('update-operating-hours', formattedHours);
    newOperatingHour.value = { day: '', time: null };
    showModal.value = false;
  } else {
    alert('Please select both day and time range.');
  }
};

const removeOperatingHour = (index: number) => {
  operatingHours.value.splice(index, 1);
  
  // Emit updated operating hours in the correct format
  const formattedHours = operatingHours.value.map((hour) => ({
    day: hour.day,
    open: formatTime24Hour(hour.time!.start),
    close: formatTime24Hour(hour.time!.end),
    is24Hours: false
  }));

  emit('update-operating-hours', formattedHours);
};

const formatTimeRange = (time: { start: Date; end: Date } | null) => {
  if (!time) return '';
  const start = formatTime(time.start);
  const end = formatTime(time.end);
  return `${start} - ${end}`;
};
</script>

  <style>
  /* Add any custom styles if needed */
  </style>