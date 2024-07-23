<template>
  <div class="lg:p-4 flex flex-col justify-center h-full">
    <div class="p-6 lg:p-10 flex flex-col justify-between h-full bg-white space-y-10 lg:space-y-0">
      <div class="flex items-center">
        <button @click="router.back()" class="text-2xl">←</button>
        <div class="flex-grow text-center text-2xl font-bold">
          <div class="flex justify-center items-center">
            <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="" />
          </div>
        </div>
      </div>
      <div>
        <div class="border border-red-500 rounded-lg py-6 p-5 bg-white shadow">
          <span class="bg-red-500 text-white text-sm px-2 py-1 rounded-full px-6">{{ hospital.status }}</span>
          <div class="flex justify-between items-center mt-4">
            <h1 class="text-lg lg:text-3xl font-semibold">
              {{ hospital.name }}
            </h1>
            <!-- <span class="bg-red-500 text-white text-sm px-2 py-1 rounded-full px-6">{{ hospital.status }}</span> -->
          </div>
          <div class="mt-2 text-gray-500">{{ hospital.location }}</div>
        </div>
        <div class="lg:flex justify-between mt-4 gap-x-6 space-y-6 lg:space-y-0">
          <div class="flex-1 text-center border border-red-500 bg-white shadow rounded-lg py-6 p-5">
            <div class="flex justify-start items-start flex-col">
              <span class="block text-gray-600 text-sm">From your location</span>
              <h2 class="text-lg font-medium">Estimated Time of Arrival</h2>
              <div class="flex items-center">
                <span class="text-4xl lg:text-6xl custom-font">44</span>
                <span class="ml-2 text-sm lg:text-lg text-gray-500">mins</span>
              </div>
            </div>
          </div>
          <div class="flex-1 text-center border border-red-500 bg-white shadow rounded-lg py-6 p-5">
            <div class="flex justify-start items-start flex-col">
              <span class="block text-gray-600 text-sm">From your location</span>
              <h2 class="text-lg font-medium">Distance</h2>
              <div class="flex items-center">
                <span class="text-4xl lg:text-6xl custom-font">{{ distance.toFixed(2) }}</span>
                <span class="ml-2 text-sm lg:text-lg text-gray-500">km</span>
              </div>
            </div>
          </div>
          <div class="border border-red-500 rounded-lg py-6 p-5 bg-white shadow">
            <button class="text-2xl flex justify-center items-center">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_308_179)">
                  <path
                    d="M20.7589 20.76C17.2009 24.327 13.0789 27.732 11.4454 26.1C9.10993 23.76 7.66993 21.7305 2.51893 25.8675C-2.63207 30.0045 1.32493 32.7645 3.58693 35.0265C6.19693 37.6365 15.9259 35.163 25.5469 25.5465C35.1679 15.93 37.6369 6.19954 35.0269 3.58654C32.7589 1.32904 30.0064 -2.62196 25.8694 2.52004C21.7324 7.66204 23.7649 9.10504 26.0989 11.439C27.7309 13.08 24.3259 17.2005 20.7589 20.76Z"
                    fill="#CC1100"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_308_179)">
                    <rect width="36" height="36" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
        <div class="space-y-2 pt-6">
          <div class="flex items-center gap-x-2" v-for="itm in ['Stay Calm in emergency situations', 'Call for Help', 'Ensure Personal safety']" :key="itm">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.0417 23.791H18.5417V15.4945H17.0417V23.791ZM17.7917 13.1801C18.0537 13.1801 18.2732 13.0935 18.4502 12.9203C18.6262 12.7471 18.7142 12.5328 18.7142 12.2775C18.7142 12.0211 18.6257 11.8064 18.4487 11.6332C18.2717 11.46 18.0527 11.3739 17.7917 11.3749C17.5307 11.3759 17.3117 11.4625 17.1347 11.6347C16.9577 11.8069 16.8692 12.0216 16.8692 12.2789C16.8692 12.5363 16.9577 12.7505 17.1347 12.9218C17.3117 13.093 17.5307 13.1791 17.7917 13.1801ZM17.7917 30.7358C14.7777 29.8602 12.2742 28.0741 10.2812 25.3775C8.28819 22.681 7.29169 19.6425 7.29169 16.2621V8.32515L17.7917 4.4873L28.2917 8.32515V16.2621C28.2917 19.6415 27.2952 22.6795 25.3022 25.3761C23.3092 28.0726 20.8057 29.8582 17.7917 30.7358Z"
                fill="#CC1100"
              />
            </svg>
            <p class="text-[#717171] font-medium">{{itm}}</p>
          </div>
        </div>
      </div>
      <div class="pb-10 lg:pb-0 w-full">
        <button class="bg-red-500 text-white py-4 mt-4 w-full lg:text-base text-sm rounded-lg">
          GET DIRECTION →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
/* Add your custom styles here */
</style>
