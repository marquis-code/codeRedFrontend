<template>
    <div class="min-h-screen">
      <div class="bg-gray-50 min-h-screen">
        <!-- Header -->
        <header class="bg-white">
          <div class="border-b border-gray-200">
            <div class="max-w-4xl mx-auto px-4 py-6">
              <NuxtLink to="/" class="text-red-600 hover:text-red-700 font-medium">
                ← Back to Home
              </NuxtLink>
              <h1 class="text-3xl font-bold text-gray-900 mt-4">Site Map</h1>
              <p class="text-gray-600 mt-2">Navigate through all pages and features of our platform</p>
            </div>
          </div>
        </header>
  
        <!-- Content -->
        <main class="max-w-4xl mx-auto px-4 py-8">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Main Pages -->
            <div class="bg-white rounded-lg p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Main Pages</h2>
              <ul class="space-y-3">
                <li>
                  <NuxtLink to="/" class="text-red-600 hover:text-red-700 font-medium">
                    Home
                  </NuxtLink>
                  <p class="text-sm text-gray-600">Hospital search and emergency services</p>
                </li>
                <li>
                  <NuxtLink to="/about" class="text-red-600 hover:text-red-700 font-medium">
                    About Us
                  </NuxtLink>
                  <p class="text-sm text-gray-600">Our mission and company information</p>
                </li>
              </ul>
            </div>
  
            <!-- Legal & Compliance -->
            <div class="bg-white rounded-lg p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Legal & Compliance</h2>
              <ul class="space-y-3">
                <li>
                  <NuxtLink to="/privacy-policy" class="text-red-600 hover:text-red-700 font-medium">
                    Privacy Policy
                  </NuxtLink>
                  <p class="text-sm text-gray-600">How we protect your data</p>
                </li>
                <li>
                  <NuxtLink to="/terms-of-use" class="text-red-600 hover:text-red-700 font-medium">
                    Terms of Use
                  </NuxtLink>
                  <p class="text-sm text-gray-600">Platform usage guidelines</p>
                </li>
                <li>
                  <NuxtLink to="/legal" class="text-red-600 hover:text-red-700 font-medium">
                    Legal Information
                  </NuxtLink>
                  <p class="text-sm text-gray-600">Compliance and regulatory details</p>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useHead } from '#imports';
  
  useHead({
    title: 'Site Map - Emergency Healthcare Platform',
    meta: [
      { name: 'description', content: 'Complete site navigation for our emergency healthcare platform providing hospital bed availability and ambulance services in Nigeria.' }
    ]
  })
  </script>
  