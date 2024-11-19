<template>
    <div class="bg-white border-[0.5px] border-gray-200 rounded-lg p-3 w-80 flex-shrink-0">
      <div class="relative">
        <iframe
          :src="video.url"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-40 object-cover rounded-lg"
        ></iframe>
        <div class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
          {{ video.duration }}
        </div>
      </div>
      <div class="mt-4 space-y-3 lg:space-y-0">
        <h3 class="text-red-600 font-semibold text-sm lg:text-base">{{ video.title }}</h3>
        <p class="text-gray-500 text-xs lg:text-base">{{ video.description }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'VideoCard',
    props: {
      video: {
        type: Object,
        required: true
      }
    }
  });
  </script>
  