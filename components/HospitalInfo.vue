<template>
  <div class="lg:p-4 flex flex-col justify-center h-full">
    <div class="p-3 lg:p-10 flex flex-col justify-between h-full bg-white space-y-10 lg:space-y-0">
      <div class="flex mb-6 items-center">
        <NuxtLink to="/" class="text-2xl">←</NuxtLink>
        <div class="flex-grow text-center text-2xl font-bold">
          <div class="flex justify-center items-center">
            <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="" />
          </div>
        </div>
      </div>
      <div>

<!--        <h2 class="text-2xl font-bold mb-4">Distance & ETA</h2>-->

        <div
            :class="{
            'bg-green-100 border-green-400': hospital.availability === 'available',
            'bg-red-100 border-red-400': hospital.availability === 'unavailable',
            'bg-blue-100 border-blue-400': hospital.availability === 'busy',
          }"
            class="border-[0.5px] rounded-lg py-6 p-5 space-y-5 bg-[#FFF9F9CC] shadow">
          <span :class="{
            'bg-[#0FB259] text-white border-green-400': hospital.availability === 'available',
            'bg-[#FF2020] text-white border-red-400': hospital.availability === 'unavailable',
            'bg-[#0D60D8] text-white border-blue-400': hospital.availability === 'busy',
          }"
              class="text-white text-sm px-2 py-1 rounded-full px-6">{{ selectedHospitalData.availability }}</span>
          <div class="flex justify-between flex-col">
            <!-- <span class="text-[5px]">{{selectedHospitalData}}</span> -->
            <h1
                :class="{
            'text-[#0FB259] ': hospital.availability === 'available',
            'text-[#FF2020]': hospital.availability === 'unavailable',
            'text-[#0D60D8] ': hospital.availability === 'busy',
          }"
                class="text-lg lg:text-3xl font-semibold">
              <!-- {{ hospital.name }} {{ selectedHospital }} -->
              {{selectedHospitalData?.name ||selectedHospitalData?.hospitalName}}
            </h1>
<!--            {{hospital}}-->
            <div class="text-sm lg:text-base text-gray-500 lg:-mt-3 max-w-xs">{{ hospital?.formatted_address || hospital?.vicinity || selectedHospitalData?.address || 'Nil' }}</div>
            <!-- <span class="bg-red-500 text-white text-sm px-2 py-1 rounded-full px-6">{{ hospital.status }}</span> -->
          </div>
        </div>
        <div class="grid grid-cols-1 mt-10 gap-4 lg:grid-cols-2 lg:gap-6">
          <div class="bg-[#FFF9F9CC] shadow space-y-6 rounded-lg p-5">
            <div>
              <p class="text- text-gray-500">From your location</p>
              <h2 class="text-2xl lg:text-3xl mt-6 font-semibold text-black mt-2">Estimated Time Of Arrival</h2>
            </div>
            <div class="flex items-end mt-4">
              <span class="text-5xl lg:text-7xl font-bold text-red-600">{{ eta }}</span>
              <span class="text-lg text-red-600 ml-2">mins</span>
            </div>
          </div>
          <div class="rounded-lg space-y-3">
            <div class="py-10 bg-[#CC1100] shadow-xl rounded-lg p-5">
