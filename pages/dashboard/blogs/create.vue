<template>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Blog</h1>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <BlogForm />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

definePageMeta({
      layout: 'dashboard'
  })
  
  // Create blog page
  </script>