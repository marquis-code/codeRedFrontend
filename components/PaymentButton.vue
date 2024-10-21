<template>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="makePayment"
    >
      Pay Now
    </button>
  </template>
  
  <script setup lang="ts">
  // Import the composable
  import usePayza from '@/composables/core/usePayza';
  
  // Destructure the method from the composable
  const { createPaymentForm } = usePayza();
  
  // Define the function to initiate payment
  const makePayment = () => {
    // Call the function with the payment details
    createPaymentForm(100, 'USD', 'Payment for services');
  };
  </script>
  
  <style scoped>
  /* Custom Tailwind CSS for button styling */
  button {
    @apply transition ease-in-out duration-150;
  }
  </style>
  