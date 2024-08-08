<template>
  <main>
    <section class="border-b border-gray-400 lg:h-24">
      <header class="absolute inset-x-0 top-0 z-50 max-w-7xl mx-auto">
        <nav
          class="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="" />
            </a>
          </div>
          <div class="flex lg:hidden">
            <button
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span class="sr-only">Open main menu</span>
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div class="hidden lg:flex lg:gap-x-12">
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
              >Home</a
            >
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
              >Find ambulances</a
            >
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
              >First aid tips</a
            >
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
              >About CODE-RED</a
            >
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              class="text-sm font-semibold bg-[#CC1100] py-2 rounded-md text-white leading-6 px-4"
              >FIND A BED-SPACE</a
            >
          </div>
        </nav>

        <div v-if="isMobile" class="lg:hidden" role="dialog" aria-modal="true">
          <div class="fixed inset-0 z-50"></div>
          <div
            class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div class="flex items-center justify-between">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
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
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Home</a
                  >
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Find ambulances</a
                  >
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >First aid tips</a
                  >
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Company</a
                  >
                </div>
                <div class="py-6">
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >Log in</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </section>

    <div class="relative bg-white">
      <div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div
          class="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6"
        >
          <div class="mx-auto max-w-2xl lg:mx-0">
            <h1 data-aos="flip-left"
              class="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl"
            >
              Need help <span class="text-[#CC1100]">locating</span> bed spaces?
            </h1>
            <p data-aos="flip-left" class="mt-6 text-lg leading-8 text-gray-600">
              CODE-RED provides up-to-the-minute information on hospital bed
              availability, emergency hotline access, and essential first aid
              tips to streamline emergency response and save lives.
            </p>
            <div class="mt-10 flex items-center gap-x-6">
              <a data-aos="flip-left"
                href="#search"
                class="rounded-md bg-[#CC1100] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#CC1100] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC1100]"
                >Find a bed-space</a
              >
              <!-- <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
                >Learn more <span aria-hidden="true">→</span></a
              > -->
            </div>
          </div>
        </div>
        <div
          class="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0"
        >
          <img data-aos="fade-down"
            class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            src="@/assets/img/saving-lives.png"
            alt=""
          />
        </div>
      </div>
    </div>

    <!-- <div class="p-6 max-w-7xl mx-auto">
      <div class="flex justify-between">
        <div class="text-lg font-light text-gray-600 mb-4">
          Hospitals are filtered based on your location
        </div>
        <div class="relative mb-6 w-4/12">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search hospitals..."
            class="w-full outline-none p-4 pl-10 bg-[#F5F5F5] rounded-md border border-gray-300"
          />
          <img
            src="@/assets/icons/red-search.svg"
            alt=""
            class="absolute left-1 top-2.5"
          />
        </div>
      </div>
      <div class="space-y-3">
        <div
          v-for="hospital in filteredHospitals"
          :key="hospital.name"
          :class="`p-4 rounded-md flex shadow justify-between items-center ${hospital.statusColor}`"
        >
          {{ hospital.name }}
          <span
            :class="`py-1 px-3 rounded-full text-xs ${hospital.textColor}`"
            >{{ hospital.status }}</span
          >
        </div>
      </div>
      <div class="mt-4 flex justify-end items-end">
        <button class="text-gray-500 hover:text-gray-700">View All ></button>
      </div>
    </div> -->

  <div class="pt-10" id="search" data-aos="flip-left" >
    <SearchBar v-if="!loading" :address="address" id="search" class="mb-3" />
    <HospitalsList class="" />
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
          <p class="text-gray-700 mb-6 lg:max-w-xl font-light leading-relaxed">
            At CODE-RED, our mission is to revolutionize emergency healthcare in
            Nigeria with real-time hospital bed space updates. Inspired by
            personal experiences and thorough research, we aim to bridge the gap
            between patients and healthcare facilities, ensuring timely and
            efficient care.
          </p>
          <button data-aos="flip-left"
            class="text-[#CC1100] border-[#CC1100] border text-sm lg:text-base font-bold py-3.5 px-4"
          >
            About CODE-RED
          </button>
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
          <!-- <svg
            viewBox="0 0 1024 1024"
            class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fill-opacity="0.7"
            />
            <defs>
              <radialGradient
                id="759c1415-0410-454c-8f7c-9a820de03641"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stop-color="#7775D6" />
                <stop offset="1" stop-color="#E935C1" stop-opacity="0" />
              </radialGradient>
            </defs>
          </svg> -->
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 max-w-7xl mx-auto">
      <!-- Team Section -->
      <div>
        <div data-aos="fade-up" class="text-sm font-medium text-[#CC1100] mb-2">TEAM</div>
        <h2 data-aos="fade-up" class="mb-8 text-2xl font-light max-w-xs">Meet The Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div data-aos="fade-up"
            v-for="member in teamMembers"
            :key="member.name"
            class="bg-white p-1"
          >
            <!-- <div class="h-40 bg-[#F4F5F4]"></div> -->
            <!-- Placeholder for image -->
            <img :src="member.image" class="lg:h-40 w-full rounded-lg" data-aos="fade-up" />
            <h3 data-aos="fade-up" class="mt-2 font-light">{{ member.name }}</h3>
            <p data-aos="fade-up" class="text-[#CC1100] text-sm font-semibold">{{ member.role }}</p>
          </div>
        </div>
      </div>
      <!-- Feedback Form -->
      <div class="bg-white p-3 lg:p-8 shadow rounded border">
        <div class="space-y-3">
          <div data-aos="fade-up" class="text-sm font-medium text-[#CC1100]">FEEDBACK</div>
          <h2 data-aos="fade-up" class="text-lg lg:text-2xl font-light max-w-xs">
            Your Feedback Helps Us Grow
          </h2>
        </div>
        <form @submit.prevent="submitFeedback" class="pt-4">
          <div data-aos="fade-up" class="mb-6">
            <input
              type="text"
              placeholder="Your Name"
              class="w-full border outline-none border-gray-300 p-3 rounded-lg"
              v-model="feedback.name"
            />
          </div>
          <div data-aos="fade-up" class="mb-6">
            <input
              type="email"
              placeholder="Email"
              class="w-full border outline-none border-gray-300 p-3 rounded-lg"
              v-model="feedback.email"
            />
          </div>
          <div data-aos="fade-up" class="mb-6">
            <textarea
              rows="4"
              placeholder="Message"
              class="w-full border outline-none border-gray-300 p-3 rounded-lg"
              v-model="feedback.message"
            ></textarea>
          </div>
          <button data-aos="fade-up"
            type="submit"
            class="bg-[#CC1100] text-sm text-white px-6 py-3 rounded font-bold"
          >
            SEND A REQUEST
          </button>
        </form>
      </div>
    </div>

    <footer class="bg-[#000000]" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
          <div class="xl:grid xl:grid-cols-3 xl:gap-8">
            <div class="space-y-8">
              <img data-aos="fade-up" class="h-7" src="@/assets/img/logo-white.png" alt="Company name">
              <p data-aos="fade-up" class="text-sm leading-6 text-gray-300">High level experience in web design and development knowledge, producing quality work.
            </p>
              <div class="flex space-x-6 border-t">
                <p data-aos="fade-up" class="text-gray-500 hover:text-gray-400 pt-10">© 2024 All Rights Reserved</p>
              </div>
            </div>
            <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div class="md:grid md:grid-cols-2 md:gap-8">
                <div class="pl-3" >
                  <h3 data-aos="fade-up" class="text-sm font-semibold leading-6 text-white">Follow us</h3>
                  <ul role="list" class="mt-6 space-y-4">
                    <li data-aos="fade-up">
                      <a href="#" class="text-sm leading-6 text-gray-300 hover:text-white flex items-center gap-x-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="white"/>
                            <path d="M16.7273 4H14.3471C13.295 4 12.286 4.42143 11.5421 5.17157C10.7981 5.92172 10.3802 6.93913 10.3802 8V10.4H8V13.6H10.3802V20H13.5537V13.6H15.9339L16.7273 10.4H13.5537V8C13.5537 7.78783 13.6373 7.58434 13.7861 7.43431C13.9349 7.28429 14.1367 7.2 14.3471 7.2H16.7273V4Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="12" fill="white"/>
                                <path d="M19 5L10 14" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19 5L13.4 21L10.2 13.8L3 10.6L19 5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="12" fill="white"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.26748 5C6.4629 5 5 6.4629 5 8.26748V15.8024C5 17.607 6.4629 19.0699 8.26748 19.0699H15.8024C17.607 19.0699 19.0699 17.607 19.0699 15.8024V8.26748C19.0699 6.4629 17.607 5 15.8024 5H8.26748ZM4 8.26748C4 5.91062 5.91062 4 8.26748 4H15.8024C18.1593 4 20.0699 5.91062 20.0699 8.26748V15.8024C20.0699 18.1593 18.1593 20.0699 15.8024 20.0699H8.26748C5.91062 20.0699 4 18.1593 4 15.8024V8.26748ZM12.4364 9.51543C11.9134 9.43786 11.3792 9.52721 10.9098 9.77075C10.4404 10.0143 10.0598 10.3996 9.82209 10.872C9.58436 11.3443 9.50161 11.8795 9.58562 12.4016C9.66962 12.9237 9.91611 13.406 10.29 13.7799C10.6639 14.1538 11.1462 14.4003 11.6683 14.4843C12.1903 14.5683 12.7256 14.4855 13.1979 14.2478C13.6703 14.0101 14.0556 13.6294 14.2991 13.1601C14.5427 12.6907 14.632 12.1565 14.5545 11.6335C14.4753 11.0999 14.2267 10.606 13.8453 10.2246C13.4639 9.84316 12.97 9.59454 12.4364 9.51543ZM10.4492 8.88312C11.1053 8.54271 11.852 8.41783 12.5831 8.52624C13.3289 8.63683 14.0193 8.98435 14.5524 9.51746C15.0855 10.0506 15.4331 10.741 15.5436 11.4868C15.6521 12.2179 15.5272 12.9646 15.1868 13.6207C14.8463 14.2767 14.3077 14.8087 13.6475 15.141C12.9873 15.4733 12.2391 15.589 11.5094 15.4716C10.7797 15.3541 10.1055 15.0096 9.58291 14.487C9.06027 13.9643 8.71574 13.2902 8.59832 12.5605C8.48089 11.8308 8.59656 11.0826 8.92886 10.4224C9.26116 9.76216 9.79317 9.22354 10.4492 8.88312ZM16.1792 7.39074C15.903 7.39074 15.6792 7.6146 15.6792 7.89074C15.6792 8.16688 15.903 8.39074 16.1792 8.39074H16.1878C16.464 8.39074 16.6878 8.16688 16.6878 7.89074C16.6878 7.6146 16.464 7.39074 16.1878 7.39074H16.1792Z" fill="black"/>
                                    </svg>
                                                                                                
                      </a>
                    </li>
                    <li data-aos="fade-up">
                      <a href="#" class="text-sm leading-6 text-gray-300 hover:text-white">Email us</a>
                    </li>
                    <li data-aos="fade-up">
                      <a href="#" class="text-sm leading-6 text-gray-300 hover:text-white">Code-red@gmail.com</a>
                    </li>
                  </ul>
                </div>
                <div class="mt-10 md:mt-0">
                  <h3 data-aos="fade-up" class="text-sm font-semibold leading-6 text-white">Product</h3>
                  <ul role="list" class="mt-6 space-y-4">
                    <li>
                      <a href="#" class="text-sm leading-6 text-gray-300 hover:text-white">Home</a>
                    </li>
                    <li>
                      <a data-aos="fade-up" href="#" class="text-sm leading-6 text-gray-300 hover:text-white">Find Ambulances</a>
                    </li>
                    <li>
                      <a data-aos="fade-up" href="#" class="text-sm leading-6 text-gray-300 hover:text-white">First aid tips</a>
                    </li>
                    <li>
                      <a data-aos="fade-up" href="#" class="text-sm leading-6 text-gray-300 hover:text-white">About CODE-RED</a>
                    </li>
                    <li>
                        <a data-aos="fade-up" href="#" class="text-sm leading-6 text-gray-300 hover:text-white">Health articles</a>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-16 pt-8 sm:mt-20 lg:mt-24">
            <p class="text-xs leading-5 text-gray-400">
                <ul role="list" class="flex items-center gap-x-3 lg:gap-x-7">
                    <li>
                      <a  href="#" class="text-sm leading-6 text-gray-300 hover:text-white">Privacy Policy</a>
                    </li>
                    <li>
                      <a  href="#" class="text-sm leading-6 text-gray-300 hover:text-white">Terms of Use</a>
                    </li>
                    <li>
                      <a  href="#" class="text-sm leading-6 text-gray-300 hover:text-white">Legal</a>
                    </li>
                    <li>
                      <a  href="#" class="text-sm leading-6 text-gray-300 hover:text-white">Site Map</a>
                    </li>
                  </ul>
            </p>
          </div>
        </div>
      </footer>
      
  </main>
