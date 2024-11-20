<template>
    <div class="min-h-screen bg-gray-25">
      <div class="bg-black w-full flex justify-center items-center py-6">
        <div>
          <img src="@/assets/img/logo-white.png" class="w-44 object-cover" />
        </div>
      </div>
      <div class="flex justify-center items-center mt-10">
        <div class="max-w-6xl rounded-lg w-full p-3 lg:p-8 lg:flex lg:space-x-8">

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
                      <!-- <input
                        v-model="payload.address"
                        type="text"
                        id="address"
                        class="input-field"
                      /> -->
                      <Autocomplete 
                        :modelValue="payloadObj" 
                        @update:modelValue="updateLocation"
                      />
                    <!-- <div class="info">
                      <p>Selected Address: {{ payloadObj.address }}</p>
                      <p>Latitude: {{ payloadObj.latitude }}</p>
                      <p>Longitude: {{ payloadObj.longitude }}</p>
                    </div> -->
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
                      <OperatingHours @update-operating-hours="updateOperatingHours" />
                      <!-- <OperatingHours /> -->
                      <!-- <div class="flex mt-2">
                        <input
                        v-model="payload.operatingHours"
                          type="text"
                          id="operatingHours"
                          class="input-field"
                        />
                      </div>
                      <VueDatePicker v-model="time" :is-24="false" time-picker disable-time-range-validation range placeholder="Select Time" /> -->
                    </div>
                  </div>
                </div>
              </transition>

              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 1" key="step-2">
    
                  <div class="space-y-4">
                    <div>
                      <label for="businessName" class="input-label">Type of Facility (e.g., general hospital, specialty clinic, trauma center)</label>
                      <select
                      v-model="payload.facilityType"
                      id="facilityType"
                      class="input-field mt-2 text-sm"
                    >
                      <option value="" disabled>Select Facility Type</option>
                      <option v-for="facility in facilityTypes" :key="facility" :value="facility">
                        {{ facility }}
                      </option>
                    </select>
                    </div>
                    <div>                   
                      <AvailableSpecialities @speciality="handleSpeciality" />
                    </div>
                    <div>
                      <label for="emergency-servivce" class="input-label">Emergency Services (Yes/No)</label>
                      <select
                      v-model="payload.emergencyServices"
                      id="emergency-servivce"
                      class="input-field mt-2 text-sm"
                    >
                      <option value="" disabled>Do you offer ermergency services</option>
                      <option value="Yes">
                        Yes
                      </option>
                      <option value="No">
                       No
                      </option>
                    </select>
                    </div>
                    <div>
                      <label for="capcity" class="input-label">Capacity (Number of emergency beds, ICUs, etc.)</label>
                      <input
                        v-model="payload.capacity"
                        type="number"
                        id="capcity"
                        class="input-field"
                      />
                    </div>
                    <div>
                      <label for="industry" class="input-label">On-Call Specialties and Emergency Equipment (Ambulances, defibrillators, etc.)</label>
  
                      <EquipmentSelector @update="handleUpdate" />

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
                        type="number"
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
                      <!-- <input
                        v-model="payload.doctorOnDutyContact"
                        type="text"
                        id="doc-on-duty"
                        class="input-field"
                      /> -->
                      <SpecialitiesOnDuty @doctors="handleDoctors" />
                    </div>
                  </div>
                </div>
              </transition>
      
              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 3" key="step-4">
    
                  <div class="space-y-4">
                    <div>
                      <label for="branchName" class="input-label">Accepted Insurance Providers</label>
                      <!-- <input
                        v-model="payload.acceptedInsuranceProviders"
                        type="text"
                        id="branchName"
                        class="input-field"
                      /> -->
                      <select
                        id="insuranceProviders"
                        v-model="payload.acceptedInsuranceProviders"
                        multiple
                        class="mt-1 input-field block w-full border border-gray-300 rounded-md p-2"
                      >
                        <option
                          v-for="provider in insuranceProvidersInNigeria"
                          :key="provider.value"
                          :value="provider.value"
                        >
                          {{ provider.label }}
                        </option>
                      </select>
                    </div>
  
                    <div>
                      <label for="branchName" class="input-label">Emergency Payment Policies (Cash, Insurance, Credit, etc.)</label>
                      <!-- <input
                        v-model="payload.emergencyPaymentPolicies"
                        type="text"
                        id="branchName"
                        class="input-field"
                      /> -->
                      <div class="space-y-2">
      <div>
        <input 
          type="checkbox" 
          id="policy_cash" 
          value="Cash" 
          v-model="payload.emergencyPaymentPolicies"
          class="mr-2"
        />
        <label for="policy_cash">Cash</label>
      </div>
      <div>
        <input 
          type="checkbox" 
          id="policy_insurance" 
          value="Insurance" 
          v-model="payload.emergencyPaymentPolicies"
          class="mr-2"
        />
        <label for="policy_insurance">Insurance</label>
      </div>
      <div>
        <input 
          type="checkbox" 
          id="policy_credit" 
          value="Credit" 
         v-model="payload.emergencyPaymentPolicies"
          class="mr-2"
        />
        <label for="policy_credit">Credit</label>
      </div>
      <div>
        <input 
          type="checkbox" 
          id="policy_other" 
          value="Other" 
          v-model="payload.emergencyPaymentPolicies"
          class="mr-2"
        />
        <label for="policy_other">Other</label>
      </div>
    </div>
                    </div>
                  </div>
                </div>
              </transition>
      
              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 4" key="step-5">
    
                  <div class="grid grid-cols-1 gap-6">
                    <div>
                      <label for="workShifts" class="input-label">Expected Response Time (how fast the hospital can respond to emergencies)</label>
                      <!-- <input
                        v-model="payload.expectedResponseTime"
                        type="text"
                        id="workShifts"
                        class="input-field"
                      /> -->
                      <div class="space-y-2 pt-3">
    <div>
      <input 
        type="radio" 
        id="5_minutes" 
        name="responseTime" 
        value="5_minutes"
       v-model="payload.expectedResponseTime"
        class="mr-2"
      />
      <label for="5_minutes">Within 5 minutes</label>
    </div>
    <div>
      <input 
        type="radio" 
        id="10_minutes" 
        name="responseTime" 
        value="10_minutes"
       v-model="payload.expectedResponseTime"
        class="mr-2"
      />
      <label for="10_minutes">Within 10 minutes</label>
    </div>
    <div>
      <input 
        type="radio" 
        id="30_minutes" 
        name="responseTime" 
        value="30_minutes"
       v-model="payload.expectedResponseTime"
        class="mr-2"
      />
      <label for="30_minutes">Within 30 minutes</label>
    </div>
    <div>
      <input 
        type="radio" 
        id="1_hour" 
        name="responseTime" 
        value="1_hour"
       v-model="payload.expectedResponseTime"
        class="mr-2"
      />
      <label for="1_hour">Within 1 hour</label>
    </div>
    <div>
      <input 
        type="radio" 
        id="more_than_1_hour" 
        name="responseTime" 
        value="more_than_1_hour"
       v-model="payload.expectedResponseTime"
        class="mr-2"
      />
      <label for="more_than_1_hour">More than 1 hour</label>
    </div>
  </div>
                    </div>
                  </div>
                </div>
              </transition>
      
              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 5" key="step-6">
    
                  <div class="space-y-4">
                    <div>
                      <label for="importStaff" class="input-label">Dedicated Point of Contact (for collaboration and emergencies)</label>
                      <!-- <input
                        v-model="payload.dedicatedPointOfContact"
                        type="text"
                        id="importStaff"
                        class="input-field"
                      /> -->
                      <select 
                      v-model="payload.dedicatedPointOfContact"
  id="contactRole" 
  class="mt-1 block w-full input-field text-sm border border-gray-300 rounded-md p-2"
