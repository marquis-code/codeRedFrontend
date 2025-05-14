<template>
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <div
        :class="[
          'fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
      >
        <div class="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 class="text-xl font-bold text-gray-800 dark:text-white">Blog Admin</h1>
          <button @click="toggleSidebar" class="md:hidden">
            <XIcon class="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <nav class="px-4 py-4">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/dashboard"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                active-class="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              >
                <LayoutDashboardIcon class="w-5 h-5 mr-3" />
                Dashboard
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/dashboard/blogs"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                active-class="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              >
                <FileTextIcon class="w-5 h-5 mr-3" />
                Blogs
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/dashboard/blogs/create"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                active-class="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              >
                <PlusCircleIcon class="w-5 h-5 mr-3" />
                Create Blog
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
  
      <!-- Main Content -->
      <div class="flex flex-col flex-1 md:ml-64">
        <!-- Top Navigation -->
        <header class="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button @click="toggleSidebar" class="md:hidden">
            <MenuIcon class="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
          <div class="flex items-center space-x-4">
            <button @click="toggleTheme" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <SunIcon v-if="isDark" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <MoonIcon v-else class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <div class="relative">
              <img
                src="https://ui-avatars.com/api/?name=Admin+User"
                alt="User"
                class="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>
  
        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-4 md:p-6">
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { MenuIcon, XIcon, FileTextIcon, PlusCircleIcon, LayoutDashboardIcon, SunIcon, MoonIcon } from 'lucide-vue-next'
  
  const isSidebarOpen = ref(false)
  const isDark = ref(false)
  
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }
  
  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }
  
  onMounted(() => {
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }
  })
  </script>