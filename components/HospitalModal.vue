<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" @click.self="$emit('close')">
    <!-- Desktop View -->
    <div class="hidden md:flex bg-white rounded-lg shadow-2xl w-full max-w-6xl h-5/6 overflow-hidden relative">
      <!-- Left Panel - Hospital Details -->
      <div class="w-1/2 bg-gradient-to-br from-white to-gray-50 overflow-y-auto">
        <!-- Animated close button for desktop -->
        <div class="sticky top-0 bg-white p-6 z-10 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="" />
              <!-- <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div> -->
              <div>
                <h1 class="text-2xl font-bold text-gray-900 leading-tight">
                  {{ hospitalName }}
                </h1>
                <p class="text-sm text-gray-600">{{ hospitalAddress }}</p>
              </div>
            </div>
            <button 
              @click="closeModal" 
              class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Desktop Details Content -->
        <div class="desktop-details-content">
          <!-- Status Banner -->
          <div class="px-6 py-4">
            <div class="flex items-center justify-between p-4 rounded-2xl transition-all duration-300" :class="statusBannerClasses">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full" :class="statusDotClasses"></div>
                <span class="font-semibold text-lg">{{ availabilityText }}</span>
              </div>
              <div v-if="hospital.isCodeRed" class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                CODE RED
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="px-6 pb-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition-all duration-300 hover:scale-105">
                <div class="text-sm text-gray-600 mb-1">From your location</div>
                <div class="text-3xl font-bold text-red-500 mb-1">
                  {{ estimatedTimeValue }}
                  <span class="text-sm font-normal text-gray-500">mins</span>
                </div>
                <div class="text-sm text-gray-600">Estimated Time Of Arrival</div>
              </div>

              <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition-all duration-300 hover:scale-105">
                <div class="text-sm text-gray-600 mb-1">From your location</div>
                <div class="text-3xl font-bold text-red-500 mb-1">
                  {{ distanceValue }}
                  <span class="text-sm font-normal text-gray-500">km</span>
                </div>
                <div class="text-sm text-gray-600">Distance</div>
              </div>
            </div>
          </div>

          <!-- Emergency Call Button -->
          <div class="px-6 pb-6">
            <button 
              @click="callEmergency"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              CALL EMERGENCY
            </button>
          </div>

          <!-- Hospital Information -->
          <div v-if="hospital.rating || hospital.phone || hospital.website" class="px-6 pb-6">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Hospital Information</h3>
              
              <div class="space-y-4">
                <div v-if="hospital.rating" class="flex items-center justify-between">
                  <span class="text-gray-600">Rating</span>
                  <div class="flex items-center gap-2">
                    <div class="flex items-center">
                      <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="getStarClass(i)" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <span class="font-semibold">{{ hospital.rating }}</span>
                    <span v-if="hospital.user_ratings_total" class="text-sm text-gray-500">({{ hospital.user_ratings_total }})</span>
                  </div>
                </div>

                <div v-if="hospital.phone" class="flex items-center justify-between">
                  <span class="text-gray-600">Phone</span>
                  <a :href="phoneLink" class="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    {{ hospital.phone }}
                  </a>
                </div>

                <div v-if="hospital.website" class="flex items-center justify-between">
                  <span class="text-gray-600">Website</span>
                  <a :href="hospital.website" target="_blank" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors">
                    Visit Website
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Bed Availability -->
          <div v-if="hospital.bedAvailability" class="px-6 pb-6">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Bed Availability</h3>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="(count, type) in hospital.bedAvailability" :key="type" class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span class="text-sm font-medium text-gray-700">{{ formatBedType(type) }}</span>
                  <span class="text-lg font-bold text-gray-900">{{ count }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Specialities -->
          <div v-if="hasSpecialities" class="px-6 pb-6">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Specialities</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="speciality in hospital.specialities" 
                  :key="speciality"
                  class="px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-xl border border-blue-100 transition-all hover:bg-blue-100"
                >
                  {{ speciality }}
                </span>
              </div>
            </div>
          </div>

          <!-- Get Directions Button -->
          <div class="px-6 pb-8">
            <button 
              @click="getDirections"
              :disabled="directionsDisabled"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg v-if="loadingDirections" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              GET DIRECTIONS
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Panel - Map -->
      <div class="w-1/2 relative">
        <div 
          ref="mapContainer" 
          class="w-full h-full"
          :class="{ 'block': true }"
        ></div>
        <!-- Map Controls Overlay -->
        <div class="absolute top-6 right-6 flex flex-col gap-3">
          <button 
            @click="openInGoogleMaps"
            class="bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-105"
            title="Open in Google Maps"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </button>
          
          <button 
            @click="centerMap"
            class="bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-105"
            title="Center Map"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>
        </div>

        <!-- Route Information Overlay -->
        <div v-if="routeInfo" class="absolute bottom-6 left-6 right-6">
          <div class="bg-white/95 rounded-2xl p-4 shadow-xl border border-gray-200 backdrop-blur-sm">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-bold text-gray-900">Route Information</h4>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Live Traffic
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-red-500">{{ routeInfo.duration }}</div>
                <div class="text-sm text-gray-600">Travel Time</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-red-500">{{ routeInfo.distance }}</div>
                <div class="text-sm text-gray-600">Total Distance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden bg-white w-full h-full flex flex-col relative">
      <!-- Mobile Header -->
      <div class="bg-white px-4 py-3  flex items-center justify-between border-b border-gray-200 z-20">
        <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <div class="flex items-center gap-2">
          <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="" />
          <!-- <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <span class="font-bold text-gray-900 text-lg">CODE-RED</span> -->
        </div>

        <!-- <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button> -->
      </div>

      <!-- Mobile Content Container -->
      <div class="flex-1 relative">
        <!-- Details View -->
        <div 
          v-show="currentMobileView === 'details'"
          class="absolute inset-0 bg-gray-50 transition-opacity duration-300"
          :class="{ 'opacity-100': currentMobileView === 'details', 'opacity-0': currentMobileView !== 'details' }"
        >
          <div class="h-full overflow-y-auto pb-20">
            <!-- Hospital Card -->
            <div class="p-4">
              <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-6 border-2 border-red-200 relative overflow-hidden">
                <!-- Status Badge -->
                <div class="absolute top-4 right-4">
                  <span class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {{ availabilityText }}
                  </span>
                </div>
                
                <h2 class="text-2xl font-bold text-red-600 mb-2 pr-20">
                  {{ hospitalName }}
                </h2>
                <p class="text-gray-600 text-base">{{ hospitalAddress }}</p>
              </div>
            </div>

            <!-- Stats Cards -->
            <div class="px-4 pb-4">
              <div class="grid grid-cols-1 gap-4">
                <!-- Time Card -->
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-sm text-gray-600 mb-1">From your location</div>
                      <div class="text-lg font-bold text-gray-900 mb-1">Estimated Time Of Arrival</div>
                      <div class="text-4xl font-bold text-red-500">
                        {{ estimatedTimeValue }}
                        <span class="text-lg font-normal text-gray-500">mins</span>
                      </div>
                    </div>
                    <button 
                      @click="callEmergency"
                      class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      CALL EMERGENCY
                    </button>
                  </div>
                </div>

                <!-- Distance Card -->
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div class="text-sm text-gray-600 mb-1">From your location</div>
                  <div class="text-lg font-bold text-gray-900 mb-1">Distance</div>
                  <div class="text-4xl font-bold text-red-500">
                    {{ distanceValue }}
                    <span class="text-lg font-normal text-gray-500">km</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hospital Information -->
            <div class="px-4 pb-4">
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Hospital Information</h3>
                
                <div class="space-y-4">
                  <div v-if="hospital.rating" class="flex items-center justify-between">
                    <span class="text-gray-600">Rating</span>
                    <div class="flex items-center gap-2">
                      <div class="flex items-center">
                        <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="getStarClass(i)" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <span class="font-semibold">{{ hospital.rating }}</span>
                    </div>
                  </div>

                  <div v-if="hospital.phone" class="flex items-center justify-between">
                    <span class="text-gray-600">Phone</span>
                    <a :href="phoneLink" class="text-blue-600 hover:text-blue-700 font-medium">
                      {{ hospital.phone }}
                    </a>
                  </div>

                  <div v-if="hospital.website" class="flex items-center justify-between">
                    <span class="text-gray-600">Website</span>
                    <a :href="hospital.website" target="_blank" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      Visit Website
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Specialities -->
            <div v-if="hasSpecialities" class="px-4 pb-4">
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Specialities</h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="speciality in hospital.specialities" 
                    :key="speciality"
                    class="px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-xl border border-blue-100"
                  >
                    {{ speciality }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map View -->
        <div 
          v-show="currentMobileView === 'map'"
          class="absolute inset-0 transition-opacity duration-300"
          :class="{ 'opacity-100': currentMobileView === 'map', 'opacity-0': currentMobileView !== 'map' }"
        >
          <!-- Added the missing map container div for mobile -->
          <div 
            ref="mapContainer" 
            class="w-full h-full"
          ></div>

          <!-- Mobile Map Controls -->
          <div class="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button 
              @click="openInGoogleMaps"
              class="bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-xl shadow-lg border border-gray-200 transition-all duration-300"
              title="Open in Google Maps"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </button>
            
            <button 
              @click="centerMap"
              class="bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-xl shadow-lg border border-gray-200 transition-all duration-300"
              title="Center Map"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>

          <!-- Mini Hospital Card (Mobile Map View) -->
          <div class="absolute bottom-4 left-4 right-4 z-10">
            <div class="bg-white rounded-2xl p-4 shadow-xl border border-gray-200 backdrop-blur-sm">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="52" height="52" rx="26" fill="#717171" fill-opacity="0.12"/>
<path d="M24.3009 12.9754V10.3251C24.3009 9.94967 24.4279 9.63495 24.6819 9.38097C24.9359 9.12699 25.2506 9 25.626 9C26.0015 9 26.3162 9.12699 26.5702 9.38097C26.8242 9.63495 26.9512 9.94967 26.9512 10.3251V12.9754C26.9512 13.3508 26.8242 13.6655 26.5702 13.9195C26.3162 14.1735 26.0015 14.3005 25.626 14.3005C25.2506 14.3005 24.9359 14.1735 24.6819 13.9195C24.4279 13.6655 24.3009 13.3508 24.3009 12.9754ZM17.5097 15.2281L15.4226 13.141C15.1576 12.876 15.0251 12.5613 15.0251 12.1969C15.0251 11.8324 15.1576 11.5177 15.4226 11.2527C15.6876 10.9877 15.9968 10.8552 16.3502 10.8552C16.7036 10.8552 17.0128 10.9877 17.2778 11.2527L19.398 13.3729C19.663 13.6379 19.7955 13.9471 19.7955 14.3005C19.7955 14.6539 19.663 14.963 19.398 15.2281C19.1329 15.4931 18.8182 15.6256 18.4538 15.6256C18.0894 15.6256 17.7747 15.4931 17.5097 15.2281ZM21.6507 32.8522C22.0261 32.8522 22.3408 32.7252 22.5948 32.4712C22.8488 32.2172 22.9758 31.9025 22.9758 31.5271C22.9758 31.1516 22.8488 30.8369 22.5948 30.5829C22.3408 30.3289 22.0261 30.2019 21.6507 30.2019H18.3379C18.1612 30.2019 18.0066 30.2682 17.8741 30.4007C17.7416 30.5332 17.6753 30.6878 17.6753 30.8645V32.1896C17.6753 32.3663 17.7416 32.5209 17.8741 32.6534C18.0066 32.7859 18.1612 32.8522 18.3379 32.8522H21.6507ZM29.6014 32.8522H32.9142C33.0909 32.8522 33.2455 32.7859 33.378 32.6534C33.5105 32.5209 33.5768 32.3663 33.5768 32.1896V30.8645C33.5768 30.6878 33.5105 30.5332 33.378 30.4007C33.2455 30.2682 33.0909 30.2019 32.9142 30.2019H29.6014C29.226 30.2019 28.9112 30.3289 28.6573 30.5829C28.4033 30.8369 28.2763 31.1516 28.2763 31.5271C28.2763 31.9025 28.4033 32.2172 28.6573 32.4712C28.9112 32.7252 29.226 32.8522 29.6014 32.8522ZM32.6161 21.0917L32.0198 20.4954C31.821 20.2967 31.5891 20.2028 31.3241 20.2138C31.059 20.2249 30.8271 20.3298 30.6284 20.5286C30.4296 20.7273 30.3302 20.9592 30.3302 21.2242C30.3302 21.4893 30.4296 21.7212 30.6284 21.9199L31.6885 22.98C31.9535 23.2451 32.2627 23.3776 32.6161 23.3776C32.9694 23.3776 33.2786 23.2451 33.5436 22.98L36.5252 20.0316C36.7239 19.8329 36.8233 19.601 36.8233 19.3359C36.8233 19.0709 36.7239 18.839 36.5252 18.6403C36.3264 18.4415 36.0945 18.3476 35.8295 18.3587C35.5645 18.3697 35.3326 18.4636 35.1338 18.6403L32.6161 21.0917ZM33.5768 14.3005C35.4099 14.3005 36.9724 14.9465 38.2644 16.2385C39.5564 17.5305 40.2024 19.093 40.2024 20.9261C40.2024 22.7592 39.5564 24.3217 38.2644 25.6137C36.9724 26.9057 35.4099 27.5517 33.5768 27.5517C31.7437 27.5517 30.1811 26.9057 28.8892 25.6137C27.5972 24.3217 26.9512 22.7592 26.9512 20.9261C26.9512 19.093 27.5972 17.5305 28.8892 16.2385C30.1811 14.9465 31.7437 14.3005 33.5768 14.3005ZM15.0251 39.4778C14.6496 39.4778 14.3349 39.3508 14.0809 39.0968C13.8269 38.8428 13.7 38.5281 13.7 38.1527V28.0155C13.7 27.8609 13.711 27.7063 13.7331 27.5517C13.7552 27.3971 13.7883 27.2535 13.8325 27.121L16.4827 19.601C16.6152 19.2034 16.8526 18.8832 17.195 18.6403C17.5373 18.3973 17.9183 18.2759 18.3379 18.2759H21.6507V16.9507C21.6507 16.5753 21.7777 16.2606 22.0317 16.0066C22.2856 15.7526 22.6003 15.6256 22.9758 15.6256H25.9905C25.4604 16.3765 25.0463 17.1992 24.7482 18.0936C24.45 18.9881 24.3009 19.9323 24.3009 20.9261H18.8017L16.8471 26.2266H25.9905C26.8739 27.4854 27.9781 28.4627 29.3033 29.1584C30.6284 29.8541 32.0529 30.2019 33.5768 30.2019C34.2835 30.2019 34.9626 30.1302 35.6141 29.9866C36.2657 29.8431 36.9117 29.6167 37.5521 29.3075V38.1527C37.5521 38.5281 37.4251 38.8428 37.1712 39.0968C36.9172 39.3508 36.6025 39.4778 36.227 39.4778H34.9019C34.5264 39.4778 34.2117 39.3508 33.9577 39.0968C33.7038 38.8428 33.5768 38.5281 33.5768 38.1527V36.8276H17.6753V38.1527C17.6753 38.5281 17.5483 38.8428 17.2943 39.0968C17.0404 39.3508 16.7256 39.4778 16.3502 39.4778H15.0251Z" fill="#00A878"/>
</svg>

                  <!-- <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </div> -->
                  <div>
                    <h4 class="font-bold text-gray-900 text-sm">{{ hospitalName }}</h4>
                    <p class="text-xs text-gray-600">{{ hospitalAddress }}</p>
                  </div>
                </div>
                <button 
                  @click="switchToDetailsView"
                  class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="View Details"
                >
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
              </div>
              
              <div v-if="routeInfo" class="mt-3 pt-3 border-t border-gray-100">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-lg font-bold text-red-500">{{ routeInfo.duration }}</div>
                    <div class="text-xs text-gray-600">Travel Time</div>
                  </div>
                  <div>
                    <div class="text-lg font-bold text-red-500">{{ routeInfo.distance }}</div>
                    <div class="text-xs text-gray-600">Distance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Bottom Button -->
      <div class="bg-white border-t border-gray-200 p-4 z-20">
        <button 
          v-if="currentMobileView === 'details'"
          @click="switchToMapView"
          :disabled="directionsDisabled"
          class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="loadingDirections" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"/>
          </svg>
          GET DIRECTIONS
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </button>
        
        <button 
          v-else
          @click="switchToDetailsView"
          class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          BACK TO DETAILS
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onUnmounted, watch } from 'vue'
import { useNuxtApp, useRouter, useRoute } from '#app'
import { useCustomToast } from '@/composables/core/useCustomToast'

interface Props {
  hospital: any
  userLocation: { lat: number | null, lng: number | null }
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const { $loadGoogleMaps } = useNuxtApp()
const { showToast } = useCustomToast()
const router = useRouter()
const route = useRoute()

const urlView = computed(() => route.query.view as string || 'details')
const currentMobileView = ref<'details' | 'map'>(urlView.value as 'details' | 'map' || 'details')

const mapContainer = ref<HTMLDivElement | null>(null)
const mapLoaded = ref(false)
const loadingDirections = ref(false)
const directions = ref([])
const routeInfo = ref(null)

let map: any = null
let directionsService: any = null
let directionsRenderer: any = null

const hospitalName = computed(() => props.hospital.hospitalName || props.hospital.name)
const hospitalAddress = computed(() => props.hospital.address || props.hospital.vicinity)

const statusBannerClasses = computed(() => {
  const availability = props.hospital.availability
  if (availability === 'available') return 'bg-green-50 border border-green-200 text-green-800'
  if (availability === 'unavailable') return 'bg-red-50 border border-red-200 text-red-800'
  if (availability === 'busy') return 'bg-yellow-50 border border-yellow-200 text-yellow-800'
  return 'bg-gray-50 border border-gray-200 text-gray-800'
})

const statusDotClasses = computed(() => {
  const availability = props.hospital.availability
  if (availability === 'available') return 'bg-green-500 animate-pulse'
  if (availability === 'unavailable') return 'bg-red-500'
  if (availability === 'busy') return 'bg-yellow-500 animate-pulse'
  return 'bg-gray-500'
})

const availabilityText = computed(() => {
  const availability = props.hospital.availability
  if (!availability) return 'Unavailable'
  return availability.charAt(0).toUpperCase() + availability.slice(1)
})

const estimatedTimeValue = computed(() => {
  if (props.hospital.distance && props.hospital.distance > 0) {
    return Math.round((props.hospital.distance / 30) * 60)
  }
  return '45'
})

const distanceValue = computed(() => {
  if (!props.hospital.distance) return '5'
  return props.hospital.distance.toFixed(1)
})

const phoneLink = computed(() => `tel:${props.hospital.phone}`)

const hasSpecialities = computed(() => {
  return props.hospital.specialities && props.hospital.specialities.length > 0
})

const directionsDisabled = computed(() => {
  return !props.userLocation.lat || !props.userLocation.lng || loadingDirections.value
})

const closeModal = () => {
  router.push({ query: { ...route.query, view: undefined } })
  emit('close')
}

const switchToMapView = async () => {
  try {
    loadingDirections.value = true
    
    await router.push({ query: { ...route.query, view: 'map' } })
    currentMobileView.value = 'map'
    
    await nextTick()
    
    if (map && mapLoaded.value && mapContainer.value) {
      window.google.maps.event.trigger(map, 'resize')
      
      // Center the map on hospital location
      const hospitalLat = props.hospital.latitude || props.hospital.geometry?.location?.lat?.() || props.hospital.geometry?.location?.lat
      const hospitalLng = props.hospital.geometry?.location?.lng?.() || props.hospital.geometry?.location?.lng
      
      if (hospitalLat && hospitalLng) {
        map.setCenter({ lat: hospitalLat, lng: hospitalLng })
      }
      
      await getDirections()
    }
    
  } catch (error) {
    console.error('Error switching to map view:', error)
    currentMobileView.value = 'details'
    await router.push({ query: { ...route.query, view: 'details' } })
  } finally {
    loadingDirections.value = false
  }
}

const switchToDetailsView = async () => {
  currentMobileView.value = 'details'
  await router.push({ query: { ...route.query, view: 'details' } })
}

const getStarClass = (starIndex: number) => {
  return starIndex <= Math.floor(props.hospital.rating) ? 'text-yellow-400' : 'text-gray-300'
}

const formatBedType = (type: string) => {
  return type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

const callEmergency = () => {
  if (props.hospital.phone) {
    window.location.href = `tel:${props.hospital.phone}`
  } else {
    window.location.href = 'tel:911'
  }
}

const centerMap = () => {
  const activeMap = window.innerWidth >= 768 ? map : map
  if (!activeMap) return
  
  const hospitalLat = props.hospital.latitude || props.hospital.geometry?.location?.lat?.() || props.hospital.geometry?.location?.lat
  const hospitalLng = props.hospital.geometry?.location?.lng?.() || props.hospital.geometry?.location?.lng

  if (hospitalLat && hospitalLng && props.userLocation.lat && props.userLocation.lng) {
    const bounds = new window.google.maps.LatLngBounds()
    bounds.extend({ lat: hospitalLat, lng: hospitalLng })
    bounds.extend({ lat: props.userLocation.lat, lng: props.userLocation.lng })
    activeMap.fitBounds(bounds)
  }
}

const initializeMap = async () => {
  try {
    const google = await $loadGoogleMaps()
    if (!google || !mapContainer.value) {
      return
    }

    const hospitalLat = props.hospital.latitude || props.hospital.geometry?.location?.lat?.() || props.hospital.geometry?.location?.lat
    const hospitalLng = props.hospital.geometry?.location?.lng?.() || props.hospital.geometry?.location?.lng

    if (!hospitalLat || !hospitalLng) {
      return
    }

    map = new window.google.maps.Map(mapContainer.value, {
      center: { lat: hospitalLat, lng: hospitalLng },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: 'poi.medical',
          elementType: 'geometry',
          stylers: [{ color: '#ffeaa7' }]
        },
        {
          featureType: 'poi.medical',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#dc2626' }]
        }
      ]
    })

    addMarkersToMap(map, google)
    setupDirectionsService(google)
    mapLoaded.value = true
  } catch (error) {
    console.error('Error initializing map:', error)
  }
}

const addMarkersToMap = (mapInstance: any, google: any) => {
  if (!mapInstance || !google) return
  
  const hospitalLat = props.hospital.latitude || props.hospital.geometry?.location?.lat?.() || props.hospital.geometry?.location?.lat
  const hospitalLng = props.hospital.geometry?.location?.lng?.() || props.hospital.geometry?.location?.lng

  if (hospitalLat && hospitalLng) {
    new window.google.maps.Marker({
      position: { lat: hospitalLat, lng: hospitalLng },
      map: mapInstance,
      title: props.hospital.hospitalName || props.hospital.name,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#dc2626"/>
            <circle cx="20" cy="20" r="16" fill="#ffffff" fill-opacity="0.2"/>
            <path d="M20 10v20M10 20h20M10 20h20" stroke="white" stroke-width="3" stroke-linecap="round"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40)
      }
    })
  }

  if (props.userLocation.lat && props.userLocation.lng) {
    new window.google.maps.Marker({
      position: { lat: props.userLocation.lat, lng: props.userLocation.lng },
      map: mapInstance,
      title: 'Your Location',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="15" fill="#2563eb"/>
            <circle cx="15" cy="15" r="10" fill="#ffffff" fill-opacity="0.3"/>
            <circle cx="15" cy="15" r="5" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(30, 30)
      }
    })

    const bounds = new window.google.maps.LatLngBounds()
    bounds.extend({ lat: hospitalLat, lng: hospitalLng })
    bounds.extend({ lat: props.userLocation.lat, lng: props.userLocation.lng })
    mapInstance.fitBounds(bounds)
  }
}