</template>

<script setup lang="ts">
import useUserLocation from '@/composables/core/useUserLocation';
const { latitude, longitude, error, address, loading } = useUserLocation();
import service1 from "@/assets/img/service1.png";
import service2 from "@/assets/img/service2.png";
import service3 from "@/assets/img/service3.png";
import service4 from "@/assets/img/service4.png";
import ceo from '@/assets/img/ceo.jpeg'
import cto from '@/assets/img/cto.jpg'
import coo from '@/assets/img/coo.jpeg'


const isMobile = ref(false)

const searchQuery = ref("");

interface Hospital {
  name: string;
  status: string;
  statusColor: string;
  textColor: string;
}

const hospitals: Hospital[] = [
  {
    name: "Lagos University Teaching Hospital (LUTH)",
    status: "Busy",
    statusColor: "bg-blue-100",
    textColor: "bg-blue-500 text-white"
  },
  {
    name: "Federal Medical Centre (FMC), Ebute-Metta",
    status: "Available",
    statusColor: "bg-green-100",
    textColor: "bg-green-500 text-white",
  },
  {
    name: "Isolo General Hospital",
    status: "Unavailable",
    statusColor: "bg-red-100",
    textColor: "bg-red-500 text-white",
  },
];

const filteredHospitals = computed(() => {
  return hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const teamMembers = ref([
  { name: "Anita Orji", role: "Co-Founder & CEO", image: ceo },
  { name: "Oluwakemi Ifedoyin", role: "Co-Founder & COO", image: coo },
  { name: "Marquis Abah", role: "CTO", image: cto },
]);

const feedback = ref({
  name: "",
  email: "",
  message: "",
});

function submitFeedback() {
  console.log("Feedback:", feedback.value);
  // Process feedback submission here
}
</script>
