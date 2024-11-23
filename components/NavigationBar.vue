<template>
    <header class="absolute inset-x-0 top-0 z-50 max-w-7xl mx-auto">
        <nav
          class="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <NuxtLink  to="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="" />
            </NuxtLink>
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
            <NuxtLink href="/" class="text-sm font-semibold leading-6 text-gray-900"
              >Home</NuxtLink
            >
            <NuxtLink href="#" class="text-sm font-semibold leading-6 text-gray-900"
              >Find ambulances</NuxtLink
            >
            <NuxtLink href="/blogs" class="text-sm font-semibold leading-6 text-gray-900"
              >First aid tips</NuxtLink
            >
            <NuxtLink to="/business" class="text-sm font-semibold leading-6 text-gray-900"
            >CODE-RED For Business</NuxtLink
          >
            <NuxtLink href="#" class="text-sm font-semibold leading-6 text-gray-900"
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

        <div v-if="isMobile" class="lg:hidden" role="dialog" aria-modal="true">
          <div class="fixed inset-0 z-50"></div>
          <div
            class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div class="flex items-center justify-between">
              <NuxtLink to="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img
                  class="h-8 w-auto"
                  src="@/assets/img/logo.png"
                  alt=""
                />
              </NuxtLink>
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
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <NuxtLink
                    to="/"
                    @click="isMobile = false"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Home</NuxtLink
                  >
                  <NuxtLink href="/blogs"  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >First aid tips</NuxtLink
            >
                  <NuxtLink
                   @click="isMobile = false"
                    to="/business"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >CODE-RED For Business</NuxtLink
                  >
                  <NuxtLink
                    to="/"
                    @click="isMobile = false"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >About CODE-RED</NuxtLink
                  >
                </div>
                <!-- <div class="py-6">
                  <NuxtLink
                    to="/"
                    @click="isMobile = false"
                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Log in</NuxtLink
                  >
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </header>
</template>

<script setup lang="ts">

const props = defineProps({
    isMobile: {
        type: Boolean
    }
})

const emit = defineEmits(['close', 'open'])
</script>