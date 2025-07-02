<template>
  <main>
    <section class="border-b border-gray-400 lg:h-24">
      <NavigationBar :isMobile="isMobile" @close="isMobile = false" @open="isMobile = true" />
    </section>

    <div class="flex flex-col md:flex-row items-center container mx-auto justify-between p-8 bg-white pt-20">
      <div class="text-left md:max-w-lg space-y-4">

        <h1 data-aos="flip-left"
              class="font-black text-5xl  tracking-tight text-gray-900 sm:mt-10 sm:text-6xl"
            >
              Need help locating<span class="text-[#CC1100]"> Bed Spaces?</span>
            </h1>
        <div class="relative mt-8 md:mt-0 lg:hidden">
        <img
          src="@/assets/img/animation.png"
          alt="Superhero"
          class="w-full max-w-xs md:max-w-md"
        />
      </div>
        <p class="text-gray-600 font-light lg:text-lg leading-tight lg:leading-7">
          Get real-time updates on hospital bed availability, essential first aid tips, and access to ambulance services when you need them most.
        </p>

        <div class="relative mt-4 w-full">
              <a href="#filter"
              class="bg-[#CC1100] lg:w-1/2 text-base block text-center px-3.5 py-3.5 rounded-sm font-semibold text-white shadow-sm hover:bg-[#CC1100] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC1100]"
              >
                CHECK BED AVAILABILITY
              </a>
          
              <span
                class="absolute -top-1.5 right-0 lg:left-60  h-4 w-4 rounded-full  bg-red-400 animate-ping"
              ></span>
              <span
                class="absolute -top-1.5 right-0 lg:left-60  h-4 w-4 rounded-full bg-red-600"
              ></span>
            </div>
      </div>
  
      <!-- Image Section -->
      <div class="relative mt-8 md:mt-0 hidden lg:block">
        <img
          src="@/assets/img/animation.png"
          alt="Superhero"
          class="w-full max-w-xs md:max-w-md"
        />
      </div>
    </div>


    <MapFunctional id="filter" />

  <div class="flex items-start space-x-4 p-4 px-10 max-w-7xl mx-auto">
    <!-- Icon -->
    <span class="material-icons text-red-600 text-2xl">
      <svg width="21" height="29" viewBox="0 0 21 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.77143 27.4143C5.77143 28.2079 6.42071 28.8571 7.21429 28.8571H12.9857C13.7793 28.8571 14.4286 28.2079 14.4286 27.4143V25.9714H5.77143V27.4143ZM10.1 0C4.53057 0 0 4.53057 0 10.1C0 13.534 1.717 16.5496 4.32857 18.382V21.6429C4.32857 22.4364 4.97786 23.0857 5.77143 23.0857H14.4286C15.2221 23.0857 15.8714 22.4364 15.8714 21.6429V18.382C18.483 16.5496 20.2 13.534 20.2 10.1C20.2 4.53057 15.6694 0 10.1 0ZM12.9857 16.8814V20.2H7.21429V16.8814C5.02114 15.3376 2.88571 13.7504 2.88571 10.1C2.88571 6.11771 6.11771 2.88571 10.1 2.88571C14.0823 2.88571 17.3143 6.11771 17.3143 10.1C17.3143 13.6927 15.1356 15.3664 12.9857 16.8814Z" fill="#CC1100"/>
        </svg>
        
    </span>

    <!-- Text -->
    <p class="text-gray-800 leading-relaxed text-justify">
      Click on a hospital color box indicator above to get map directions,
      access the emergency hotlines, and get short illustrative videos during emergencies!
    </p>
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
          <NuxtLink to="/about-us" data-aos="flip-left"
            class="text-[#CC1100] border-[#CC1100] border text-sm lg:text-base font-bold py-3.5 px-4"
          >
            About CODE-RED
          </NuxtLink>
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

    <div class="bg-white py-20">
  <div class="mx-auto max-w-7xl px-6 text-center lg:px-8">
    <div class="mx-auto max-w-2xl">
      <h2 class="text-34l text-balance font-semibold tracking-tight text-gray-900 sm:text-5xl">Meet our leadership</h2>
      <p class="mt-6 text-lg/8 text-gray-600">We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results.</p>
    </div>
    <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      <li v-for="member in teamMembers"
      :key="member.name">
        <img class="mx-auto size-56 rounded-full" :src="member.image" alt="">
        <h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">{{ member.name }}</h3>
        <p class="text-sm/6 text-gray-600">{{ member.role }}</p>
        <ul role="list" class="mt-6 flex justify-center gap-x-6">
          <!-- <li>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">X</span>
              <svg class="size-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
              </svg>
            </a>
          </li> -->
          <li>
            <a :href="member.social" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">LinkedIn</span>
              <svg class="size-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
              </svg>
            </a>
          </li>
        </ul>
      </li>

    </ul>
  </div>
</div>


  <FooterSection />

  <!-- <CoreFullScreenLoader
      text="Authenticating..."
      logo="/path-to-your-logo.png"
    /> -->
      
  </main>
</template>

<script setup lang="ts">
// import useUserLocation from '@/composables/core/useUserLocation';
// const { latitude, longitude, error, address, loading } = useUserLocation();
import service1 from "@/assets/img/service1.png";
import service2 from "@/assets/img/service2.png";
import service3 from "@/assets/img/service3.png";
import service4 from "@/assets/img/service4.png";
import ceo from '@/assets/img/ceo.jpeg'
import cto from '@/assets/img/cto.jpg'
import coo from '@/assets/img/coo.jpeg'
import cmo from '@/assets/img/people1.jpeg'



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
  { name: "Anita Orji", role: "Co-Founder & CEO", image: ceo, social: 'https://www.linkedin.com/in/anita-orji-uzoma/?originalSubdomain=ng' },
  { name: "Oluwakemi Ifedoyin", role: "Co-Founder & COO", image: coo, social: 'https://www.linkedin.com/in/oluwakemi-ifedoyin/?originalSubdomain=ng' },
  { name: "Marquis Abah", role: "Chief Technology Officer (CTO)", image: cto, social: 'https://www.linkedin.com/in/marquis-abah-584a12199/' },
  { name: "Chioma Ileka", role: "Head Of Marketing", image: cmo, social: '' },
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
