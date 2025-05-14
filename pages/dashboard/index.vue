<template>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Stats Cards -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-300">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-4">
              <FileTextIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Blogs</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ blogs.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-300">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mr-4">
              <CheckCircleIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Published</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ publishedCount }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-300">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 mr-4">
              <ClockIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Drafts</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ blogs.length - publishedCount }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent Blogs -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">Recent Blogs</h2>
        </div>
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div v-if="isLoading" class="p-6 text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading blogs...</p>
          </div>
          
          <div v-else-if="blogs.length === 0" class="p-6 text-center">
            <p class="text-gray-500 dark:text-gray-400">No blogs found</p>
            <NuxtLink 
              to="/blogs/create" 
              class="mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <PlusCircleIcon class="w-4 h-4 mr-1" />
              Create your first blog
            </NuxtLink>
          </div>
          
          <div v-else>
            <div v-for="blog in recentBlogs" :key="blog.id" class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ blog.title }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(blog.createdAt) }}
                  </p>
                </div>
                <div class="flex items-center">
                  <span 
                    class="px-2 py-1 text-xs rounded-full"
                    :class="blog.published ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'"
                  >
                    {{ blog.published ? 'Published' : 'Draft' }}
                  </span>
                  <NuxtLink 
                    :to="`/dashboard/blogs/${blog.id}/edit`" 
                    class="ml-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <EditIcon class="w-5 h-5" />
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <div class="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
              <NuxtLink 
                to="/dashboard/blogs" 
                class="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center"
              >
                View all blogs
                <ChevronRightIcon class="w-4 h-4 ml-1" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { FileTextIcon, CheckCircleIcon, ClockIcon, PlusCircleIcon, EditIcon, ChevronRightIcon } from 'lucide-vue-next'
  import { useBlog } from '@/composables/useBlog'
  
  const { blogs, isLoading, fetchBlogs } = useBlog()
  
  onMounted(async () => {
    await fetchBlogs()
  })

  definePageMeta({
      layout: 'dashboard'
  })
  
  const publishedCount = computed(() => {
    return blogs.value.filter(blog => blog.published).length
  })
  
  const recentBlogs = computed(() => {
    return [...blogs.value]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
  })
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }
  </script>