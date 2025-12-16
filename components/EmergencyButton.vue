<template>
  <div>
    <!-- CodeRed Power Button - Fixed Position (Right Center) -->
    <div class="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      <!-- Text Label -->
      <div class="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-center animate-pulse">
        <p class="text-xs font-black uppercase tracking-wider">Emergency</p>
        <p class="text-[10px] font-bold">AI Support</p>
      </div>

      <!-- Animated arrow pointing to button -->
      <div class="animate-bounce-slow">
        <svg class="w-10 h-10 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <!-- Main Emergency Button -->
      <div class="relative">
        <button
          @click="isOpen = true"
          class="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-110 active:scale-95 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
          title="Emergency Support - Click for Help"
        >
          <!-- Pulsing rings -->
          <span class="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping"></span>
          <span class="absolute inset-0 rounded-full bg-red-600 opacity-50 animate-pulse"></span>
          
          <!-- AI Brain Icon with Plus -->
          <div class="relative z-10">
            <svg class="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <!-- Brain/AI Icon -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            
            <!-- Medical Cross Overlay -->
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white opacity-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3h-2v8H3v2h8v8h2v-8h8v-2h-8z"/>
              </svg>
            </div>
          </div>
        </button>

        <!-- Animated beep indicators -->
        <span class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-400 animate-ping"></span>
        <span class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600"></span>
      </div>
    </div>

    <!-- Emergency Modal -->
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white p-6 rounded-t-3xl relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent"></div>
            <div class="relative flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-3xl font-black tracking-tight">CodeRed Emergency</h2>
                  <p class="text-red-100 text-sm font-medium">AI-Powered Emergency Response System</p>
                </div>
              </div>
              <button 
                @click="resetEmergency" 
                class="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-6 space-y-6">
            <!-- Location Info -->
            <div v-if="userLocation" class="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-blue-900">Your Current Location</p>
                <p class="text-xs text-blue-700">
                  Lat: {{ userLocation.lat.toFixed(4) }}, Lng: {{ userLocation.lng.toFixed(4) }} • Ikeja, Lagos, Nigeria
                </p>
              </div>
            </div>

            <!-- Recording Control -->
            <div class="flex flex-col items-center gap-6 py-4">
              <button
                @click="toggleRecording"
                :disabled="processingStage !== 'idle' && !isRecording"
                :class="[
                  'relative w-48 h-48 rounded-full transition-all duration-300 transform',
                  isRecording 
                    ? 'bg-gradient-to-br from-red-600 via-red-700 to-red-800 scale-110 shadow-2xl shadow-red-500/50' 
                    : 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:scale-105 shadow-xl hover:shadow-red-500/40',
                  processingStage !== 'idle' && !isRecording ? 'opacity-50 cursor-not-allowed' : ''
                ]"
              >
                <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <svg v-if="!isRecording" class="w-20 h-20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <svg v-else class="w-20 h-20 mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" />
                  </svg>
                  <span class="text-2xl font-black uppercase tracking-wider">
                    {{ isRecording ? 'STOP' : 'START' }}
                  </span>
                  <span class="text-sm font-medium mt-1" :class="{ 'animate-pulse': isRecording }">
                    {{ isRecording ? 'Recording...' : 'Press to speak' }}
                  </span>
                </div>
                
                <div v-if="isRecording" class="absolute inset-0">
                  <div 
                    class="absolute inset-0 border-4 border-white rounded-full transition-all duration-100"
                    :style="{ 
                      transform: `scale(${1 + audioLevel / 200})`,
                      opacity: audioLevel / 100 
                    }"
                  />
                  <div class="absolute inset-0 border-4 border-white/30 rounded-full animate-ping"></div>
                </div>
              </button>

              <div v-if="isRecording" class="w-full max-w-md">
                <div class="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div 
                    class="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-100 rounded-full"
                    :style="{ width: `${audioLevel}%` }"
                  />
                </div>
                <p class="text-center text-xs text-gray-500 mt-2">Audio Level: {{ Math.round(audioLevel) }}%</p>
              </div>
            </div>

            <!-- Live Transcript -->
            <div v-if="transcript" class="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-5 shadow-md">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                <h3 class="font-black text-gray-900 text-lg">Live Transcript</h3>
              </div>
              <p class="text-gray-800 leading-relaxed font-medium">{{ transcript }}</p>
            </div>

            <!-- Loader -->
            <div v-if="showLoader" class="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-8 shadow-lg">
              <div class="flex flex-col items-center gap-4">
                <div class="relative">
                  <div class="animate-spin rounded-full h-20 w-20 border-8 border-yellow-200"></div>
                  <div class="animate-spin rounded-full h-20 w-20 border-8 border-t-yellow-600 absolute inset-0"></div>
                </div>
                <div class="text-center">
                  <p class="font-black text-yellow-900 text-xl mb-2">Analyzing Emergency...</p>
                  <p class="text-sm text-yellow-700 font-medium">Support is on the way. Please remain calm.</p>
                  <div class="flex items-center justify-center gap-2 mt-3">
                    <div class="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
                    <div class="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
                    <div class="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Response Updates -->
            <div v-if="callResponses.length > 0" class="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-5 shadow-lg">
              <h3 class="font-black text-green-900 text-xl flex items-center gap-2 mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Response Updates
              </h3>
              
              <div class="space-y-4">
                <div
                  v-for="service in callResponses"
                  :key="service.id"
                  class="bg-white rounded-xl p-5 border-l-4 shadow-md hover:shadow-lg transition-shadow"
                  :class="service.type === 'hospital' ? 'border-blue-500' : 'border-red-500'"
                >
                  <div class="flex items-start gap-4">
                    <div :class="[
                      'p-3 rounded-xl',
                      service.type === 'hospital' ? 'bg-blue-100' : 'bg-red-100'
                    ]">
                      <svg v-if="service.type === 'hospital'" class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <svg v-else class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="font-bold text-gray-900 text-lg">{{ service.name }}</p>
                      <p class="text-sm text-gray-600 mt-1">
                        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {{ service.phone }}
                      </p>
                      <div class="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {{ service.distance }} km away
                        </span>
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          ETA: {{ service.eta }}
                        </span>
                      </div>
                      <div class="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p class="text-sm text-green-800 font-semibold">{{ service.message }}</p>
                      </div>

                      <!-- Payment Section for Ambulance -->
                      <div v-if="service.type === 'ambulance'" class="mt-4 p-4 bg-orange-50 border-2 border-orange-300 rounded-lg">
                        <div class="flex items-center justify-between mb-3">
                          <div>
                            <p class="text-sm font-bold text-orange-900">Service Fee</p>
                            <p class="text-2xl font-black text-orange-700">₦{{ service.serviceFee?.toLocaleString() }}</p>
                          </div>
                          <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        
                        <button
                          @click="handlePayment(service.id)"
                          :disabled="service.paymentStatus === 'paid'"
                          :class="[
                            'w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2',
                            service.paymentStatus === 'paid'
                              ? 'bg-green-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                          ]"
                        >
                          <svg v-if="service.paymentStatus === 'paid'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          {{ service.paymentStatus === 'paid' ? 'Payment Confirmed' : 'Pay Now' }}
                        </button>
                        
                        <p class="text-xs text-orange-700 text-center mt-2 font-medium">
                          {{ service.paymentStatus === 'paid' 
                            ? 'Payment received. Ambulance is en route.' 
                            : 'Secure payment required for ambulance dispatch' 
                          }}
                        </p>
                      </div>

                      <div class="flex items-center gap-3 mt-3">
                        <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
                          {{ service.status }}
                        </span>
                        <span v-if="service.type === 'ambulance' && service.paymentStatus === 'paid'" class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">
                          Paid
                        </span>
                        <span class="text-xs text-gray-500">
                          {{ new Date(service.timestamp).toLocaleTimeString() }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Completion Status -->
            <div v-if="processingStage === 'completed'" class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-8 text-center shadow-xl">
              <svg class="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-3xl font-black mb-3">Help Is On The Way!</h3>
              <p class="text-green-100 text-lg font-medium">
                Emergency services have been notified and are responding to your location.
              </p>
              <p class="text-sm text-green-100 mt-3 font-medium">
                Stay calm and keep your phone nearby. Help will arrive shortly.
              </p>
            </div>

            <!-- Instructions -->
            <div v-if="processingStage === 'idle' && !transcript" class="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
              <h3 class="font-black text-blue-900 mb-3 text-lg">How to Use</h3>
              <ol class="list-decimal list-inside text-blue-800 space-y-2 text-sm font-medium">
                <li>Press the red button and speak clearly</li>
                <li>Describe your emergency and symptoms</li>
                <li>The AI will analyze your situation</li>
                <li>Emergency services will be contacted automatically</li>
                <li>Complete payment for ambulance service if required</li>
                <li>Help will be dispatched to your location</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Payment Success Modal -->
    <Teleport to="body">
      <div v-if="showPaymentModal" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center transform scale-100 animate-modal-appear">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-2xl font-black text-gray-900 mb-2">Payment Successful!</h3>
          <p class="text-gray-600 mb-6">Your payment has been processed successfully. The ambulance is now on its way to your location.</p>
          <button
            @click="showPaymentModal = false"
            class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Continue
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface EmergencyContact {
  id: string
  name: string
  type: 'hospital' | 'ambulance'
  phone: string
  distance: number
  eta: string
  status?: string
  timestamp?: string
  message?: string
  serviceFee?: number
  paymentStatus?: 'pending' | 'paid'
}

const isOpen = ref(false)
const isRecording = ref(false)
const transcript = ref('')
const processingStage = ref<'idle' | 'processing' | 'completed'>('idle')
const callResponses = ref<EmergencyContact[]>([])
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const audioLevel = ref(0)
const showLoader = ref(false)
const showPaymentModal = ref(false)

let mediaRecorder: MediaRecorder | null = null
let audioContext: AudioContext | null = null
let analyser: AnalyserNode | null = null
let stream: MediaStream | null = null
let animationFrameId: number | null = null

const emergencyComplaints = [
  "Help! I'm experiencing severe chest pain and shortness of breath. I think it might be a heart attack!",
  "Emergency! I've been in a car accident. I have multiple injuries and need immediate help!",
  "I'm having a severe allergic reaction! My throat is swelling and I can't breathe properly!",
  "Help! Someone collapsed here! They're unconscious and not responding!",
  "I'm having intense abdominal pain and I'm bleeding. Please send help fast!",
  "Emergency! I fell down the stairs. I can't move my leg and I'm in severe pain!",
  "I'm having a severe asthma attack and my inhaler isn't working. I need help now!",
  "Help! I'm experiencing stroke symptoms - facial drooping and arm weakness!",
  "Emergency! There's been a fire. I have severe burns and smoke inhalation!",
  "I'm diabetic and experiencing severe hypoglycemia. I'm feeling faint and confused!"
]

const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Lagos State University Teaching Hospital',
    type: 'hospital',
    phone: '+234-1-765-4321',
    distance: 2.3,
    eta: '8 mins'
  },
  {
    id: '2',
    name: 'LASAMBUS - Emergency Ambulance',
    type: 'ambulance',
    phone: '+234-767-767-767',
    distance: 1.8,
    eta: '5 mins',
    serviceFee: 15000,
    paymentStatus: 'pending'
  }
]

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      },
      () => {
        userLocation.value = { lat: 6.5244, lng: 3.3792 }
      }
    )
  } else {
    userLocation.value = { lat: 6.5244, lng: 3.3792 }
  }
})

