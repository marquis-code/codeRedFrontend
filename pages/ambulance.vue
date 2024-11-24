<template>
  <section class="border-b border-gray-400 lg:h-24">
    <NavigationBar :isMobile="isMobile" @close="isMobile = false" @open="isMobile = true" />
  </section>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900">Get in Touch</h2>
            <p class="mt-4 text-base/7 text-gray-600">
              Reach out to us for reliable ambulance services in Lagos. We are here to respond swiftly and professionally to your emergency needs.
            </p>
          </div>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
            <div class="rounded-2xl bg-gray-50 p-10">
              <h3 class="text-base/7 font-semibold text-gray-900">Emergency Services</h3>
              <dl class="mt-3 space-y-1 text-sm/6 text-gray-600">
                <div>
                  <dt class="sr-only">Email</dt>
                  <dd><a class="font-semibold text-indigo-600" href="mailto:emergency@lagosambulance.com">emergency@lagosambulance.com</a></dd>
                </div>
                <div class="mt-1">
                  <dt class="sr-only">Phone number</dt>
                  <dd>+234 (0) 805 555 6789</dd>
                </div>
              </dl>
            </div>
            <div class="rounded-2xl bg-gray-50 p-10">
              <h3 class="text-base/7 font-semibold text-gray-900">Non-Emergency Transport</h3>
              <dl class="mt-3 space-y-1 text-sm/6 text-gray-600">
                <div>
                  <dt class="sr-only">Email</dt>
                  <dd><a class="font-semibold text-indigo-600" href="mailto:transport@lagosambulance.com">transport@lagosambulance.com</a></dd>
                </div>
                <div class="mt-1">
                  <dt class="sr-only">Phone number</dt>
                  <dd>+234 (0) 806 777 5432</dd>
                </div>
              </dl>
            </div>
            <div class="rounded-2xl bg-gray-50 p-10">
              <h3 class="text-base/7 font-semibold text-gray-900">Partnerships</h3>
              <dl class="mt-3 space-y-1 text-sm/6 text-gray-600">
                <div>
                  <dt class="sr-only">Email</dt>
                  <dd><a class="font-semibold text-indigo-600" href="mailto:partners@lagosambulance.com">partners@lagosambulance.com</a></dd>
                </div>
                <div class="mt-1">
                  <dt class="sr-only">Phone number</dt>
                  <dd>+234 (0) 809 888 9101</dd>
                </div>
              </dl>
            </div>
            <div class="rounded-2xl bg-gray-50 p-10">
              <h3 class="text-base/7 font-semibold text-gray-900">General Inquiries</h3>
              <dl class="mt-3 space-y-1 text-sm/6 text-gray-600">
                <div>
                  <dt class="sr-only">Email</dt>
                  <dd><a class="font-semibold text-indigo-600" href="mailto:info@lagosambulance.com">info@lagosambulance.com</a></dd>
                </div>
                <div class="mt-1">
                  <dt class="sr-only">Phone number</dt>
                  <dd>+234 (0) 701 234 5678</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-3">
          <div>
            <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900">Our Locations</h2>
            <p class="mt-4 text-base/7 text-gray-600">
              We have operational centers strategically located across Lagos to ensure quick response times.
            </p>
          </div>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
            <div class="rounded-2xl bg-gray-50 p-10">
              <h3 class="text-base/7 font-semibold text-gray-900">Ikeja</h3>
              <address class="mt-3 space-y-1 text-sm/6 not-italic text-gray-600">
                <p>12 Obafemi Awolowo Way</p>
                <p>Ikeja, Lagos</p>
              </address>
            </div>
            <div class="rounded-2xl bg-gray-50 p-10">
              <h3 class="text-base/7 font-semibold text-gray-900">Victoria Island</h3>
              <address class="mt-3 space-y-1 text-sm/6 not-italic text-gray-600">
                <p>23 Akin Adesola Street</p>
                <p>Victoria Island, Lagos</p>
              </address>
            </div>
            <div class="rounded-2xl bg-gray-50 p-10">
              <h3 class="text-base/7 font-semibold text-gray-900">Surulere</h3>
              <address class="mt-3 space-y-1 text-sm/6 not-italic text-gray-600">
                <p>45 Bode Thomas Street</p>
                <p>Surulere, Lagos</p>
              </address>
            </div>
            <div class="rounded-2xl bg-gray-50 p-10">
              <h3 class="text-base/7 font-semibold text-gray-900">Lekki</h3>
              <address class="mt-3 space-y-1 text-sm/6 not-italic text-gray-600">
                <p>18 Admiralty Way</p>
                <p>Lekki Phase 1, Lagos</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isMobile = ref(false)
</script>
