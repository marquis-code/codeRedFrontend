<template>
<main>
    <!-- <Header /> -->
     <NavigationBar  :isMobile="isMobile" @close="isMobile = false" @open="isMobile = true" />
    <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <!-- <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">Learn how to manage emergencies with the First Aid Tips below</p>
          </div> -->
          <VideoList />
          <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <article v-for="(item, idx) in blogs" :key="idx" class="flex max-w-xl flex-col items-start justify-between">
              <div class="flex items-center gap-x-4 text-xs">
                <time datetime="2020-03-16" class="text-gray-500">Mar 16, 2020</time>
                <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Marketing</a>
              </div>
              <div class="group relative">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span class="absolute inset-0"></span>
                   {{ item.title }}
                  </a>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ item.desc }}</p>
              </div>
              <!-- <div class="relative mt-8 flex items-center gap-x-4">
                <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-10 w-10 rounded-full bg-gray-50">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">
                    <a href="#">
                      <span class="absolute inset-0"></span>
                      Michael Foster
                    </a>
                  </p>
                  <p class="text-gray-600">Co-Founder / CTO</p>
                </div>
              </div> -->
            </article>
          </div>
        </div>
      </div>
</main>
</template>


<script setup lang="ts">
const isMobile = ref(false)
const blogs = ref([
    {
        title: 'Immediate Actions to Take During a Stroke',
        desc: 'Recognize the signs of a stroke using the FAST method: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services immediately.'
    },
    {
        title: 'Building a Comprehensive Home Emergency Kit',
        desc: 'Ensure your home is ready for medical emergencies by assembling a comprehensive kit. Include essential items like bandages, antiseptics, pain relievers, tweezers, medical tape, and a digital thermometer.'
    },
    {
        title: 'Essential Medications for a Home Medical Emergency Kit',
        desc: 'Being prepared for medical emergencies at home is crucial. A well-stocked home medical emergency kit can provide immediate relief and stabilize conditions until professional help arrives.'
    }
])
</script>
