<!-- components/AlertModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex backdrop-blur-md items-center justify-center p-4 bg-black bg-opacity-50"
        @click.self="handleBackdropClick"
      >
        <div
          class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 transform transition-all"
          @click.stop
        >
          <!-- Icon -->
          <div class="flex justify-center">
            <div
              :class="[
                'w-12 h-12 rounded-full flex items-center justify-center',
                type === 'confirm' ? 'bg-yellow-100' : 'bg-red-100'
              ]"
            >
              <!-- Confirm Icon -->
              <svg
                v-if="type === 'confirm'"
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <!-- Error Icon -->
              <svg
                v-else
                class="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-semibold text-center text-[#1A1A1B]">
            {{ title }}
          </h3>

          <!-- Message -->
          <p class="text-base text-center text-[#454745] leading-relaxed">
            {{ message }}
          </p>

          <!-- Actions -->
          <div
            :class="[
              'flex gap-3 pt-2',
              type === 'confirm' ? 'flex-row' : 'flex-col'
            ]"
          >
            <button
              v-if="type === 'confirm'"
              @click="handleCancel"
              class="flex-1 px-4 py-3 text-[#454745] font-medium rounded-full bg-[#3BAB2213] hover:bg-[#3BAB2225] transition-colors"
            >
              {{ cancelText }}
            </button>
            <button
              @click="handleConfirm"
              :class="[
                'flex-1 px-4 py-3 font-medium rounded-full transition-colors',
                type === 'confirm'
                  ? 'text-white bg-[#B42318]'
                  : 'text-white bg-[#3BAB22]'
              ]"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  isOpen: boolean
  title: string
  message: string
  type?: 'alert' | 'confirm'
  confirmText?: string
  cancelText?: string
  allowBackdropClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'alert',
  confirmText: 'OK',
  cancelText: 'Cancel',
  allowBackdropClose: true
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  close: []
}>()

const handleConfirm = () => {
  emit('confirm')
  emit('close')
}

const handleCancel = () => {
  emit('cancel')
  emit('close')
}

const handleBackdropClick = () => {
  if (props.allowBackdropClose) {
    if (props.type === 'confirm') {
      handleCancel()
    } else {
      emit('close')
    }
  }
}

// Handle ESC key
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && props.allowBackdropClose) {
          handleBackdropClick()
        }
      }
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }
  }
)
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white {
  transform: scale(0.95) translateY(20px);
}

.modal-leave-to .bg-white {
  transform: scale(0.95) translateY(20px);
}
</style>