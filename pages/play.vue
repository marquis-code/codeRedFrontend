<template>
    <div class="flex flex-col md:flex-row items-center container mx-auto justify-between p-8 bg-white">
      <div class="text-left md:max-w-lg space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold">
          Need help <span class="text-red-600">locating</span> bed spaces?
        </h1>
        <p class="text-gray-600 text-lg">
          CODE-RED provides up-to-the-minute information on hospital bed
          availability, emergency hotline access, and essential first aid tips to
          streamline emergency response and save lives.
        </p>
        <button
          class="bg-red-600 text-white px-6 py-3 font-bold text-lg rounded-md shadow-md hover:bg-red-700"
        >
          FIND A BED-SPACE
        </button>
      </div>
  
      <!-- Image Section -->
      <div class="relative mt-8 md:mt-0">
        <img
          src="@/assets/img/animation.png"
          alt="Superhero"
          class="w-full max-w-xs md:max-w-md"
        />
      </div>
    </div>
  </template>
  