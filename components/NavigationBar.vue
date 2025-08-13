<template>
    <header class="absolute bg-white inset-x-0 top-0 z-50 max-w-7xl mx-auto">
        <nav
          class="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <button @click="router.push('/')" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="" />
            </button>
          </div>
          <div class="flex lg:hidden">
            <button
              type="button"
              @click="emit('open')"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span class="sr-only">Open main menu</span>
              <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5834 1.25H25.1667M1.83337 10H25.1667H6.20837M1.83337 18.75H16.4167" stroke="#CC1100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
          </div>
          <div class="hidden lg:flex lg:gap-x-12">
            <NuxtLink href="/" class="text-sm px-4 py-2 rounded-lg font-semibold leading-6 text-gray-900"
              >Home</NuxtLink
            >
            <NuxtLink to="/ambulance" class="text-sm px-4 py-2 rounded-lg font-semibold leading-6 text-gray-900"
              >Find ambulances</NuxtLink
            >
            <NuxtLink href="/blogs" class="text-sm px-4 py-2 rounded-lg font-semibold leading-6 text-gray-900"
              >First aid tips</NuxtLink
            >
            <NuxtLink to="/business" class="text-sm px-4 py-2 rounded-lg font-semibold leading-6 text-gray-900"
            >CODE-RED For Business</NuxtLink
          >
            <NuxtLink to="/about-us" class="text-sm px-4 py-2 rounded-lg font-semibold leading-6 text-gray-900"
              >About CODE-RED</NuxtLink
            >
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              class="text-sm font-semibold bg-[#CC1100] py-2 rounded-md text-white leading-6 px-4"
              >FIND A BED-SPACE</a
            >
            <!-- <PaymentButton /> -->
          </div>
        </nav>

        <div v-if="isMobile" class="lg:hidden bg-gray-100" role="dialog" aria-modal="true">
          <div class="fixed inset-0 z-50"></div>
          <div
            class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div class="flex items-center justify-between">
              <button
                  @click="emit('close')"
                  type="button"
                  class="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span class="sr-only">Close menu</span>
                <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button @click="router.push('/')" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img
                  class="h-8 w-auto"
                  src="@/assets/img/logo.png"
                  alt=""
                />
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <NuxtLink
                    to="/"
                    @click="emit('close')"
                    class="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-[#979797] hover:bg-[#FEEAEA]"
                    >Home</NuxtLink
                  >

<!--                  <a-->
<!--                      href="#filter"-->
<!--                      @click="emit('close')"-->
<!--                      class="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-[#979797] hover:bg-[#FEEAEA]"-->
<!--                  >Check Hospital Bed Availability</a>-->
                  <a
                      href="#filter"
                      @click.prevent="navigateToFilter"
                      class="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-[#979797] hover:bg-[#FEEAEA]"
                  >
                    Check Hospital Bed Availability
                  </a>

                  <NuxtLink to="/blogs"  class="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-[#979797] hover:bg-gray-50"
              >First Aid tips</NuxtLink>

                  <NuxtLink to="/ambulance"  class="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-[#979797] hover:bg-gray-50"
                  >Find Ambulance</NuxtLink>
                  <NuxtLink
                      @click="emit('close')"
                    to="/business"
                    class="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-[#979797] hover:bg-[#FEEAEA]"
                    >CODE-RED For Business</NuxtLink
                  >
                  <NuxtLink
                    to="/about-us"
                    @click="emit('close')"
                    class="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-[#979797] hover:bg-[#FEEAEA]"
                    >About CODE-RED</NuxtLink
                  >
                </div>
              </div>
            </div>
            <div class="absolute bottom-0 inset-x-0">
              <div class="bg-red-600 bg-[url('@/assets/img/red-bg.png')] text-white px-6 py-8">
                <h2 class="text-2xl font-semibold text-center max-w-sm">Health Insights and Expert Articles</h2>
                <p class="text-sm mt-2 text-center">Stay Informed with the Latest Health Advice and News</p>
                <div class="flex items-center mt-4">
                  <input
                      type="email"
                      placeholder="Your Email"
                      class="flex-1 p-3 rounded-l-md bg-white text-gray-700 text-sm focus:outline-none"
                  />
                  <button class="bg-green-600 text-white px-4 py-3 rounded-r-md text-sm font-medium">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
<!--              <a-->
<!--                  href="#"-->
<!--                  class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"-->
<!--              >-->
<!--                <svg-->
<!--                    class="size-6 shrink-0"-->
<!--                    fill="none"-->
<!--                    viewBox="0 0 24 24"-->
<!--                    stroke-width="1.5"-->
<!--                    stroke="currentColor"-->
<!--                    aria-hidden="true"-->
<!--                    data-slot="icon"-->
<!--                >-->
<!--                  <path-->
<!--                      stroke-linecap="round"-->
<!--                      stroke-linejoin="round"-->
<!--                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"-->
<!--                  />-->
<!--                  <path-->
<!--                      stroke-linecap="round"-->
<!--                      stroke-linejoin="round"-->
<!--                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"-->
<!--                  />-->
<!--                </svg>-->
<!--                Settings-->
<!--              </a>-->
            </div>

          </div>
        </div>
      </header>
</template>

<script setup lang="ts">
const router = useRouter()
const props = defineProps({
    isMobile: {
        type: Boolean
    }
})


function navigateToFilter() {
  router.push({ path: '/', hash: '#filter' });
}

const emit = defineEmits(['close', 'open'])
</script>

<style scoped>
.router-link-exact-active {
  background-color: #FEEAEA;
  color: #CC1100;
}
</style>
