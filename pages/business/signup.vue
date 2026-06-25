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
            <!-- Step 1: Basic Information -->
            <transition name="slide-fade">
              <div v-if="activeStep === 0" key="step-1" class="space-y-4">
                <AnimatedInput
                  v-model="payload.hospitalName"
                  label="Hospital/Clinic Name"
                  type="text"
                  position="standalone"
                />

                <AnimatedInput
                v-model="payload.email"
                label="Email Address"
                type="email"
                position="standalone"
              />
                
                <AnimatedInput
                  v-model="payload.contactInformation"
                  label="Contact Information (Phone, Email)"
                  type="text"
                  position="standalone"
                />
                
                <div>
                  <label class="input-label">Address/Location (Precise GPS coordinates or address for accurate routing)</label>
                  <!-- <Autocomplete 
                    :modelValue="payloadObj" 
                    @update:modelValue="updateLocation"
                  /> -->
                  <AddressAutocomplete 
                    :modelValue="payloadObj"
                    @update:modelValue="updateLocation"
                  />
                </div>
                
                <AnimatedInput
                  v-model="payload.website"
                  label="Website (if available)"
                  type="url"
                  position="standalone"
                />

                <div>
                  <OperatingHours @update-operating-hours="updateOperatingHours" />
                </div>
              </div>
            </transition>

            <!-- Step 2: Medical Services -->
            <transition name="slide-fade" mode="out-in">
              <div v-if="activeStep === 1" key="step-2" class="space-y-4">
                <SelectInput
                  v-model="payload.facilityType"
                  label="Type of Facility"
                  :options="facilityTypeOptions"
                  position="standalone"
                />
                
                <div>
                  <AvailableSpecialities @speciality="handleSpeciality" />
                </div>
                
                <SelectInput
                  v-model="payload.emergencyServices"
                  label="Emergency Services (Yes/No)"
                  :options="yesNoOptions"
                  position="standalone"
                />
                
                <AnimatedInput
                  v-model="payload.capacity"
                  label="Capacity (Number of emergency beds, ICUs, etc.)"
                  type="number"
                  position="standalone"
                />
                
                <div>
                  <label class="input-label">On-Call Specialties and Emergency Equipment (Ambulances, defibrillators, etc.)</label>
                  <EquipmentSelector @update="handleUpdate" />
                </div>
              </div>
            </transition>

            <!-- Step 3: Emergency Contact Points -->
            <transition name="slide-fade" mode="out-in">
              <div v-if="activeStep === 2" key="step-3" class="space-y-4">
                <AnimatedInput
                  v-model="payload.emergencyContactNumber"
                  label="Emergency Contact Number (Direct line for emergencies)"
                  type="tel"
                  position="standalone"
                />
                
                <AnimatedInput
                  v-model="payload.emergencyDepartment"
                  label="Emergency Department (If available, with direct routing)"
                  type="text"
                  position="standalone"
                />

                <div>
                  <label class="input-label">Doctor on Duty Contact (if applicable)</label>
                  <SpecialitiesOnDuty @doctors="handleDoctors" />
                </div>
              </div>
            </transition>

            <!-- Step 4: Insurance and Payment -->
            <transition name="slide-fade" mode="out-in">
              <div v-if="activeStep === 3" key="step-4" class="space-y-4">
                      <MultiSelectInput
        v-model="payload.acceptedInsuranceProviders"
        :options="insuranceProvidersInNigeria"
        label="Accepted Insurance Providers"
        placeholder="Select insurance providers..."
      />
                <!-- <div>
                  <label class="input-label">Accepted Insurance Providers</label>
                  <select
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
                </div> -->

                <div>
                  <label class="input-label">Emergency Payment Policies (Cash, Insurance, Credit, etc.)</label>
                  <div class="space-y-2 mt-2">
                    <div v-for="policy in paymentPolicies" :key="policy">
                      <input 
                        type="checkbox" 
                        :id="`policy_${policy.toLowerCase()}`"
                        :value="policy"
                        v-model="payload.emergencyPaymentPolicies"
                        class="custom-checkbox mr-1"
                      />
                      <label class="text-sm"  :for="`policy_${policy.toLowerCase()}`">{{ policy }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <!-- Step 5: Response Time -->
            <transition name="slide-fade" mode="out-in">
              <div v-if="activeStep === 4" key="step-5" class="space-y-4">
                <div>
                  <label class="input-label">Expected Response Time (how fast the hospital can respond to emergencies)</label>
                  <div class="space-y-2 pt-3">
                    <div v-for="time in responseTimeOptions" :key="time.value">
                      <input 
                        type="radio" 
                        :id="time.value"
                        name="responseTime" 
                        :value="time.value"
                        v-model="payload.expectedResponseTime"
                        class="mr-2"
                      />
                      <label :for="time.value">{{ time.label }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <!-- Step 6: Partnership and Communication Channels -->
            <transition name="slide-fade" mode="out-in">
              <div v-if="activeStep === 5" key="step-6" class="space-y-4">
                <SelectInput
                  v-model="payload.dedicatedPointOfContact"
                  label="Dedicated Point of Contact (for collaboration and emergencies)"
                  :options="pointOfContactOptions"
                  position="standalone"
                />

                <SelectInput
                  v-model="payload.communicationProtocols"
                  label="Communication Protocols (how they prefer to receive and respond to emergency cases)"
                  :options="communicationProtocolOptions"
                  position="standalone"
                />
              </div>
            </transition>

            <!-- Step 7: Special Facilities or Capabilities -->
            <transition name="slide-fade" mode="out-in">
              <div v-if="activeStep === 6" key="step-7" class="space-y-4">
                <SelectInput
                  v-model="payload.airAmbulance"
                  label="Air Ambulance (if applicable)"
                  :options="yesNoOptions"
                  position="standalone"
                />

                <SelectInput
                  v-model="payload.telemedicineServices"
                  label="Telemedicine Services (for pre-arrival communication)"
                  :options="yesNoOptions"
                  position="standalone"
                />
              </div>
            </transition>

            <!-- Step 8: Security Information -->
            <transition name="slide-fade" mode="out-in">
              <div v-if="activeStep === 7" key="step-8" class="space-y-4">
                <AnimatedInput
                  v-model="payload.password"
                  label="Password"
                  type="password"
                  position="standalone"
                />

                <AnimatedInput
                  v-model="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  position="standalone"
                />
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
                <span v-else>Processing...</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCreateCompany } from '@/composables/modules/hospitals/signup';
import OperatingHours from '@/components/OperatingHours.vue';
import SpecialitiesOnDuty from '@/components/SpecialitiesOnDuty.vue';
import AvailableSpecialities from '@/components/AvailableSpecialities.vue';
import EquipmentSelector from '@/components/EquipmentSelector.vue';
import AnimatedInput from '@/components/ui/AnimatedInput.vue';
import SelectInput from '@/components/ui/SelectInput.vue';

const { createCompany, payload, loading } = useCreateCompany();

const activeStep = ref(0);
const router = useRouter();
const route = useRoute();
const confirmPassword = ref('');

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

const payloadObj = ref({
  address: '',
  latitude: 0,
  longitude: 0,
});

// Formatted options for SelectInput
const facilityTypeOptions = computed(() => {
  const types = [
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
  ];
  
  return types.map(type => ({ label: type, value: type }));
});

const yesNoOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
];

