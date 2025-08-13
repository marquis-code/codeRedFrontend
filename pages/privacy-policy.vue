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
              <h1 class="text-3xl font-bold text-gray-900 mt-4">Privacy Policy</h1>
              <p class="text-gray-600 mt-2">Last updated: {{ lastUpdated }}</p>
            </div>
          </div>
        </header>
  
        <!-- Content -->
        <main class="max-w-4xl mx-auto px-4 py-8">
          <div class="bg-white rounded-lg p-8">
            <div class="prose prose-lg max-w-none">
              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                <p class="text-gray-700 leading-relaxed">
                  At our Emergency Healthcare Platform, we are committed to protecting your privacy and ensuring the security of your personal and medical information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our real-time hospital bed availability service, emergency ambulance connections, and healthcare navigation platform.
                </p>
              </section>
  
              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                
                <h3 class="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
                <ul class="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Name, phone number, and email address</li>
                  <li>Emergency contact information</li>
                  <li>Medical information relevant to emergency care</li>
                  <li>Insurance information when provided</li>
                </ul>
  
                <h3 class="text-xl font-medium text-gray-800 mb-3">Location Data</h3>
                <ul class="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>GPS coordinates for emergency response</li>
                  <li>Address information for hospital navigation</li>
                  <li>Location history for service improvement</li>
                </ul>
  
                <h3 class="text-xl font-medium text-gray-800 mb-3">Usage Information</h3>
                <ul class="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Hospital searches and bed availability queries</li>
                  <li>Ambulance service requests</li>
                  <li>First aid content accessed</li>
                  <li>Device information and IP address</li>
                </ul>
              </section>
  
              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p class="text-gray-700 leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div class="mt-4 p-4 rounded-lg" style="background-color: #f9fafb;">
                  <a href="mailto:emergencycoderedapp@gmail.com" class="text-gray-700">Email: emergencycoderedapp@gmail.com</a>
                  <p class="text-gray-700">Phone: +234-XXX-XXXX</p>
                  <p class="text-gray-700">Address: Mushin Idi-araba, Lagos, Nigeria</p>
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
    title: 'Privacy Policy - Emergency Healthcare Platform',
    meta: [
      { name: 'description', content: 'Privacy Policy for our emergency healthcare platform providing real-time hospital bed availability and ambulance services in Nigeria.' }
    ]
  })
  </script>
  