const toggleRecording = async () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    await startRecording()
  }
}

const visualizeAudio = () => {
  if (!analyser) return

  const dataArray = new Uint8Array(analyser.frequencyBinCount)

  const animate = () => {
    if (!isRecording.value) {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      return
    }

    analyser!.getByteFrequencyData(dataArray)
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length
    audioLevel.value = Math.min(100, (average / 255) * 100)

    animationFrameId = requestAnimationFrame(animate)
  }

  animate()
}

const startRecording = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        sampleRate: 16000,
        echoCancellation: true,
        noiseSuppression: true
      }
    })

    // Setup audio visualization
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaStreamSource(stream)
    source.connect(analyser)
    analyser.fftSize = 256

    visualizeAudio()

    // Setup media recorder
    mediaRecorder = new MediaRecorder(stream)
    const audioChunks: Blob[] = []

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data)
      }
    }

    mediaRecorder.onstop = async () => {
      await processAudio()
    }

    mediaRecorder.start(100)
    isRecording.value = true

    // Simulate transcription with random complaint
    const randomComplaint = emergencyComplaints[Math.floor(Math.random() * emergencyComplaints.length)]
    const words = randomComplaint.split(' ')
    let currentText = ''
    
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300))
      if (isRecording.value) {
        currentText += (currentText ? ' ' : '') + words[i]
        transcript.value = currentText
      }
    }
  } catch (error) {
    console.error('Error starting recording:', error)
    alert('Unable to access microphone. Please check permissions.')
  }
}

