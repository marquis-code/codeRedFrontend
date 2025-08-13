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
              <h1 class="text-3xl font-bold text-gray-900 mt-4">Terms of Use</h1>
              <p class="text-gray-600 mt-2">Last updated: {{ lastUpdated }}</p>
            </div>
          </div>
        </header>
  
        <!-- Content -->
        <main class="max-w-4xl mx-auto px-4 py-8">
          <div class="bg-white rounded-lg p-8">
            <div class="prose prose-lg max-w-none">
              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
                <p class="text-gray-700 leading-relaxed">
                  By accessing and using our Emergency Healthcare Platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>
  
              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">Emergency Services Disclaimer</h2>
                <div class="p-4 mb-4" style="background-color: #fef2f2; border-left: 4px solid #f87171;">
                  <p class="font-medium" style="color: #991b1b;">
                    IMPORTANT: This platform is a supplementary tool and should not replace direct emergency services. In life-threatening emergencies, always call emergency services directly.
                  </p>
                </div>
              </section>
  
              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <p class="text-gray-700 leading-relaxed">
                  For questions about these Terms of Use, please contact us:
                </p>
                <div class="mt-4 p-4 rounded-lg" style="background-color: #f9fafb;">
                  <p class="text-gray-700">Email: legal@emergencyhealthcare.ng</p>
                  <p class="text-gray-700">Phone: +234-XXX-XXXX</p>
                  <p class="text-gray-700">Address: Lagos, Nigeria</p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useHead } from '#app'
  
  const lastUpdated = ref('January 2025')
  
  useHead({
    title: 'Terms of Use - Emergency Healthcare Platform',
    meta: [
      { name: 'description', content: 'Terms of Use for our emergency healthcare platform providing real-time hospital bed availability and ambulance services in Nigeria.' }
    ]
  })
  </script>
  