<template>
    <div class="min-h-screen bg-gray-25">
      <div class="bg-black w-full flex justify-center items-center py-6">
        <div>
          <img src="@/assets/img/logo-white.png" class="w-44 object-cover" />
        </div>
      </div>
      <div class="flex justify-center items-center mt-10">
        <div class="max-w-6xl rounded-lg w-full p-8 flex space-x-8">
          <!-- Left Section -->
          <div class="w-1/3 border-r border-gray-200 pr-8">
            <div class="border-b pb-3 border-gray-100">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">
                Get started with CODE-RED for Business
              </h2>
              <p class="text-gray-500 mb-2">
                Provide your business details so we can get the best package for
                your business.
              </p>
              <p class="text-sm">
                Already have an account?
                <a href="#" class="text-green-500 font-semibold">Login</a>
              </p>
            </div>
  
            <!-- Step navigation -->
            <ul class="mt-6 space-y-4">
              <li v-for="(step, index) in steps" :key="index" class="flex items-center space-x-2">
                <span
                  :class="activeStep === index ? 'text-green-500 font-semibold' : 'text-gray-400'"
                  class="text-base"
                >
                  {{ step }}
                </span>
              </li>
            </ul>
          </div>
  
          <!-- Right Section (Form) -->
          <div class="w-2/3 bg-white rounded-md p-6">
            <h3 class="text-xl font-medium text-gray-900 border-b pb-3 mb-6">
              {{ steps[activeStep] }}:
            </h3>
  
            <form @submit.prevent="handleNext">
              <transition name="slide-fade">
                <div v-if="activeStep === 0" key="step-1">
    
                  <div class="space-y-4">
                    <div>
                      <label for="hospital/clinic" class="input-label">Hospital/Clinic Name</label>
                      <input
                        v-model="form.firstName"
                        type="text"
                        id="hospital/clinic"
                        class="input-field"
                        placeholder="Enter hospital/clinic name"
                      />
                    </div>
                    <div>
                      <label for="contact-information" class="input-label">Contact Information (Phone, Email)</label>
                      <input
                        v-model="form.lastName"
                        type="text"
                        id="contact-information"
                        class="input-field"
                        placeholder="Enter contact information"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label for="address" class="input-label">Address/Location (Precise GPS coordinates or address for accurate routing)</label>
                      <input
                        v-model="form.email"
                        type="text"
                        id="address"
                        class="input-field"
                        placeholder="Enter Address"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label for="website" class="input-label">Website (if available)</label>
                      <div class="flex mt-2">
                        <input
                          v-model="form.phone"
                          type="url"
                          id="website"
                          class="input-field"
                          placeholder="Enter hospital website"
                        />
                      </div>
                    </div>
  
                    <div class="md:col-span-2">
                      <label for="operatingHours" class="input-label">Operating Hours (24/7 or specific hours)</label>
                      <div class="flex mt-2">
                        <input
                          v-model="form.phone"
                          type="text"
                          id="operatingHours"
                          class="input-field"
                          placeholder="Enter operating hours"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </transition>

              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 1" key="step-2">
    
                  <div class="space-y-4">
                    <div>
                      <label for="businessName" class="input-label">Type of Facility (e.g., general hospital, specialty clinic, trauma center)</label>
                      <input
                        v-model="form.businessName"
                        type="text"
                        id="businessName"
                        class="input-field"
                        placeholder="Enter business name"
                      />
                    </div>
                    <div>
                      <label for="industry" class="input-label">Available Specialties (cardiology, neurology, etc.)</label>
                      <input
                        v-model="form.industry"
                        type="text"
                        id="industry"
                        class="input-field"
                        placeholder="Enter industry"
                      />
                    </div>
                    <div>
                      <label for="industry" class="input-label">Emergency Services (Yes/No)</label>
                      <input
                        v-model="form.industry"
                        type="text"
                        id="industry"
                        class="input-field"
                        placeholder="Enter industry"
                      />
                    </div>
                    <div>
                      <label for="industry" class="input-label">Capacity (Number of emergency beds, ICUs, etc.)</label>
                      <input
                        v-model="form.industry"
                        type="text"
                        id="industry"
                        class="input-field"
                        placeholder="Enter industry"
                      />
                    </div>
                    <div>
                      <label for="industry" class="input-label">On-Call Specialties and Emergency Equipment (Ambulances, defibrillators, etc.)</label>
                      <input
                        v-model="form.industry"
                        type="text"
                        id="industry"
                        class="input-field"
                        placeholder="Enter industry"
                      />
                    </div>
                  </div>
                </div>
              </transition>
      
              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 2" key="step-3">
      
                  <div class="space-y-4">
                    <div>
                      <label for="password" class="input-label">Emergency Contact Number (Direct line for emergencies)</label>
                      <input
                        v-model="form.password"
                        type="password"
                        id="password"
                        class="input-field"
                        placeholder="Enter password"
                      />
                    </div>
                    <div>
                      <label for="confirmPassword" class="input-label">Emergency Department (If available, with direct routing)</label>
                      <input
                        v-model="form.confirmPassword"
                        type="password"
                        id="confirmPassword"
                        class="input-field"
                        placeholder="Confirm password"
                      />
                    </div>
  
                    <div>
                      <label for="confirmPassword" class="input-label">Doctor on Duty Contact (if applicable)</label>
                      <input
                        v-model="form.confirmPassword"
                        type="password"
                        id="confirmPassword"
                        class="input-field"
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                </div>
              </transition>
      
              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 3" key="step-4">
    
                  <div class="space-y-4">
                    <div>
                      <label for="branchName" class="input-label">Accepted Insurance Providers</label>
                      <input
                        v-model="form.branchName"
                        type="text"
                        id="branchName"
                        class="input-field"
                        placeholder="Enter branch name"
                      />
                    </div>
  
                    <div>
                      <label for="branchName" class="input-label">Emergency Payment Policies (Cash, Insurance, Credit, etc.)</label>
                      <input
                        v-model="form.branchName"
                        type="text"
                        id="branchName"
                        class="input-field"
                        placeholder="Enter branch name"
                      />
                    </div>
                  </div>
                </div>
              </transition>
      
              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 4" key="step-5">
    
                  <div class="grid grid-cols-1 gap-6">
                    <div>
                      <label for="workShifts" class="input-label">Expected Response Time (how fast the hospital can respond to emergencies)</label>
                      <input
                        v-model="form.workShifts"
                        type="text"
                        id="workShifts"
                        class="input-field"
                        placeholder="Enter work shifts"
                      />
                    </div>
                  </div>
                </div>
              </transition>
      
              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 5" key="step-6">
    
                  <div class="space-y-4">
                    <div>
                      <label for="importStaff" class="input-label">Dedicated Point of Contact (for collaboration and emergencies)</label>
                      <input
                        v-model="form.importStaff"
                        type="text"
                        id="importStaff"
                        class="input-field"
                        placeholder="Enter staff details"
                      />
                    </div>
  
                    <div>
                      <label for="importStaff" class="input-label">Communication Protocols (how they prefer to receive and respond to emergency cases)</label>
                      <input
                        v-model="form.importStaff"
                        type="text"
                        id="importStaff"
                        class="input-field"
                        placeholder="Enter staff details"
                      />
                    </div>
                  </div>
                </div>
              </transition>
  
              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 6" key="step-7">
    
                  <div class="space-y-4">
                    <div>
                      <label for="importStaff" class="input-label">Air Ambulance (if applicable)</label>
                      <input
                        v-model="form.importStaff"
                        type="text"
                        id="importStaff"
                        class="input-field"
                        placeholder="Enter staff details"
                      />
                    </div>
  
                    <div>
                      <label for="importStaff" class="input-label">Telemedicine Services (for pre-arrival communication)</label>
                      <input
                        v-model="form.importStaff"
                        type="text"
                        id="importStaff"
                        class="input-field"
                        placeholder="Enter staff details"
                      />
                    </div>
                  </div>
                </div>
              </transition>

              <transition name="slide-fade" mode="out-in">
                <div  v-if="activeStep === 7" key="step-8">
    
                  <div class="space-y-4">
                    <div>
                      <label for="importStaff" class="input-label">Air Ambulance (if applicable)</label>
                      <input
                        v-model="form.importStaff"
                        type="text"
                        id="importStaff"
                        class="input-field"
                        placeholder="Enter staff details"
                      />
                    </div>
  
                    <div>
                      <label for="importStaff" class="input-label">Telemedicine Services (for pre-arrival communication)</label>
                      <input
                        v-model="form.importStaff"
                        type="text"
                        id="importStaff"
                        class="input-field"
                        placeholder="Enter staff details"
                      />
                    </div>
                  </div>
                </div>
              </transition>
  
              <!-- <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 1" key="step-2">
                  <div class="grid grid-cols-1 gap-6">
                    <div>
                      <label for="facilityType" class="input-label">Type of Facility</label>
                      <input
                        v-model="form.businessName"
                        type="text"
                        id="facilityType"
                        class="input-field"
                        placeholder="e.g., General hospital, Trauma center"
                      />
                    </div>
                    <div>
                      <label for="specialties" class="input-label">Available Specialties</label>
                      <input
                        v-model="form.industry"
                        type="text"
                        id="specialties"
                        class="input-field"
                        placeholder="e.g., Cardiology, Neurology"
                      />
                    </div>
                  </div>
                </div>
              </transition> -->
  
              <!-- Repeat similar blocks for other steps -->
  
              <div class="mt-10 flex justify-between w-full gap-x-6">
                <button
                  type="button"
                  v-if="activeStep > 0"
                  @click="handlePrevious"
                  class="bg-gray-300 w-full text-black px-4 py-3.5 text-sm rounded-md hover:bg-gray-400"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  class="bg-black w-full text-white px-4 py-3.5 text-sm rounded-md"
                >
                  {{ activeStep === steps.length - 1 ? 'Submit' : 'Continue' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    password: '',
    confirmPassword: '',
    branchName: '',
    workShifts: '',
    importStaff: '',
  });
  const isFormIncomplete = ref(true);
  
  watch(
    form,
    (newForm) => {
      isFormIncomplete.value = !(newForm.firstName && newForm.lastName && newForm.email && newForm.phone);
    },
    { deep: true }
  );
  
  const activeStep = ref(0);
  const router = useRouter();
  const route = useRoute();
  
  const steps = [
    'Basic Information',
    'Medical Services',
    'Emergency Contact Points',
    'Insurance and Payment',
    'Response Time',
    'Partnership and Communication Channels',
    'Special Facilities or Capabilities',
    'Affiliated Ambulance Services:'
  ];
  
  onMounted(() => {
    const stepFromQuery = Number(route.query.step);
    if (stepFromQuery >= 0 && stepFromQuery < steps.length) {
      activeStep.value = stepFromQuery;
    }
  });
  
  watch(activeStep, (newStep) => {
    router.push({ query: { step: newStep.toString() } });
  });
  
  function handleNext() {
    if (activeStep.value < steps.length - 1) {
      activeStep.value++;
    } else {
      console.log("Form submitted:", form.value);
      // Add form submission logic here
    }
  }
  
  function handlePrevious() {
    if (activeStep.value > 0) {
      activeStep.value--;
    }
  }
  </script>
  
  <style scoped>
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: translateX(10px);
  }
  </style>
  