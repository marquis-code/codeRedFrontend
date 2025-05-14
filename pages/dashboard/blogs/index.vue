<template>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Blogs</h1>
        <NuxtLink
          to="/dashboard/blogs/create"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <PlusIcon class="w-5 h-5 mr-1" />
          New Blog
        </NuxtLink>
      </div>
      
      <!-- Search and Filter -->
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="relative flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search blogs..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <SearchIcon class="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
        
        <select
          v-model="statusFilter"
          class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      
      <!-- Blogs Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div v-if="isLoading" class="p-6 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading blogs...</p>
        </div>
        
        <div v-else-if="filteredBlogs.length === 0" class="p-6 text-center">
          <p class="text-gray-500 dark:text-gray-400">
            {{ searchQuery || statusFilter !== 'all' ? 'No blogs match your filters' : 'No blogs found' }}
          </p>
          <NuxtLink 
            to="/blogs/create" 
            class="mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            <PlusCircleIcon class="w-4 h-4 mr-1" />
            Create a new blog
          </NuxtLink>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Blog
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Updated
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr 
                v-for="blog in filteredBlogs" 
                :key="blog.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img 
                        :src="blog.coverImage || '/placeholder.svg?height=40&width=40'" 
                        alt="" 
                        class="h-10 w-10 rounded-md object-cover"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ blog.title }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {{ blog.excerpt }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="blog.published ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'"
                  >
                    {{ blog.published ? 'Published' : 'Draft' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(blog.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(blog.updatedAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <NuxtLink 
                      :to="`/blogs/${blog.id}/edit`" 
                      class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      title="Edit"
                    >
                      <EditIcon class="w-5 h-5" />
                    </NuxtLink>
                    <button 
                      @click="confirmDelete(blog)"
                      class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      title="Delete"
                    >
                      <TrashIcon class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-gray-500 dark:text-gray-400">
          Are you sure you want to delete "<span class="font-medium">{{ blogToDelete?.title }}</span>"? This action cannot be undone.
        </p>
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false" 
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button 
            @click="deleteBlogConfirmed"
            class="px-4 py-2 border border-transparent rounded-md text-sm text-white bg-red-600 hover:bg-red-700"
            :disabled="isDeleting"
          >
            <span v-if="isDeleting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Deleting...
            </span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { PlusIcon, SearchIcon, EditIcon, TrashIcon, PlusCircleIcon } from 'lucide-vue-next'
  import { useBlog, type Blog } from '@/composables/useBlog'
  
  const { blogs, isLoading, fetchBlogs, deleteBlog } = useBlog()
  
  const searchQuery = ref('')
  const statusFilter = ref('all')
  const showDeleteModal = ref(false)
  const blogToDelete = ref<Blog | null>(null)
  const isDeleting = ref(false)
  
  onMounted(async () => {
    await fetchBlogs()
  })

  definePageMeta({
      layout: 'dashboard'
  })
  
  
  const filteredBlogs = computed(() => {
    return blogs.value.filter(blog => {
      // Filter by search query
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            blog.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      // Filter by status
      const matchesStatus = statusFilter.value === 'all' ||
                            (statusFilter.value === 'published' && blog.published) ||
                            (statusFilter.value === 'draft' && !blog.published)
      
      return matchesSearch && matchesStatus
    })
  })
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }
  
  const confirmDelete = (blog: Blog) => {
    blogToDelete.value = blog
    showDeleteModal.value = true
  }
  
  const deleteBlogConfirmed = async () => {
    if (!blogToDelete.value) return
    
    isDeleting.value = true
    
    try {
      await deleteBlog(blogToDelete.value.id)
      showDeleteModal.value = false
      blogToDelete.value = null
    } catch (error) {
      console.error('Error deleting blog:', error)
      // In a real app, you would show an error notification
    } finally {
      isDeleting.value = false
    }
  }
  </script>