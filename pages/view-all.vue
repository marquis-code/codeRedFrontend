<template>
    <main>
      <section class="border-b border-gray-400 lg:h-24 sticky top-0 bg-gray-100 z-[9999999]">
        <NavigationBar :isMobile="isMobile" @close="isMobile = false" @open="isMobile = true" />
      </section>
  
      <ViewAll id="filter" class="pt-16 z-10" />
  
      <!-- Scroll Buttons -->
      <div class="fixed bottom-10 space-x-2 right-10 space-y-2">
        <button
          @click="scrollToTop"
          class="bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
        >
        <img src="@/assets/icons/arrow-down.svg" class="h-10 w-10" />
        </button>
        <button
          @click="scrollToBottom"
          class="bg-green-500 text-white rounded-full shadow hover:bg-green-600"
        >
        <img src="@/assets/icons/arrow-up.svg" class="h-10 w-10" />
        </button>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  // import useUserLocation from '@/composables/core/useUserLocation';
  // const { latitude, longitude, error, address, loading } = useUserLocation();
  import ceo from '@/assets/img/ceo.jpeg';
  import cto from '@/assets/img/cto.jpg';
  import coo from '@/assets/img/coo.jpeg';
  
  const isMobile = ref(false);
  
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
      textColor: "bg-blue-500 text-white",
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
  
  // Scroll to Top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  // Scroll to Bottom
  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
  </script>
  