const pointOfContactOptions = [
  { label: 'Team Lead', value: 'team_lead' },
  { label: 'Project Manager', value: 'project_manager' },
  { label: 'Emergency Coordinator', value: 'emergency_coordinator' },
  { label: 'General Contact', value: 'general_contact' }
];

const communicationProtocolOptions = [
  { label: 'Phone Call', value: 'phone_call' },
  { label: 'Text Message (SMS)', value: 'sms' },
  { label: 'Email', value: 'email' },
  { label: 'Mobile App Notification', value: 'mobile_app' },
  { label: 'Radio Communication', value: 'radio' },
  { label: 'Web Portal', value: 'web_portal' }
];

const responseTimeOptions = [
  { label: 'Within 5 minutes', value: '5_minutes' },
  { label: 'Within 10 minutes', value: '10_minutes' },
  { label: 'Within 30 minutes', value: '30_minutes' },
  { label: 'Within 1 hour', value: '1_hour' },
  { label: 'More than 1 hour', value: 'more_than_1_hour' }
];

const paymentPolicies = ['Cash', 'Insurance', 'Credit', 'Other'];

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

const handleSpeciality = (items: string[] | string) => {
  if (!Array.isArray(payload.value.availableSpecialties)) {
    payload.value.availableSpecialties = [];
  }
  
  // If items is an array, spread it; otherwise, push the single item
  if (Array.isArray(items)) {
    payload.value.availableSpecialties.push(...items); // Use spread operator
  } else {
    payload.value.availableSpecialties.push(items);
  }
};

// const handleSpeciality = (item: any) => {
//   if (!Array.isArray(payload.value.availableSpecialties)) {
//     payload.value.availableSpecialties = [];
//   }
//   payload.value.availableSpecialties.push(item);
// };

const updateLocation = (location: { address: string; latitude: any; longitude: any}) => {
  payloadObj.value.address = location.address;
  payloadObj.value.latitude = location.latitude;
  payloadObj.value.longitude = location.longitude;
  payload.value.address = location.address;
  payload.value.latitude = location.latitude;
  payload.value.longitude = location.longitude;
};

const handleDoctors = (items: any[] | any) => {
  if (!Array.isArray(payload.value.doctorOnDutyContact)) {
    payload.value.doctorOnDutyContact = [];
  }
  
  // If items is an array, spread it; otherwise, push the single item
  if (Array.isArray(items)) {
    payload.value.doctorOnDutyContact.push(...items); // Use spread operator
  } else {
    payload.value.doctorOnDutyContact.push(items);
  }
};

// const handleDoctors = (item: any) => {
//   if (!Array.isArray(payload.value.doctorOnDutyContact)) {
//     payload.value.doctorOnDutyContact = [];
//   }
//   payload.value.doctorOnDutyContact.push(item);
// };

const updateOperatingHours = (hours: any) => {
  payload.value.operatingHours = hours;
};

const handleUpdate = (data: { name: string; details: string }[]) => {
  payload.value.emergencyEquipment = data;
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
    createCompany();
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
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>