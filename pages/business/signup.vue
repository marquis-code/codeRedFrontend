<template>
    <div class="min-h-screen bg-gray-25">
      <div class="bg-black w-full flex justify-center items-center py-6">
        <div>
          <img src="@/assets/img/logo-white.png" class="w-44 object-cover" />
        </div>
      </div>
      <div class="flex justify-center items-center mt-10">
        <div class="max-w-6xl rounded-lg w-full p-8 lg:flex lg:space-x-8">

          <div class="lg:w-1/3 w-full hidden lg:block border-r border-gray-200 pr-8">
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
          <div class="lg:w-2/3 w-full bg-white rounded-md p-3 lg:p-6">
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
                        v-model="payload.hospitalName"
                        type="text"
                        id="hospital/clinic"
                        class="input-field"
                      />
                    </div>
                    <div>
                      <label for="contact-information" class="input-label">Contact Information (Phone, Email)</label>
                      <input
                        v-model="payload.contactInformation"
                        type="text"
                        id="contact-information"
                        class="input-field"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label for="address" class="input-label">Address/Location (Precise GPS coordinates or address for accurate routing)</label>
                      <input
                        v-model="payload.address"
                        type="text"
                        id="address"
                        class="input-field"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label for="website" class="input-label">Website (if available)</label>
                      <div class="flex mt-2">
                        <input
                        v-model="payload.website"
                          type="url"
                          id="website"
                          class="input-field"
                        />
                      </div>
                    </div>
  
                    <div class="md:col-span-2">
                      <label for="operatingHours" class="input-label">Operating Hours (24/7 or specific hours)</label>
                      <div class="flex mt-2">
                        <input
                        v-model="payload.operatingHours"
                          type="text"
                          id="operatingHours"
                          class="input-field"
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
                      v-model="payload.facilityType"
                        type="text"
                        id="businessName"
                        class="input-field"
                      />
                    </div>
                    <div>
                      <label for="industry" class="input-label">Available Specialties (cardiology, neurology, etc.)</label>
                      <input
                        v-model="payload.availableSpecialties"
                        type="text"
                        id="industry"
                        class="input-field"
                      />
                    </div>
                    <div>
                      <label for="industry" class="input-label">Emergency Services (Yes/No)</label>
                      <input
                        v-model="payload.emergencyServices"
                        type="text"
                        id="industry"
                        class="input-field"
                      />
                    </div>
                    <div>
                      <label for="industry" class="input-label">Capacity (Number of emergency beds, ICUs, etc.)</label>
                      <input
                        v-model="payload.capacity"
                        type="text"
                        id="industry"
                        class="input-field"
                      />
                    </div>
                    <div>
                      <label for="industry" class="input-label">On-Call Specialties and Emergency Equipment (Ambulances, defibrillators, etc.)</label>
                      <input
                        v-model="payload.emergencyEquipment"
                        type="text"
                        id="industry"
                        class="input-field"
                      />
                    </div>
                  </div>
                </div>
              </transition>
      
              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 2" key="step-3">
      
                  <div class="space-y-4">
                    <div>
                      <label for="emergency-contact" class="input-label">Emergency Contact Number (Direct line for emergencies)</label>
                      <input
                        v-model="payload.emergencyContactNumber"
                        type="text"
                        id="emergency-contact"
                        class="input-field"
                      />
                    </div>
                    <div>
                      <label for="emergency-dept" class="input-label">Emergency Department (If available, with direct routing)</label>
                      <input
                        v-model="payload.emergencyDepartment"
                        type="text"
                        id="emergency-dept"
                        class="input-field"
                      />
                    </div>
  
                    <div>
                      <label for="doc-on-duty" class="input-label">Doctor on Duty Contact (if applicable)</label>
                      <input
                        v-model="payload.doctorOnDutyContact"
                        type="text"
                        id="doc-on-duty"
                        class="input-field"
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
                        v-model="payload.acceptedInsuranceProviders"
                        type="text"
                        id="branchName"
                        class="input-field"
                      />
                    </div>
  
                    <div>
                      <label for="branchName" class="input-label">Emergency Payment Policies (Cash, Insurance, Credit, etc.)</label>
                      <input
                        v-model="payload.emergencyPaymentPolicies"
                        type="text"
                        id="branchName"
                        class="input-field"
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
                        v-model="payload.expectedResponseTime"
                        type="text"
                        id="workShifts"
                        class="input-field"
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
                        v-model="payload.dedicatedPointOfContact"
                        type="text"
                        id="importStaff"
                        class="input-field"
                      />
                    </div>
  
                    <div>
                      <label for="importStaff" class="input-label">Communication Protocols (how they prefer to receive and respond to emergency cases)</label>
                      <input
                        v-model="payload.communicationProtocols"
                        type="text"
                        id="importStaff"
                        class="input-field"
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
                        v-model="payload.airAmbulance"
                        type="text"
                        id="importStaff"
                        class="input-field"
                      />
                    </div>
  
                    <div>
                      <label for="importStaff" class="input-label">Telemedicine Services (for pre-arrival communication)</label>
                      <input
                        v-model="payload.telemedicineServices"
                        type="text"
                        id="importStaff"
                        class="input-field"
                      />
                    </div>
                  </div>
                </div>
              </transition>

              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 7" key="step-8">
    
                  <div class="space-y-4">
                    <div>
                      <label for="importStaff" class="input-label">Password</label>
                      <input
                        v-model="payload.password"
                        type="password"
                        id="password"
                        class="input-field"
                      />
                    </div>
  
                    <div>
                      <label for="importStaff" class="input-label">Confirm Password</label>
                      <input
                        type="password"
                        id="confirm-password"
                        class="input-field"
                      />
                    </div>
                  </div>
                </div>
              </transition>
  
              <div class="mt-10 flex justify-between w-full gap-x-6">
                <button
                 :disabled="loading"
                  type="button"
                  v-if="activeStep > 0"
                  @click="handlePrevious"
                  class="bg-gray-300 w-full disabled:cursor-not-allowed disabled:opacity-25 text-black px-4 py-3.5 text-sm rounded-md hover:bg-gray-400"
                >
                  Go Back
                </button>
                <button
                  :disabled="loading"
                  type="submit"
                  class="bg-black w-full disabled:cursor-not-allowed disabled:opacity-25 text-white px-4 py-3.5 text-sm rounded-md"
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
import { useCreateCompany } from '@/composables/modules/company/signup';
const { createCompany, payload, loading } = useCreateCompany();

const isFormIncomplete = ref(true);

watch(
  payload,
  (newPayload) => {
    // Check if critical fields are filled
    isFormIncomplete.value = !(
      newPayload.hospitalName &&
      newPayload.contactInformation &&
      newPayload.address &&
      newPayload.website &&
      newPayload.operatingHours
    );
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
  'Security Information'
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
    console.log("Form submitted:", payload.value);
    createCompany(); // Call createCompany composable function here to handle submission
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