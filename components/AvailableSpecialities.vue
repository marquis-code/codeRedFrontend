<template>
    <div>
      <!-- Input Field -->
      <label for="industry" class="input-label">Available Specialties (cardiology, neurology, etc.)</label>
      <div class="flex items-center mt-2">
        <input
          v-model="newSpecialty"
          type="text"
          id="industry"
          class="input-field"
          placeholder="Enter a specialty (e.g., Cardiology)"
        />
        <div
          @click="addSpecialty"
          class="ml-2 bg-black text-xs cursor-pointer text-white px-4 py-3 rounded-lg"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </div>
      </div>
  
      <!-- Display Specialties -->
      <div v-if="availableSpecialties.length" class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(specialty, index) in availableSpecialties"
          :key="index"
          class="flex items-center bg-gray-100 px-6 py-2 rounded-lg shadow border"
        >
          <input
            v-if="editableIndex === index"
            v-model="editableSpecialty"
            type="text"
            class="input-field w-full mr-2"
          />
          <span v-else class="flex-1 text-gray-700 text-sm">{{ specialty }}</span>
          <button
            v-if="editableIndex === index"
            @click="saveEdit(index)"
            class="text-green-500 hover:underline text-sm mr-2"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          </button>
          <button
            v-else
            @click="editSpecialty(index)"
            class="text-blue-500 hover:underline text-sm mr-2"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a90e2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
          </button>
          <button
            @click="deleteSpecialty(index)"
            class="text-red-500 hover:underline text-sm"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d0021b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
      <div v-else class="border-[0.5px] flex mt-3 flex-col text-gray-500 justify-center items-center text-sm rounded-lg py-6 border-gray-100">
            <img src="@/assets/icons/illustration.svg" alt="No operating hours illustration" />
            <p>No specialties added yet.</p>
        </div>
  
      <!-- Empty State -->
      <!-- <div v-else class="mt-4 text-gray-500 text-center">
        No specialties added yet.
      </div> -->
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  
  // Reactive state
  const availableSpecialties = ref<string[]>([]); // Array to store specialties
  const newSpecialty = ref<string>(""); // Input for new specialty
  const editableIndex = ref<number | null>(null); // Tracks which specialty is being edited
  const editableSpecialty = ref<string>(""); // Temp value for the specialty being edited
  const emit = defineEmits(['speciality'])
  // Add a new specialty
  const addSpecialty = () => {
    if (newSpecialty.value.trim()) {
      availableSpecialties.value.push(newSpecialty.value.trim());
      newSpecialty.value = ""; // Clear input field
      emit('speciality', availableSpecialties.value)
    } else {
      alert("Please enter a valid specialty");
    }
  };
  
  // Edit an existing specialty
  const editSpecialty = (index: number) => {
    editableIndex.value = index;
    editableSpecialty.value = availableSpecialties.value[index];
    emit('speciality', availableSpecialties.value)
  };
  
  // Save edits to a specialty
  const saveEdit = (index: number) => {
    if (editableSpecialty.value.trim()) {
      availableSpecialties.value[index] = editableSpecialty.value.trim();
      emit('speciality', availableSpecialties.value)
      editableIndex.value = null; // Exit edit mode
      editableSpecialty.value = ""; // Clear temp value
    } else {
      alert("Please enter a valid specialty");
    }
  };
  
  // Delete a specialty
  const deleteSpecialty = (index: number) => {
    availableSpecialties.value.splice(index, 1);
    emit('speciality', availableSpecialties.value)
  };
  </script>
  
  