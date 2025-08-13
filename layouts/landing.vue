<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <!-- Header -->
      <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-medical-primary to-medical-secondary rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-xl font-display font-bold text-gray-900">MediFinder</h1>
                <p class="text-xs text-gray-500">Find medical care nearby</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <div class="pulse-dot available"></div>
                <span>Real-time availability</span>
              </div>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="flex-1">
        <slot />
      </main>
  
      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="text-center text-sm text-gray-500">
            <p>&copy; 2024 MediFinder. Helping you find medical care when you need it most.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  