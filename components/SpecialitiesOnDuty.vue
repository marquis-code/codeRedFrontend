<template>
    <div class="mt-4">
      <!-- Input Label -->
      <!-- <label for="doc-on-duty" class="input-label">Doctor on Duty</label> -->
  
      <!-- Add Doctor Form -->
      <div class="mt-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Doctor's Name -->
        <input
          v-model="newDoctor.name"
          type="text"
          id="doc-name"
          class="input-field text-sm"
          placeholder="Enter Doctor's Name"
        />
        <!-- Department -->
        <input
          v-model="newDoctor.department"
          type="text"
          id="doc-department"
          class="input-field text-sm"
          placeholder="Enter Department"
        />
        <!-- Phone Number -->
        <input
          v-model="newDoctor.phone"
          type="text"
          id="doc-phone"
          class="input-field text-sm"
          placeholder="Enter Phone Number"
        />
        <!-- Add Button -->
        <div
          @click="addDoctor"
          class="bg-black text-sm cursor-pointer text-center text-white px-4 py-2.5 rounded-lg md:col-span-1"
        >
          Add Doctor
        </div>
      </div>
  
      <!-- Display Doctors -->
      <div v-if="doctors.length" class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(doctor, index) in doctors"
          :key="index"
          class="flex flex-col bg-gray-100 p-4 rounded-lg shadow"
        >
          <div v-if="editableIndex === index">
            <input
              v-model="editableDoctor.name"
              type="text"
              class="input-field mb-2 text-sm"
              placeholder="Doctor's Name"
            />
            <input
              v-model="editableDoctor.department"
              type="text"
              class="input-field mb-2 text-sm"
              placeholder="Department"
            />
            <input
              v-model="editableDoctor.phone"
              type="text"
              class="input-field mb-2 text-sm"
              placeholder="Phone Number"
            />
            <button
              @click="saveEdit(index)"
              class="bg-green-500  text-sm text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
          <div class="space-y-2" v-else>
            <p class="text-gray-800 text-sm font-semibold">Name: {{ doctor.name }}</p>
            <p class="text-gray-700 text-sm">Department: {{ doctor.department }}</p>
            <p class="text-gray-700 text-sm">Phone: {{ doctor.phone }}</p>
            <div class="mt-2 flex justify-end gap-2">
              <button
                @click="editDoctor(index)"
                class="text-blue-500 font-semibold text-sm hover:underline"
              >
                Edit
              </button>
              <button
                @click="deleteDoctor(index)"
                class="text-red-500 font-semibold text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Empty State -->
      <div v-else class="mt-4 text-gray-500 text-center">
        No doctors on duty added yet.
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  
  // Reactive state
  interface Doctor {
    name: string;
    department: string;
    phone: string;
  }
  
  const doctors = ref<Doctor[]>([]); // Array to store doctors
  const newDoctor = ref<Doctor>({ name: "", department: "", phone: "" }); // Input for new doctor
  const editableIndex = ref<number | null>(null); // Tracks which doctor is being edited
  const editableDoctor = ref<Doctor>({ name: "", department: "", phone: "" }); // Temp value for the doctor being edited
  
  const emit = defineEmits(['doctors'])
  // Add a new doctor
  const addDoctor = () => {
    if (newDoctor.value.name.trim() && newDoctor.value.department.trim() && newDoctor.value.phone.trim()) {
      doctors.value.push({ ...newDoctor.value });
      emit('doctors', doctors.value)
      newDoctor.value = { name: "", department: "", phone: "" }; // Clear input fields
    } else {
      alert("Please fill out all fields before adding a doctor.");
    }
  };

  // Define available options
const options = ref([
  { name: "Ambulances", value: false },
  { name: "Defibrillators", value: false },
  { name: "Ventilators", value: false },
]);

// Track selected options
const selectedOptions = computed(() =>
  options.value.filter(option => option.value).map(option => option.name)
);

// Track user inputs for selected options
const selectedOptionsDetails = ref<Record<string, string>>({});

// Add new keys when options are selected
watch(
  selectedOptions,
  newSelectedOptions => {
    // Add entries for new selected options
    newSelectedOptions.forEach(option => {
      if (!selectedOptionsDetails.value[option]) {
        selectedOptionsDetails.value[option] = "";
      }
    });

    // Remove entries for unselected options
    Object.keys(selectedOptionsDetails.value).forEach(option => {
      if (!newSelectedOptions.includes(option)) {
        delete selectedOptionsDetails.value[option];
      }
    });
  },
  { deep: true }
);
  
  // Edit an existing doctor
  const editDoctor = (index: number) => {
    editableIndex.value = index;
    editableDoctor.value = { ...doctors.value[index] };
    emit('doctors', doctors.value)
  };
  
  // Save edits to a doctor
  const saveEdit = (index: number) => {
    if (editableDoctor.value.name.trim() && editableDoctor.value.department.trim() && editableDoctor.value.phone.trim()) {
      doctors.value[index] = { ...editableDoctor.value };
      emit('doctors', doctors.value)
      editableIndex.value = null; // Exit edit mode
      editableDoctor.value = { name: "", department: "", phone: "" }; // Clear temp values
    } else {
      alert("Please fill out all fields before saving.");
    }
  };
  
  // Delete a doctor
  const deleteDoctor = (index: number) => {
    doctors.value.splice(index, 1);
  };
  </script>
  
  