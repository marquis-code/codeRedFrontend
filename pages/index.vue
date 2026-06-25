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
          class="w-full max-w-xs mr-24  md:max-w-md"
        />
      </div>
        <p class="text-gray-600 font-light lg:text-lg leading-tight lg:leading-7">
          Get real-time updates on hospital bed availability, essential first aid tips, and access to ambulance services when you need them most.
        </p>

          <EmergencyButton />

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
  
      <div class="relative mt-8 md:mt-0 hidden lg:block">
        <img
          src="@/assets/img/animation.png"
          alt="Superhero"
          class="w-full max-w-xs mr-24 md:max-w-md"
        />
      </div>
    </div>

    <div class="bg-gray-50 py-12">
      <BedspaceAvailabilityUpdated />
      
      <div class="container mx-auto px-8 max-w-5xl mt-12 mb-16">
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 transform transition-all hover:shadow-md">
          <div class="bg-red-50 p-4 rounded-2xl flex-shrink-0">
            <svg width="32" height="32" viewBox="0 0 21 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.77143 27.4143C5.77143 28.2079 6.42071 28.8571 7.21429 28.8571H12.9857C13.7793 28.8571 14.4286 28.2079 14.4286 27.4143V25.9714H5.77143V27.4143ZM10.1 0C4.53057 0 0 4.53057 0 10.1C0 13.534 1.717 16.5496 4.32857 18.382V21.6429C4.32857 22.4364 4.97786 23.0857 5.77143 23.0857H14.4286C15.2221 23.0857 15.8714 22.4364 15.8714 21.6429V18.382C18.483 16.5496 20.2 13.534 20.2 10.1C20.2 4.53057 15.6694 0 10.1 0ZM12.9857 16.8814V20.2H7.21429V16.8814C5.02114 15.3376 2.88571 13.7504 2.88571 10.1C2.88571 6.11771 6.11771 2.88571 10.1 2.88571C14.0823 2.88571 17.3143 6.11771 17.3143 10.1C17.3143 13.6927 15.1356 15.3664 12.9857 16.8814Z" fill="#CC1100"/>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Interactive Hospital Indicators</h3>
            <p class="text-gray-600 leading-relaxed">
              Click on a hospital color box indicator above to get real-time map directions, instantly access emergency hotlines, and watch short illustrative videos designed for emergency situations.
            </p>
          </div>
        </div>
      </div>
    </div>
  

  <FooterSection />

  <AppFooter />

  </main>
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