>
  <option value="team_lead">Team Lead</option>
  <option value="project_manager">Project Manager</option>
  <option value="emergency_coordinator">Emergency Coordinator</option>
  <option value="general_contact">General Contact</option>
</select>
                    </div>
  
                    <div>
                      <label for="importStaff" class="input-label">Communication Protocols (how they prefer to receive and respond to emergency cases)</label>
                      <!-- <input
                        v-model="payload.communicationProtocols"
                        type="text"
                        id="importStaff"
                        class="input-field"
                      /> -->
                      <select
                       v-model="payload.communicationProtocols"
                      id="emergency-servivce"
                      class="input-field mt-2 text-sm"
                    >
                    <option value="phone_call">Phone Call</option>
                    <option value="sms">Text Message (SMS)</option>
                    <option value="email">Email</option>
                    <option value="mobile_app">Mobile App Notification</option>
                    <option value="radio">Radio Communication</option>
                    <option value="web_portal">Web Portal</option>
                    </select>
                    </div>
                  </div>
                </div>
              </transition>
  
              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 6" key="step-7">
    
                  <div class="space-y-4">
                    <div>
                      <label for="importStaff" class="input-label">Air Ambulance (if applicable)</label>
                      <select
                       v-model="payload.airAmbulance"
                      id="emergency-servivce"
                      class="input-field mt-2 text-sm"
                    >
                      <option value="Yes">
                        Yes
                      </option>
                      <option value="No">
                       No
                      </option>
                    </select>
                    </div>
  
                    <div>
                      <label for="importStaff" class="input-label">Telemedicine Services (for pre-arrival communication)</label>
                      <select
                      v-model="payload.telemedicineServices"
                      id="emergency-servivce"
                      class="input-field mt-2 text-sm"
                    >
                      <option value="Yes">
                        Yes
                      </option>
                      <option value="No">
                       No
                      </option>
                    </select>
                    </div>
                  </div>
                </div>
              </transition>

              <transition name="slide-fade" mode="out-in">
                <div v-if="activeStep === 7" key="step-8">
    
                  <div class="space-y-4">
                    <div class="relative">
                      <label for="importStaff" class="input-label">Password</label>
                      <input
                        v-model="payload.password"
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        class="input-field"
                      />
                      <div
              @click="toggleShowPassword"
              class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer"
            >
              <svg
                v-if="!showPassword"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669"
                  stroke="#1D2739"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M12.5 11.25L13.75 13.3333"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.6665 9.16669L18.3332 10.8334"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.6665 10.8334L3.33317 9.16669"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 11.25L6.25 13.3333"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
    
              <svg
                v-if="showPassword"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z"
                  stroke="#1D2739"
                  stroke-width="2"
                />
                <path
                  d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
              </svg>
            </div>
                    </div>
  
                    <div class="relative" >
                      <label for="importStaff" class="input-label">Confirm Password</label>
                      <input
                      :type="showConfirm ? 'text' : 'password'"
                        type="password"
                        id="confirm-password"
                        class="input-field"
                      />
                      <div
              @click="toggleConfirm"
              class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer"
            >
              <svg
                v-if="!showConfirm"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669"
                  stroke="#1D2739"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M12.5 11.25L13.75 13.3333"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.6665 9.16669L18.3332 10.8334"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.6665 10.8334L3.33317 9.16669"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 11.25L6.25 13.3333"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
    
              <svg
                v-if="showConfirm"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z"
                  stroke="#1D2739"
                  stroke-width="2"
                />
                <path
                  d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
              </svg>
            </div>
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
                  <span v-if="!loading">{{ activeStep === steps.length - 1 ? 'Submit' : 'Continue' }}</span>

                  {{loading ? 'processing...' : 'Submit'}}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </template>

   <script setup lang="ts">
   import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
