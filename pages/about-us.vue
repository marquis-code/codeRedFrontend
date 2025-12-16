<template>
  <section class="border-b border-gray-400 lg:h-24">
    <NavigationBar :isMobile="isMobile" @close="isMobile = false" @open="isMobile = true" />
  </section>
  <div class="bg-white">
    <main class="isolate">
      <!-- Hero section -->
      <div data-aos="fade-up" class="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96" aria-hidden="true"></div>
        <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <!-- <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We’re changing the way people connect</h1> -->
            <h1 class="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto"><span class="text-[#CC1100]">CODE-RED:</span> Saving Lives While Saving time</h1>
            <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <div class="text-pretty space-y-3 text-lg text-gray-900 sm:text-xl/8">
               <p class="text-"> Emergencies often come with the challenge of finding immediate healthcare. In Nigeria, delays in locating available hospital beds, connecting with ambulance services, or accessing basic first aid information can be life-threatening.</p>

                <p class="text-">At <span class="text-[#CC1100] font-medium">CODE-RED</span>, we aim to bridge this gap by providing real-time, reliable, and actionable emergency healthcare solutions.</p>
<!--                Emergencies are unpredictable and often come with the challenge of accessing immediate healthcare. In Nigeria, patients and their families face a critical issue—how to locate available hospital beds, connect with ambulance services, or even navigate through basic first aid in moments of crisis. These delays can mean the difference between life and death.-->
              </div>
            </div>
            <img src="@/assets/img/animation.png" alt="" class="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36">
          </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"></div>
      </div>



        <div class="flex flex-col items-center justify-center bg-[#FFF9F9CC] p-5">
        <div class="text-center">
          <div class="flex justify-center items-center">
            <button data-aos="flip-left"
              class="text-sm font-semibold mb-4 bg-[#FFD5D5] rounded-full px-4 py-2.5 text-[#FF2020]"
            >
              Our Mission
            </button>
          </div>
          <h1 data-aos="flip-left" class="text-2xl sm:text-3xl md:text-5xl font-medium max-w-xl text-center mb-6">
            Transforming Emergency Healthcare in Nigeria
          </h1>
          <div data-aos="flip-left" class="bg-white py-6 lg:py-10 lg:px-10">
            <p class="text-gray-700 mb-6 text-lg font-light lg:max-w-xl font-light leading-relaxed">
              Our mission is to revolutionize emergency healthcare in Nigeria with real-time hospital bed updates, bridging the gap between patients and care facilities.
            </p>
            <!-- <NuxtLink to="/about-us" data-aos="flip-left"
              class="text-[#CC1100] border-[#CC1100] border text-sm lg:text-base font-bold py-3.5 px-4"
            >
              About CODE-RED
            </NuxtLink> -->
          </div>
        </div>
      </div>


            <div class="p-5 max-w-6xl mx-auto">
        <div class="text-center mb-10">
          <div class="flex justify-center items-center">
            <button data-aos="fade-up"
              class="text-sm font-semibold mb-4 bg-[#FFD5D5] rounded-full px-4 py-2.5 text-[#FF2020]"
            >
              Our Services
            </button>
          </div>
          <div class="flex justify-center items-center">
            <h2 data-aos="fade-up"
              class="text-2xl lg:text-3xl md:text-3xl font-medium max-w-xl text-center mb-6"
            >
              Streamlining Emergency Response for Better Care
            </h2>
          </div>
        </div>
        <div data-aos="fade-up" id="services" class="grid grid-cols-1 md:grid-cols-2 gap-5 px-1 lg:px-5">
          <ServiceFeatureCard data-aos="fade-up"
            title="Real Time Bed space availability"
            description="Access up-to-the-minute information on hospital bed availability to make informed decisions quickly during emergencies."
            :imageSrc="service1"
          />
          <ServiceFeatureCard data-aos="fade-up"
            title="Emergency Ambulance Connections"
            description="Instantly connect with ambulance services to ensure swift transportation and immediate medical attention when it's needed most."
            :imageSrc="service2"
          />
          <ServiceFeatureCard data-aos="fade-up"
            title="Interactive Hospital Navigation"
            description="Use our integrated map feature to locate and navigate to the nearest hospitals with available beds and specific medical services."
            :imageSrc="service3"
          />
          <ServiceFeatureCard data-aos="fade-up"
            title="Comprehensive First Aid Tips"
            description="Access a library of short, illustrative videos and guides that provide essential first aid information for common emergencies, helping you act confidently and effectively."
            :imageSrc="service4"
          />
        </div>
      </div>

      <div class="bg-white py-16 sm:py-24">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
          <div
            class="relative isolate overflow-hidden bg-[url('@/assets/img/red-bg.png')] bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32"
          >
            <h2 data-aos="fade-down"
              class="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Health Insights and Expert Articles
            </h2>
            <p data-aos="fade-down"
              class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-white"
            >
              Stay Informed with the Latest Health Advice and News
            </p>
            <form data-aos="fade-down" class="mx-auto mt-10 flex max-w-md border rounded-lg">
              <label for="email-address" class="sr-only">Email address</label>
              <input data-aos="fade-down"
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="min-w-0 flex-auto placeholder:text-white border-0 bg-white/5 px-3.5 py-2 outline-none rounded-l-lg text-white shadow-sm sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button data-aos="fade-down"
                type="submit"
                class="flex-none rounded-r-md text-white outline-none px-3.5 py-2.5 text-sm font-semibold shadow-sm bg-[#0FB259]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Team section -->
      <div data-aos="fade-up" class="mx-auto max-w-7xl px-6 sm:mt-40 lg:px-8 pb-10">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-pretty text-4xl font-semibold tracking-tight  sm:text-5xl">Our team</h2>
          <p class="mt-6 text-lg/8 text-gray-800">We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients. Every member contributes their expertise to ensure our platform serves as a lifeline during emergencies. .</p>
        </div>
        <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          <li>
            <img class="aspect-[14/13] w-full rounded-2xl object-cover" src="@/assets/img/ceo.jpeg" alt="">
            <h3 class="mt-6 text-lg/8 font-semibold tracking-tight ">Anita Orji</h3>
            <p class="text-base/7 text-gray-800">Co-Founder / CEO</p>
            <p class="text-sm/6 text-gray-500">Lagos, Nigeria</p>
          </li>

          <li>
            <img class="aspect-[14/13] w-full rounded-2xl object-cover" src="@/assets/img/coo2.jpeg" alt="">
            <h3 class="mt-6 text-lg/8 font-semibold tracking-tight ">Oluwakemi Ifedoyin</h3>
            <p class="text-base/7 text-gray-800">Co-Founder / COO</p>
            <p class="text-sm/6 text-gray-500">Lagos, Nigeria</p>
          </li>

          <li>
            <img class="aspect-[14/13] w-full rounded-2xl object-cover" src="@/assets/img/cto.jpg" alt="">
            <h3 class="mt-6 text-lg/8 font-semibold tracking-tight ">Marquis Abah</h3>
            <p class="text-base/7 text-gray-800">CTO (Chief Technology Officer)</p>
            <p class="text-sm/6 text-gray-500">Lagos, Nigeria</p>
          </li>

          <li>
            <img class="aspect-[14/13] w-full rounded-2xl object-cover" src="@/assets/img/people1.jpeg" alt="">
            <h3 class="mt-6 text-lg/8 font-semibold tracking-tight ">Chioma Ileka</h3>
            <p class="text-base/7 text-gray-800">Head Of Marketing</p>
            <p class="text-sm/6 text-gray-500">Lagos, Nigeria</p>
          </li>
        </ul>
      </div>

    </main>
  </div>
<FooterSection />
</template>

<script setup lang="ts">
  import service1 from "@/assets/img/service1.png";
import service2 from "@/assets/img/service2.png";
import service3 from "@/assets/img/service3.png";
import service4 from "@/assets/img/service4.png";
import ceo from '@/assets/img/ceo.jpeg'
import cto from '@/assets/img/cto.jpg'
import coo from '@/assets/img/coo.jpeg'
import cmo from '@/assets/img/people1.jpeg'
const isMobile = ref(false)
</script>