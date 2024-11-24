<template>
  <main>
    <NuxtLayout>
      <CoreToast class="fixed top-4 right-4 z-[9999999]" />
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script>
import { provide } from 'vue';
import { visible, toastData, useCustomToast } from '@/composables/core/useCustomToast';

// Provide the toast state globally
provide('toastVisible', visible);
provide('toastData', toastData);

const showSplash = ref(true)

onMounted(() => {
  setTimeout(() => {
    showSplash.value = false
  }, 3000)
})
</script>

<style scoped>
/* Your CSS styles here */
</style>