import { useCreateCompany } from '@/composables/modules/company/signup';
import OperatingHours from '@/components/OperatingHours.vue';
import SpecialitiesOnDuty from '@/components/SpecialitiesOnDuty.vue';
const { createCompany, payload, loading } = useCreateCompany();

const isFormIncomplete = ref(true);
const time = ref(null);
const emergencyEquipmentData = ref<{ name: string; details: string }[]>([]);

// Handle emitted data
const handleUpdate = (data: { name: string; details: string }[]) => {
  emergencyEquipmentData.value = data;
  payload.value.emergencyEquipment = data
};

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

const insuranceProvidersInNigeria = ref([
  { value: "aiico", label: "AIICO Insurance" },
  { value: "leadway", label: "Leadway Assurance" },
  { value: "custodian", label: "Custodian and Allied Insurance" },
  { value: "axamansard", label: "AXA Mansard Insurance" },
  { value: "mutual_benefits", label: "Mutual Benefits Assurance" },
  { value: "cornerstone", label: "Cornerstone Insurance" },
  { value: "industrial_general", label: "Industrial and General Insurance (IGI)" },
  { value: "niger", label: "Niger Insurance" },
  { value: "nsia", label: "NSIA Insurance" },
  { value: "royal_exchange", label: "Royal Exchange Assurance" },
]);


