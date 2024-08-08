<template>
  <div class="bg-white shadow rounded-xl overflow-hidden border border-gray-700 pt-5 relative">
    <div class="flex justify-center items-center z-10">
      <img
        :src="imageSrc"
        alt=""
        class="w-72 h-72 object-center object-cover"
      />
    </div>
    <div class="p-5 bg-[#FFFFFFCC] z-50 w-full bottom-0 absolute inset-x-0">
      <div class="flex justify-between items-center">
        <h3 class="font-semibold text-lg mb-2 text-[#CC1100]">{{ title }}</h3>
        <div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_54_20)">
              <path
                d="M19.0243 6.65625L17.2691 8.41149L22.9705 14.1254H2.84125V16.6151H22.9705L17.2566 22.3289L19.0243 24.0842L27.7383 15.3702L19.0243 6.65625Z"
                fill="#0FB259"
              />
            </g>
            <defs>
              <clipPath id="clip0_54_20">
                <rect
                  width="29.8765"
                  height="29.8765"
                  fill="white"
                  transform="translate(0.351562 0.431641)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <p class="text-[#000000] leading-snug max-w-sm text-sm font-light">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  description: String,
  imageSrc: String,
});
</script>
