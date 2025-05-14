<template>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Blog</h1>
      </div>
      
      <div v-if="isLoading" class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading blog...</p>
      </div>
      
      <div v-else-if="error" class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div class="text-center text-red-500">
          <p>{{ error }}</p>
          <button 
            @click="fetchBlog(id)" 
            class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
      
      <div v-else-if="currentBlog" class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <BlogForm :blog="currentBlog" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useBlog } from '@/composables/useBlog'
  
  const route = useRoute()
  const id = route.params.id as string
  const { currentBlog, isLoading, error, fetchBlog } = useBlog()
  
  onMounted(async () => {
    await fetchBlog(id)
  })

  definePageMeta({
      layout: 'dashboard'
  })
  
  </script>