const facilityTypes = ref([
  "General Hospital",
  "Specialty Clinic",
  "Trauma Center",
  "Urgent Care Center",
  "Rehabilitation Center",
  "Primary Care Center",
  "Mental Health Facility",
  "Children's Hospital",
  "Outpatient Surgery Center",
  "Diagnostic Imaging Center",
  "Dental Clinic",
  "Orthopedic Center",
  "Cancer Treatment Center",
  "Dialysis Center",
  "Maternity and Women's Health Center",
  "Pediatric Care Center",
  "Cardiology Clinic",
  "Neurology Clinic",
  "Geriatric Care Facility",
  "Pharmacy and Medication Center",
  "Veterinary Clinic",
  "Home Health Care Services",
  "Hospice and Palliative Care Center",
  "Physical Therapy Center",
  "Sports Medicine Clinic",
  "Eye Care and Vision Center",
  "ENT (Ear, Nose, Throat) Clinic",
  "Allergy and Immunology Center",
  "Dermatology Clinic",
  "Plastic Surgery Center",
  "Endoscopy Center",
  "Respiratory Care Center",
  "Sleep Disorder Center",
  "Pain Management Clinic",
  "Radiology and Imaging Center",
  "Occupational Health Clinic",
  "Laboratory and Diagnostic Services",
  "Sexual Health and Family Planning Clinic",
  "Community Health Center",
  "HIV/AIDS Treatment Center",
  "Integrative Medicine Clinic",
  "Chiropractic Center",
  "Weight Loss and Wellness Clinic",
]);

const payloadObj = ref({
  address: '',
  latitude: 0,
  longitude: 0,
});

// const handleSpeciality = (item: any) => {
//   payload.value.availableSpecialties = item.availableSpecialties
// }

const handleSpeciality = (item: any) => {
  // Ensure doctorOnDutyContact is initialized as an array
  if (!Array.isArray(payload.value.availableSpecialties)) {
    payload.value.availableSpecialties = [];
  }
  
  // Push the incoming item into the array
  payload.value.availableSpecialties.push(item);
};

const updateLocation = (location: { address: string; latitude: any; longitude: any}) => {
  payloadObj.value.address = location.address;
  payloadObj.value.latitude = location.latitude;
  payloadObj.value.longitude = location.longitude;
  payload.value.address = location.address
  payload.value.latitude = location.latitude
  payload.value.longitude = location.longitude
};

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

const parentOperatingHours = ref([]);

const handleDoctors = (item: any) => {
  // Ensure doctorOnDutyContact is initialized as an array
  if (!Array.isArray(payload.value.doctorOnDutyContact)) {
    payload.value.doctorOnDutyContact = [];
  }
  
  // Push the incoming item into the array
  payload.value.doctorOnDutyContact.push(item);
};

const updateOperatingHours = (hours: any) => {
  payload.value.operatingHours = hours;
};

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

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirm = () => {
  showConfirm.value = !showConfirm.value;
};
  const showPassword = ref(false);
  const showConfirm = ref(false)

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