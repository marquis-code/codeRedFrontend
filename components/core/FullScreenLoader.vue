<template>
    <div
      v-if="showModal"
      class="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-90"
    >
      <div
        class="bg-white rounded-lg p-8 w-[90%] max-w-md shadow-lg text-center"
      >
        <div class="flex justify-center mb-4">
          <div class="w-12 h-12 flex items-center justify-center rounded-full">
            <img src="@/assets/icons/location.svg" />
          </div>
        </div>
        <h2 class="text-lg font-semibold text-green-600">Turn On Location Services!</h2>
        <p class="text-gray-600 text-sm mt-2">
          Enable Location Services to Continue! <br />
          Your location is required to provide accurate and tailored services, such as finding nearby options or ensuring the best route for your needs.
        </p>
        <button
          @click="requestLocationAccess"
          class="mt-6 px-6 py-3 bg-[#CC1100] text-white rounded-md hover:bg-pink-600 transition"
        >
          Proceed to Enable
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useCustomToast } from '@/composables/core/useCustomToast'
  const { showToast } = useCustomToast();
  
  // State to control modal visibility
  const showModal = ref(false);
  
  // Function to request location access
  // const requestLocationAccess = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log("Location access granted:", position);
  //       showToast({
  //         title: "Success",
  //         message: `"Location access granted:", ${position}`,
  //         toastType: "success",
  //         duration: 3000
  //       });
  //       showModal.value = false; // Close modal if location is accessible
  //     },
  //     (error) => {
  //       console.error("Location access denied or unavailable:", error);
  //       showToast({
  //         title: "Success",
  //         message: "Please enable location services in your device settings.",
  //         toastType: "success",
  //         duration: 3000
  //       });
  //       alert("Please enable location services in your device settings.");
  //     }
  //   );
  // };

  const requestLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location access granted:", position);

          // Show success toast
          showToast({
            title: "Success",
            message: "Location access granted! Your changes will be applied.",
            toastType: "success",
            duration: 3000,
          });

          showModal.value = false; // Close the modal

          // Refresh the page after a short delay
          setTimeout(() => {
            window.location.reload(); // Refresh to apply changes
          }, 3000); // Allow the toast to display fully before refreshing
        },
        (error) => {
          console.error("Location access denied or unavailable:", error);

          // Show error toast
          showToast({
            title: "Error",
            message: "Error getting location: Please enable location services in your device settings.",
            toastType: "error",
            duration: 3000,
          });

          // Optionally, you could close the modal or take additional actions here
          showModal.value = false;
        }
    );
    } else {
      showToast({
            title: "Error",
            message: "Geolocation is not supported by this browser.",
            toastType: "error",
            duration: 3000,
          });
    }
  };

  // Check if location is enabled when the component is mounted
  onMounted(() => {
    navigator.geolocation.getCurrentPosition(
      () => {
        // Location is already enabled, no need to show the modal
        showModal.value = false;
      },
      () => {
        // Location is not enabled, show the modal
        showModal.value = true;
      }
    );
  });
  </script>
  
  <style scoped></style>
  