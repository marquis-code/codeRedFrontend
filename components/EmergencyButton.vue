<template>
  <div>
    <!-- Floating Emergency Button -->
    <button
      @click="isOpen = true"
      class="fixed bottom-6 right-6 z-50 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      title="Emergency Alert"
    >
      <svg class="w-8 h-8 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-ping"></span>
    </button>

    <!-- Emergency Modal -->
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h2 class="text-2xl font-bold">Emergency Response System</h2>
                  <p class="text-red-100 text-sm">AI-Powered Emergency Alert</p>
                </div>
              </div>
              <button @click="resetEmergency" class="text-white/80 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-6 space-y-6">
            <!-- Location Info -->
            <div v-if="userLocation" class="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="text-sm font-semibold text-blue-900">Your Location</p>
                <p class="text-xs text-blue-700">
                  Lat: {{ userLocation.lat.toFixed(4) }}, Lng: {{ userLocation.lng.toFixed(4) }} (Ikeja, Lagos)
                </p>
              </div>
            </div>

            <!-- Recording Control -->
            <div class="flex flex-col items-center gap-4">
              <button
                @click="toggleRecording"
                :disabled="processingStage !== 'idle' && !isRecording"
                :class="[
                  'relative w-40 h-40 rounded-full transition-all duration-300 transform',
                  isRecording ? 'bg-red-600 scale-110 shadow-2xl' : 'bg-red-500 hover:bg-red-600 hover:scale-105 shadow-xl',
                  processingStage !== 'idle' && !isRecording ? 'opacity-50 cursor-not-allowed' : ''
                ]"
              >
                <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <svg v-if="!isRecording" class="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <svg v-else class="w-16 h-16 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" />
                  </svg>
                  <span class="text-xl font-bold">
                    {{ isRecording ? 'STOP' : 'START' }}
                  </span>
                  <span class="text-sm" :class="{ 'animate-pulse': isRecording }">
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
                </div>
                <div v-if="isRecording" class="absolute inset-0 border-4 border-white/30 rounded-full animate-ping"></div>
              </button>

              <div v-if="isRecording" class="w-full max-w-md">
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-red-500 transition-all duration-100"
                    :style="{ width: `${audioLevel}%` }"
                  />
                </div>
              </div>
            </div>

            <!-- Live Transcript -->
            <div v-if="transcript" class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h3 class="font-bold text-gray-800">Live Transcript</h3>
              </div>
              <p class="text-gray-700 leading-relaxed">{{ transcript }}</p>
            </div>

            <!-- Processing Stages -->
            <div v-if="processingStage !== 'idle'" class="space-y-4">
              <!-- AI Analysis -->
              <div v-if="processingStage === 'analyzing'" class="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                <div class="flex items-center gap-3">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600"></div>
                  <div>
                    <p class="font-bold text-yellow-900">Analyzing Emergency...</p>
                    <p class="text-sm text-yellow-700">AI is processing your message</p>
                  </div>
                </div>
              </div>

              <!-- Emergency Analysis Results -->
              <div v-if="emergencyData" class="bg-white border-2 border-red-300 rounded-lg p-4 space-y-3">
                <h3 class="font-bold text-gray-900 text-lg">Emergency Analysis</h3>
                
                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-red-50 rounded p-3">
                    <p class="text-xs text-gray-600 mb-1">Emergency Type</p>
                    <p class="font-bold text-red-700 capitalize">
                      {{ emergencyData.emergency_type.replace(/_/g, ' ') }}
                    </p>
                  </div>
                  
                  <div class="bg-orange-50 rounded p-3">
                    <p class="text-xs text-gray-600 mb-1">Severity</p>
                    <p :class="[
                      'font-bold uppercase',
                      emergencyData.severity === 'critical' ? 'text-red-600' :
                      emergencyData.severity === 'high' ? 'text-orange-600' :
                      'text-yellow-600'
                    ]">
                      {{ emergencyData.severity }}
                    </p>
                  </div>
                </div>

                <div>
                  <p class="text-xs text-gray-600 mb-2">Detected Symptoms</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(symptom, idx) in emergencyData.symptoms"
                      :key="idx"
                      class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                    >
                      {{ symptom }}
                    </span>
                  </div>
                </div>

                <div v-if="emergencyData.requires_ambulance" class="bg-red-100 border border-red-300 rounded p-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-red-800 font-semibold text-sm">Ambulance Required - Priority Dispatch</p>
                </div>
              </div>

              <!-- Contacted Services -->
              <div v-if="contactedServices.length > 0" class="bg-white border-2 border-blue-300 rounded-lg p-4 space-y-3">
                <h3 class="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contacting Emergency Services
                </h3>
                
                <div class="space-y-2">
                  <div
                    v-for="service in contactedServices"
                    :key="service.id"
                    class="bg-gray-50 rounded-lg p-3 border border-gray-200"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex items-start gap-3 flex-1">
                        <div :class="[
                          'p-2 rounded-lg',
                          service.type === 'hospital' ? 'bg-blue-100 text-blue-600' :
                          service.type === 'ambulance' ? 'bg-red-100 text-red-600' :
                          'bg-green-100 text-green-600'
                        ]">
                          <svg v-if="service.type === 'hospital'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <svg v-else-if="service.type === 'ambulance'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div class="flex-1">
                          <p class="font-semibold text-gray-900">{{ service.name }}</p>
                          <p class="text-xs text-gray-600">{{ service.phone }}</p>
                          <div class="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span>📍 {{ service.distance }} km away</span>
                            <span>⏱️ ETA: {{ service.eta }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg v-if="service.status === 'calling'" class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <svg v-else-if="service.status === 'connected'" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span :class="[
                          'text-xs font-medium',
                          service.status === 'connected' ? 'text-green-600' :
                          service.status === 'calling' ? 'text-blue-600' :
                          'text-gray-600'
                        ]">
                          {{ service.status === 'calling' ? 'Calling...' : service.status === 'connected' ? 'Connected' : 'Pending' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Call Responses -->
              <div v-if="callResponses.length > 0" class="bg-green-50 border-2 border-green-400 rounded-lg p-4 space-y-3">
                <h3 class="font-bold text-green-900 text-lg flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Response Updates
                </h3>
                
                <div class="space-y-3">
                  <div
                    v-for="(response, idx) in callResponses"
                    :key="idx"
                    class="bg-white rounded-lg p-4 border-l-4 border-green-500"
                  >
                    <div class="flex items-start gap-3">
                      <div class="p-2 bg-green-100 rounded-lg">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <p class="font-semibold text-gray-900">{{ response.responder }}</p>
                        <p class="text-sm text-gray-700 mt-1">{{ response.message }}</p>
                        <div class="flex items-center gap-3 mt-2">
                          <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            {{ response.status }}
                          </span>
                          <span class="text-xs text-gray-500">
                            {{ new Date(response.timestamp).toLocaleTimeString() }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Completion Status -->
              <div v-if="processingStage === 'completed'" class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 text-center">
                <svg class="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-2xl font-bold mb-2">Help Is On The Way!</h3>
                <p class="text-green-100">
                  Emergency services have been notified and are responding to your location.
                </p>
                <p class="text-sm text-green-100 mt-2">
                  Stay calm and keep your phone nearby. Help will arrive shortly.
                </p>
              </div>
            </div>

            <!-- Instructions -->
            <div v-if="processingStage === 'idle' && !transcript" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 class="font-bold text-blue-900 mb-2">How to Use</h3>
              <ol class="list-decimal list-inside text-blue-800 space-y-1 text-sm">
                <li>Press the red button and speak clearly</li>
                <li>Describe your emergency and symptoms</li>
                <li>The AI will analyze your situation</li>
                <li>Emergency services will be contacted automatically</li>
                <li>Help will be dispatched to your location</li>
              </ol>
            </div>
          </div>
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
  type: string
  phone: string
  distance: number
  eta: string
  specialties: string[]
  status?: string
  timestamp?: string
}

interface EmergencyData {
  emergency_type: string
  severity: string
  symptoms: string[]
  requires_ambulance: boolean
  location: string
  confidence: number
}

interface CallResponse {
  responder: string
  message: string
  eta: string
  status: string
  timestamp: string
  contactId: string
}

const isOpen = ref(false)
const isRecording = ref(false)
const transcript = ref('')
const emergencyData = ref<EmergencyData | null>(null)
const processingStage = ref<'idle' | 'analyzing' | 'contacting' | 'completed'>('idle')
const contactedServices = ref<EmergencyContact[]>([])
const callResponses = ref<CallResponse[]>([])
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const audioLevel = ref(0)

let mediaRecorder: MediaRecorder | null = null
let audioContext: AudioContext | null = null
let analyser: AnalyserNode | null = null
let stream: MediaStream | null = null
let animationFrameId: number | null = null
let transcriptionInterval: ReturnType<typeof setInterval> | null = null

const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Lagos State University Teaching Hospital',
    type: 'hospital',
    phone: '+234-1-765-4321',
    distance: 2.3,
    eta: '8 mins',
    specialties: ['Emergency', 'Trauma', 'Cardiac']
  },
  {
    id: '2',
    name: 'LASAMBUS - Emergency Ambulance',
    type: 'ambulance',
    phone: '+234-767-767-767',
    distance: 1.8,
    eta: '5 mins',
    specialties: ['Paramedic', 'Emergency Transport']
  },
  {
    id: '3',
    name: 'Reddington Hospital Emergency',
    type: 'hospital',
    phone: '+234-1-271-5340',
    distance: 3.1,
    eta: '12 mins',
    specialties: ['Cardiac', 'ICU', 'Surgery']
  },
  {
    id: '4',
    name: 'Dr. Adeyemi - First Responder',
    type: 'first_responder',
    phone: '+234-803-123-4567',
    distance: 0.9,
    eta: '3 mins',
    specialties: ['Emergency Medicine']
  },
  {
    id: '5',
    name: 'Lagos State Emergency Agency',
    type: 'emergency_service',
    phone: '+234-112',
    distance: 2.7,
    eta: '10 mins',
    specialties: ['Coordination', 'Dispatch']
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
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
      await processAudio(audioBlob)
    }

    mediaRecorder.start(100)
    isRecording.value = true

    // Simulate real-time transcription
    simulateTranscription()
  } catch (error) {
    console.error('Error starting recording:', error)
    alert('Unable to access microphone. Please check permissions.')
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

    if (transcriptionInterval) {
      clearInterval(transcriptionInterval)
    }
  }
}

