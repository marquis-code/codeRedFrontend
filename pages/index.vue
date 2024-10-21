<template>
  <main>
    <section class="border-b border-gray-400 lg:h-24">
      <NavigationBar :isMobile="isMobile" @close="isMobile = false" @open="isMobile = true" />
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

  <FooterSection />
      
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
