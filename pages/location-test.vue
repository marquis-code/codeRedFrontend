<template>
    <div class="h-screen grid place-content-center">
      <button class="bg-red-500 text-white px-6 py-3 rounded-md" @click="getLocation">Get Location</button>
    </div>
  </template>
  
  <script setup>
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  </script>
  