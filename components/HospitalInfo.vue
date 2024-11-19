<template>
  <div class="lg:p-4 flex flex-col justify-center h-full">
    <div class="p-3 lg:p-10 flex flex-col justify-between h-full bg-white space-y-10 lg:space-y-0">
      <div class="flex items-center">
        <button @click="router.back()" class="text-2xl">←</button>
        <div class="flex-grow text-center text-2xl font-bold">
          <div class="flex justify-center items-center">
            <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="" />
          </div>
        </div>
      </div>
      <div>
        <div class="border-[0.5px] border-red-500 rounded-lg py-6 p-5 bg-[#FFF9F9CC] shadow">
          <span class="bg-red-500 text-white text-sm px-2 py-1 rounded-full px-6">{{ selectedHospitalData.availability }}</span>
          <div class="flex justify-between items-center mt-4">
            <!-- <span class="text-[5px]">{{selectedHospitalData}}</span> -->
            <h1 class="text-lg lg:text-3xl font-semibold">
              <!-- {{ hospital.name }} {{ selectedHospital }} -->
              {{selectedHospitalData.name}}
            </h1>
            <!-- <span class="bg-red-500 text-white text-sm px-2 py-1 rounded-full px-6">{{ hospital.status }}</span> -->
          </div>
          <div class="mt-2 text-gray-500">{{ hospital.location }}</div>
        </div>
        <div class="lg:flex justify-between mt-4 gap-x-6 space-y-6 lg:space-y-0">
          <div class="flex-1 text-center border-[0.5px] border-red-500 bg-[#FFF9F9CC] shadow rounded-lg py-6 p-5">
            <div class="flex justify-start items-start flex-col">
              <span class="block text-gray-600 text-sm">From your location</span>
              <h2 class="text-lg font-medium">Estimated Time of Arrival</h2>
              <div class="flex items-center">
                <span class="text-4xl lg:text-6xl text-[#CC1100] custom-font">44</span>
                <span class="ml-2 text-sm lg:text-lg text-[#CC1100] text-[#CC1100]">mins</span>
              </div>
            </div>
          </div>
          <div class="flex-1 text-center border-[0.5px] bg-[#FFF9F9CC] border-red-500 bg-white shadow rounded-lg py-6 p-5">
            <div class="flex justify-start items-start flex-col">
              <span class="block text-gray-600 text-sm">From your location</span>
              <h2 class="text-lg font-medium">Distance</h2>
              <div class="flex items-center">
                <span class="text-4xl lg:text-6xl text-[#CC1100] custom-font">{{ distance.toFixed(2) }}</span>
                <span class="ml-2 text-sm lg:text-lg text-[#CC1100] text-[#CC1100]">km</span>
              </div>
            </div>
          </div>
          <div class="border-[0.5px] border-red-500 rounded-lg py-6 p-5 bg-[#CC1100] shadow">
            <button class="text-2xl text-white gap-x-3 flex justify-center items-center bg-[#CC1100]">
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
 CALL EMERGENCY
            </button>
          </div>
          <!-- <div>
            <h2>Distance and ETA</h2>
            <p>Distance: {{ result.distance }} km</p>
            <p>ETA (Walking): {{ result.etaWalking }} minutes</p>
            <p>ETA (Driving): {{ result.etaDriving }} minutes</p>
          </div> -->
        </div>
        <!-- <div class="space-y-2 pt-6">
          <div class="flex items-center gap-x-2" v-for="itm in ['Stay Calm in emergency situations', 'Call for Help', 'Ensure Personal safety']" :key="itm">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.0417 23.791H18.5417V15.4945H17.0417V23.791ZM17.7917 13.1801C18.0537 13.1801 18.2732 13.0935 18.4502 12.9203C18.6262 12.7471 18.7142 12.5328 18.7142 12.2775C18.7142 12.0211 18.6257 11.8064 18.4487 11.6332C18.2717 11.46 18.0527 11.3739 17.7917 11.3749C17.5307 11.3759 17.3117 11.4625 17.1347 11.6347C16.9577 11.8069 16.8692 12.0216 16.8692 12.2789C16.8692 12.5363 16.9577 12.7505 17.1347 12.9218C17.3117 13.093 17.5307 13.1791 17.7917 13.1801ZM17.7917 30.7358C14.7777 29.8602 12.2742 28.0741 10.2812 25.3775C8.28819 22.681 7.29169 19.6425 7.29169 16.2621V8.32515L17.7917 4.4873L28.2917 8.32515V16.2621C28.2917 19.6415 27.2952 22.6795 25.3022 25.3761C23.3092 28.0726 20.8057 29.8582 17.7917 30.7358Z"
                fill="#CC1100"
              />
            </svg>
            <p class="text-[#717171] font-medium">{{itm}}</p>
          </div>
        </div> -->
      </div>
      <div class="pb-10 lg:pb-0 w-full">
        <button @click="toggleMap" class="bg-[#CC1100] text-white py-4 mt-4 w-full lg:text-base text-sm rounded-lg">
          GET DIRECTION →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDistanceETA } from '@/composables/core/useDistanceETA';

const { calculateDistanceAndETA } = useDistanceETA();
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
const selectedHospital = ref({})

const userLocations = ref({ lat: 7.3775355, lng: 3.9470396 });
const selectedLocation = ref({ latitude: 7.377550700000002, longitude: 3.9470624 });

const result = ref({ distance: '', etaWalking: 0, etaDriving: 0 });

onMounted(() => {
  result.value = calculateDistanceAndETA(userLocations.value, selectedLocation.value);
});

onMounted(() => {
    // Retrieve and parse values from local storage
    const userLocationData = localStorage.getItem('userLocation')
    const selectedHospitalData = localStorage.getItem('selectedHospital')
  
    if (userLocationData && selectedHospitalData) {
      userLocation.value = JSON.parse(userLocationData)
      selectedHospital.value = JSON.parse(selectedHospitalData)
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