const stopRecording = () => {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop()
    isRecording.value = false

    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }

    if (audioContext) {
      audioContext.close()
    }

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
  }
}

const processAudio = async () => {
  // Show loader for 10 seconds
  showLoader.value = true
  processingStage.value = 'processing'

  await new Promise(resolve => setTimeout(resolve, 10000))

  showLoader.value = false
  processingStage.value = 'completed'

  // Show services with responses
  const servicesWithResponses = emergencyContacts.map((contact) => ({
    ...contact,
    status: 'Connected',
    message: contact.type === 'hospital' 
      ? 'Notified, ready to accept you' 
      : 'Ambulance dispatched to your location',
    timestamp: new Date().toISOString()
  }))

  callResponses.value = servicesWithResponses
}

const handlePayment = async (serviceId: string) => {
  const service = callResponses.value.find(s => s.id === serviceId)
  if (!service) return

  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Update payment status
  service.paymentStatus = 'paid'
  showPaymentModal.value = true

  // Auto close modal after 3 seconds
  setTimeout(() => {
    showPaymentModal.value = false
  }, 3000)
}

const resetEmergency = () => {
  isOpen.value = false
  isRecording.value = false
  transcript.value = ''
  processingStage.value = 'idle'
  callResponses.value = []
  audioLevel.value = 0
  showLoader.value = false

  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
  }

  if (stream) {
    stream.getTracks().forEach(track => track.stop())
  }

  if (audioContext) {
    audioContext.close()
  }

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-10px);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

/* Ensure fixed button is always visible and on top */
.fixed {
  position: fixed !important;
}

/* Mobile responsive positioning */
@media (max-width: 640px) {
  .fixed.right-8.top-1\/2 {
    right: 1rem !important;
  }
}
</style>