const simulateTranscription = () => {
  const phrases = [
    "Help! I'm having severe chest pain",
    "and difficulty breathing.",
    "I think it might be a heart attack.",
    "I'm at home in Ikeja, Lagos.",
    "Please send help immediately!"
  ]

  let index = 0
  transcriptionInterval = setInterval(() => {
    if (index < phrases.length && isRecording.value) {
      transcript.value += (transcript.value ? ' ' : '') + phrases[index]
      index++
    } else {
      if (transcriptionInterval) {
        clearInterval(transcriptionInterval)
      }
    }
  }, 1500)
}

const processAudio = async (audioBlob: Blob) => {
  processingStage.value = 'analyzing'

  // Simulate AI analysis
  await new Promise(resolve => setTimeout(resolve, 2000))

  const mockAnalysis: EmergencyData = {
    emergency_type: 'cardiac_emergency',
    severity: 'critical',
    symptoms: ['chest pain', 'difficulty breathing', 'suspected heart attack'],
    requires_ambulance: true,
    location: 'Ikeja, Lagos',
    confidence: 0.94
  }

  emergencyData.value = mockAnalysis
  processingStage.value = 'contacting'

  // Start contacting services
  await contactEmergencyServices(mockAnalysis)
}

const contactEmergencyServices = async (analysis: EmergencyData) => {
  const sortedContacts = [...emergencyContacts].sort((a, b) => a.distance - b.distance)

  for (let i = 0; i < sortedContacts.length; i++) {
    const contact = sortedContacts[i]

    await new Promise(resolve => setTimeout(resolve, 1000))

    contactedServices.value.push({
      ...contact,
      status: 'calling',
      timestamp: new Date().toISOString()
    })

    await new Promise(resolve => setTimeout(resolve, 1500))

    const index = contactedServices.value.findIndex(c => c.id === contact.id)
    if (index !== -1) {
      contactedServices.value[index].status = 'connected'
    }

    // Simulate call responses after delay
    if (i < 3) {
      setTimeout(() => {
        simulateCallResponse(contact)
      }, (i + 1) * 8000)
    }
  }

  processingStage.value = 'completed'
}

