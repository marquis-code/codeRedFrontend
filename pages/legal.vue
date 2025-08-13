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
              <h1 class="text-3xl font-bold text-gray-900 mt-4">Legal Information</h1>
              <p class="text-gray-600 mt-2">Compliance and regulatory information</p>
            </div>
          </div>
        </header>
  
        <!-- Content -->
        <main class="max-w-4xl mx-auto px-4 py-8">
          <div class="bg-white rounded-lg p-8">
            <div class="prose prose-lg max-w-none">
              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">Regulatory Compliance</h2>
                <p class="text-gray-700 leading-relaxed mb-4">
                  Our Emergency Healthcare Platform operates in compliance with Nigerian healthcare regulations and data protection laws:
                </p>
                <ul class="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Nigerian Data Protection Regulation (NDPR) 2019</li>
                  <li>National Health Act 2014</li>
                  <li>Federal Ministry of Health guidelines</li>
                  <li>Lagos State Health Service Commission regulations</li>
                  <li>Nigerian Communications Commission (NCC) guidelines</li>
                </ul>
              </section>
  
              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">Medical Disclaimer</h2>
                <div class="p-4 mb-4" style="background-color: #fffbeb; border-left: 4px solid #f59e0b;">
                  <p class="font-medium" style="color: #92400e;">
                    This platform provides information services only and does not practice medicine or provide medical services.
                  </p>
                </div>
              </section>
  
              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">Contact Legal Department</h2>
                <p class="text-gray-700 leading-relaxed">
                  For legal inquiries, compliance questions, or regulatory matters:
                </p>
                <div class="mt-4 p-4 rounded-lg" style="background-color: #f9fafb;">
                  <p class="text-gray-700">Email: legal@emergencyhealthcare.ng</p>
                  <p class="text-gray-700">Phone: +234-XXX-XXXX</p>
                  <p class="text-gray-700">Address: Lagos, Nigeria</p>
                  <p class="text-gray-700">Business Hours: Monday - Friday, 9:00 AM - 5:00 PM WAT</p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useHead } from '#imports';
  
  useHead({
    title: 'Legal Information - Emergency Healthcare Platform',
    meta: [
      { name: 'description', content: 'Legal information and regulatory compliance for our emergency healthcare platform in Nigeria.' }
    ]
  })
  </script>
  