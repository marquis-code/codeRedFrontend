<template>
    <div class="p-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-lg font-bold mb-4">Hospitals are filtered based on your location</div>
        <div class="space-y-2">
          <HospitalStatus name="Lagos University Teaching Hospital (LUTH)" status="busy" />
          <HospitalStatus name="Federal Medical Centre (FMC), Ebute-Metta" status="available" />
          <HospitalStatus name="Isolo General Hospital" status="unavailable" />
        </div>
        <div class="mt-4 flex justify-end text-blue-600 cursor-pointer">View All ></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import HospitalStatus from './HospitalStatus.vue';
  </script>
  