const simulateCallResponse = (contact: EmergencyContact) => {
  const responses = [
    {
      responder: contact.name,
      message: "We've received your emergency alert. Our team is dispatching now.",
      eta: contact.eta,
      status: 'en_route'
    },
    {
      responder: contact.name,
      message: "Emergency unit is on the way. Stay calm and keep the line open.",
      eta: contact.eta,
      status: 'dispatched'
    },
    {
      responder: contact.name,
      message: "Medical team has been notified. ETA approximately " + contact.eta,
      eta: contact.eta,
      status: 'acknowledged'
    }
  ]

  const response = responses[Math.floor(Math.random() * responses.length)]

  callResponses.value.push({
    ...response,
    timestamp: new Date().toISOString(),
    contactId: contact.id
  })
}

const resetEmergency = () => {
  isOpen.value = false
  isRecording.value = false
  transcript.value = ''
  emergencyData.value = null
  processingStage.value = 'idle'
  contactedServices.value = []
  callResponses.value = []
  audioLevel.value = 0

  if (transcriptionInterval) {
    clearInterval(transcriptionInterval)
  }

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
/* Ensure animations work properly */
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

/* Additional styles to ensure button stays on top */
button[title="Emergency Alert"] {
  position: fixed !important;
  bottom: 1.5rem !important;
  right: 1.5rem !important;
  z-index: 9999 !important;
}

/* Mobile responsive positioning */
@media (max-width: 640px) {
  button[title="Emergency Alert"] {
    bottom: 1rem !important;
    right: 1rem !important;
    width: 56px !important;
    height: 56px !important;
  }
  
  button[title="Emergency Alert"] svg {
    width: 28px !important;
    height: 28px !important;
  }
}
</style>