const setupDirectionsService = (google: any) => {
  if (!google) return
  
  directionsService = new window.google.maps.DirectionsService()
  directionsRenderer = new window.google.maps.DirectionsRenderer({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#dc2626',
      strokeWeight: 6,
      strokeOpacity: 0.8
    }
  })
}

const getDirections = async () => {
  if (!props.userLocation.lat || !props.userLocation.lng) {
    showToast({
      title: 'Location Required',
      message: 'Please enable location access to get directions.',
      toastType: 'error',
      duration: 3000
    })
    return
  }

  if (!directionsService) {
    console.error('Directions service not initialized')
    return
  }

  loadingDirections.value = true
  directions.value = []
  routeInfo.value = null

  try {
    const hospitalLat = props.hospital.latitude || props.hospital.geometry?.location?.lat?.() || props.hospital.geometry?.location?.lat
    const hospitalLng = props.hospital.geometry?.location?.lng?.() || props.hospital.geometry?.location?.lng

    if (!hospitalLat || !hospitalLng) {
      throw new Error('Hospital location not available')
    }

    const request = {
      origin: { lat: props.userLocation.lat, lng: props.userLocation.lng },
      destination: { lat: hospitalLat, lng: hospitalLng },
      travelMode: window.google.maps.TravelMode.DRIVING
    }

    directionsService.route(request, (result: any, status: any) => {
      try {
        if (status === 'OK' && result) {
          const activeMap = window.innerWidth >= 768 ? map : map
          const activeRenderer = directionsRenderer

          if (activeRenderer && activeMap) {
            activeRenderer.setDirections(result)
            activeRenderer.setMap(activeMap)
          }

          const route = result.routes[0]
          const leg = route.legs[0]
          
          directions.value = leg.steps.map((step: any) => ({
            instructions: step.instructions,
            distance: step.distance.text,
            duration: step.duration.text
          }))

          routeInfo.value = {
            distance: leg.distance.text,
            duration: leg.duration.text
          }

          showToast({
            title: 'Route Found',
            message: `${leg.duration.text} via ${leg.distance.text}`,
            toastType: 'success',
            duration: 3000
          })
        } else {
          throw new Error(`Directions request failed: ${status}`)
        }
      } catch (error) {
        console.error('Error processing directions result:', error)
        showToast({
          title: 'Directions Error',
          message: 'Unable to get directions. Please try again.',
          toastType: 'error',
          duration: 3000
        })
      } finally {
        loadingDirections.value = false
      }
    })
  } catch (error) {
    console.error('Error getting directions:', error)
    showToast({
      title: 'Directions Error',
      message: 'Unable to get directions. Please try again.',
      toastType: 'error',
      duration: 3000
    })
    loadingDirections.value = false
  }
}

