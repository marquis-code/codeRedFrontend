<script lang="ts" setup>
import { ref, computed, watch, defineEmits } from "vue";

// Emit the final data to the parent
const emit = defineEmits<{
  (e: "update", emergencyEquipment: { name: string; details: string }[]): void;
}>();

// Options for emergency equipment
const options = ref([
  { name: "Ambulances", value: false },
  { name: "Defibrillators", value: false },
  { name: "Ventilators", value: false },
]);

// Payload for emergency equipment
const emergencyEquipment = ref<{ name: string; details: string }[]>([]);

// Track selected options
const selectedOptions = computed(() =>
  options.value.filter(option => option.value).map(option => option.name)
);

// Watch for changes in selected options
watch(
  selectedOptions,
  newSelectedOptions => {
    // Add new selected options to emergencyEquipment
    newSelectedOptions.forEach(option => {
      if (!emergencyEquipment.value.find(item => item.name === option)) {
        emergencyEquipment.value.push({ name: option, details: "" });
      }
    });

    // Remove deselected options from emergencyEquipment
    emergencyEquipment.value = emergencyEquipment.value.filter(item =>
      newSelectedOptions.includes(item.name)
    );

    // Emit updated data
    emit("update", emergencyEquipment.value);
  },
  { deep: true }
);

// Function to manually add emergency equipment
const addEmergencyEquipment = (name: string) => {
  if (name && !emergencyEquipment.value.find(item => item.name === name)) {
    emergencyEquipment.value.push({ name, details: "" });
    emit("update", emergencyEquipment.value); // Emit updated data
  }
};

// Temporary state for manually adding equipment
const newEquipmentName = ref("");
</script>

<template>
  <div class="lg:p-6 bg-white border-[0.5px] border-gray-50 rounded-lg">
    <!-- Checkbox Options -->
    <div class="mb-2">
      <h2
        class="text-sm font-semibold text-gray-700 mb-3 border-b-[0.5px] border-gray-100 pb-3 px-4 pt-3"
      >
        Select Equipment:
      </h2>
      <div class="grid grid-cols-2 gap-4 p-3">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="flex items-center space-x-2"
        >
          <input
            type="checkbox"
            id="option.name"
            v-model="option.value"
            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            :for="option.name"
            class="text-gray-700 font-medium cursor-pointer input-label"
          >
            {{ option.name }}
          </label>
        </div>
      </div>
    </div>

    <!-- Dynamic Input Fields -->
    <div v-if="emergencyEquipment.length > 0" class="mb-3">
      <h2 class="text-sm font-semibold text-gray-700 mb-3 px-4 border-[0.5px] border-gray-100 py-3">
        Provide Details for Selected Equipment:
      </h2>
      <div class="space-y-4 p-3">
        <div
          v-for="equipment in emergencyEquipment"
          :key="equipment.name"
        >
          <label
            :for="equipment.name"
            class="block text-sm font-medium text-gray-600 mb-1"
          >
            {{ equipment.name }}
          </label>
          <input
            :id="equipment.name"
            type="text"
            v-model="equipment.details"
            @input="emit('update', emergencyEquipment)"
            class="w-full px-4 py-2 border-none outline-none input-field rounded-md text-gray-700"
            :placeholder="'Enter details for ' + equipment.name"
          />
        </div>
      </div>
    </div>

    <!-- Add Emergency Equipment Manually -->
    <div class="p-3 border-t-[0.5px] border-gray-100">
      <h2 class="text-sm font-semibold text-gray-700 mb-3">Add Equipment:</h2>
      <div class="flex items-center space-x-2">
        <input
          type="text"
          v-model="newEquipmentName"
          placeholder="Enter equipment name"
          class="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-blue-300 focus:border-blue-500"
        />
        <div
          @click="addEmergencyEquipment(newEquipmentName); newEquipmentName = ''"
          class="px-4 py-2 cursor-pointer outline-none border-none bg-black text-sm text-white font-medium rounded-md"
        >
          Add
        </div>
      </div>
    </div>
  </div>
</template>