<!--              <button class="flex items-start gap-3">-->
<!--                <svg width="50" height="50" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                  <g clip-path="url(#clip0_431_175)">-->
<!--                    <path-->
<!--                        d="M8.55083 13.9371C10.4108 17.5925 13.4075 20.5762 17.0629 22.4492L19.9046 19.6075C20.2533 19.2587 20.77 19.1425 21.2221 19.2975C22.6688 19.7754 24.2317 20.0338 25.8333 20.0338C26.5437 20.0338 27.125 20.615 27.125 21.3254V25.8333C27.125 26.5437 26.5437 27.125 25.8333 27.125C13.7046 27.125 3.875 17.2954 3.875 5.16667C3.875 4.45625 4.45625 3.875 5.16667 3.875H9.6875C10.3979 3.875 10.9792 4.45625 10.9792 5.16667C10.9792 6.78125 11.2375 8.33125 11.7154 9.77792C11.8575 10.23 11.7542 10.7337 11.3925 11.0954L8.55083 13.9371Z"-->
<!--                        fill="white"-->
<!--                    />-->
<!--                  </g>-->
<!--                  <defs>-->
<!--                    <clipPath id="clip0_431_175">-->
<!--                      <rect width="31" height="31" fill="white" />-->
<!--                    </clipPath>-->
<!--                  </defs>-->
<!--                </svg>-->
<!--                <span class="text-3xl font-bold text-white">CALL EMERGENCY</span>-->
<!--              </button>-->
              <button class="flex items-start gap-3" @click="makeEmergencyCall">
                <svg width="50" height="50" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_431_175)">
                    <path
                        d="M8.55083 13.9371C10.4108 17.5925 13.4075 20.5762 17.0629 22.4492L19.9046 19.6075C20.2533 19.2587 20.77 19.1425 21.2221 19.2975C22.6688 19.7754 24.2317 20.0338 25.8333 20.0338C26.5437 20.0338 27.125 20.615 27.125 21.3254V25.8333C27.125 26.5437 26.5437 27.125 25.8333 27.125C13.7046 27.125 3.875 17.2954 3.875 5.16667C3.875 4.45625 4.45625 3.875 5.16667 3.875H9.6875C10.3979 3.875 10.9792 4.45625 10.9792 5.16667C10.9792 6.78125 11.2375 8.33125 11.7154 9.77792C11.8575 10.23 11.7542 10.7337 11.3925 11.0954L8.55083 13.9371Z"
                        fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_431_175">
                      <rect width="31" height="31" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span class="text-3xl font-bold text-white">CALL EMERGENCY</span>
              </button>

            </div>
            <div class="py-10  bg-[#FFF9F9CC] shadow rounded-lg p-5">

              <div class="flex flex-col">
                <span class="block text-gray-600">From your location</span>
                <h2 class="text-2xl font-medium mt-3">Distance</h2>
              </div>
              <div class="flex items-center mt-6">
                <span class="text-5xl lg:text-7xl font-bold  text-[#CC1100]">{{ distance }}</span>
                <span class="ml-2 text-sm lg:text-lg text-[#CC1100]">km</span>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:flex justify-between mt-4 gap-x-6 space-y-6 lg:space-y-0">
              <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_431_175)">
<path d="M8.55083 13.9371C10.4108 17.5925 13.4075 20.5762 17.0629 22.4492L19.9046 19.6075C20.2533 19.2587 20.77 19.1425 21.2221 19.2975C22.6688 19.7754 24.2317 20.0338 25.8333 20.0338C26.5437 20.0338 27.125 20.615 27.125 21.3254V25.8333C27.125 26.5437 26.5437 27.125 25.8333 27.125C13.7046 27.125 3.875 17.2954 3.875 5.16667C3.875 4.45625 4.45625 3.875 5.16667 3.875H9.6875C10.3979 3.875 10.9792 4.45625 10.9792 5.16667C10.9792 6.78125 11.2375 8.33125 11.7154 9.77792C11.8575 10.23 11.7542 10.7337 11.3925 11.0954L8.55083 13.9371Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_431_175">
<rect width="31" height="31" fill="white"/>
</clipPath>
</defs>
</svg>
<!-- CALL EMERGENCY-->
<!--            </button>-->
<!--          </div>-->
        </div>
      </div>
      <div class="pb-10 md:hidden  lg:pb-0 w-full">
        <button @click="toggleMap" class="bg-[#CC1100] text-white py-4 mt-4 w-full lg:text-base text-sm rounded-lg">
          GET DIRECTION →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

// const distance = ref<number | null>(null); // Distance in kilometers
// const eta = ref<number | null>(null); // Estimated time in hours
import useRandomHospitalData from '@/composables/core/useRandomHospitalData';
const { eta, distance } = useRandomHospitalData();

// const { calculateDistanceAndETA } = useDistanceETA();
const router = useRouter()
const props = defineProps({
  hospital: {
    type: Object,
    required: true
  },
  distance: {
    type: Number,
    default: null
  },
  estimatedTime: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['directions'])

const toggleMap = () => {
  emit('directions')
}

const userLocationData = localStorage.getItem('userLocation')
const selectedHospitalData = JSON.parse(localStorage.getItem('selectedHospital'))

const userLocation = ref({}) as any
const selectedHospital = ref({}) as any

function makeEmergencyCall() {
  const emergencyNumber =  selectedHospitalData?.emergencyContactNumber || '08060907333';
  window.location.href = `tel:${emergencyNumber}`;
}


onMounted(() => {
  // Retrieve and parse values from local storage
  const userLocationData = localStorage.getItem('userLocation')
  const selectedHospitalData = localStorage.getItem('selectedHospital')

  if (userLocationData && selectedHospitalData) {
    userLocation.value = JSON.parse(userLocationData)
    selectedHospital.value = JSON.parse(selectedHospitalData)
    // calculateDistanceAndETA()
  }

  if (!userLocation.value || !selectedHospital.value) {
    console.error("Missing user location or hospital data from local storage")
    return
  }
})
</script>

<style scoped>
/* Add your custom styles here */
</style>