const openInGoogleMaps = () => {
  const hospitalLat = props.hospital.latitude || props.hospital.geometry?.location?.lat?.() || props.hospital.geometry?.location?.lat
  const hospitalLng = props.hospital.geometry?.location?.lng?.() || props.hospital.geometry?.location?.lng

  if (hospitalLat && hospitalLng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hospitalLat},${hospitalLng}`
    window.open(url, '_blank')
  }
}

onUnmounted(() => {
  if (map) {
    map = null
  }
  if (directionsRenderer) {
    directionsRenderer.setMap(null)
    directionsRenderer = null
  }
})

onMounted(() => {
  initializeMap()
})

watch(urlView, (newView) => {
  currentMobileView.value = newView as 'details' | 'map'
  
  if (newView === 'map' && map && mapLoaded.value) {
    nextTick(() => {
      window.google.maps.event.trigger(map, 'resize')
      map.setCenter({ 
        lat: props.hospital.latitude || props.hospital.geometry?.location?.lat?.() || props.hospital.geometry?.location?.lat,
        lng: props.hospital.geometry?.location?.lng?.() || props.hospital.geometry?.location?.lng
      })
    })
  }
}, { immediate: true })

watch(currentMobileView, (newView) => {
  if (newView === 'map' && map && mapLoaded.value) {
    nextTick(() => {
      window.google.maps.event.trigger(map, 'resize')
    })
  }
})
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

@media (max-width: 767px) {
  .transition-transform {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
