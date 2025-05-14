<template>
  <div class="w-full">
    <div 
      class="relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ease-in-out"
      :class="[
        isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700',
        image ? 'h-auto' : 'h-48'
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <div v-if="!image" class="flex flex-col items-center justify-center h-full space-y-2">
        <UploadCloudIcon class="w-12 h-12 text-gray-400 dark:text-gray-600" />
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Drag and drop your image here or 
          <label class="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline">
            browse
            <input 
              type="file" 
              class="hidden" 
              accept="image/*" 
              @change="onFileChange"
            >
          </label>
        </p>
        <p class="text-xs text-gray-400 dark:text-gray-500">
          Supported formats: JPG, PNG, GIF
        </p>
      </div>
      
      <div v-else class="relative">
        <img 
          :src="image" 
          alt="Preview" 
          class="w-full h-auto rounded-md object-cover max-h-96"
        >
        <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
          <button 
            @click="removeImage" 
            class="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div v-if="isUploading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70">
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">Uploading...</p>
        </div>
      </div>
    </div>
    
    <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { UploadCloudIcon, TrashIcon } from 'lucide-vue-next'
import { useBlog } from '~/composables/useBlog'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { uploadImage } = useBlog()

const image = ref<string>(props.modelValue)
const isDragging = ref(false)
const isUploading = ref(false)
const error = ref<string | null>(null)

watch(() => props.modelValue, (newValue) => {
  image.value = newValue
})

watch(image, (newValue) => {
  emit('update:modelValue', newValue)
})

const onFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    await handleFile(input.files[0])
  }
}

const onDrop = async (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    await handleFile(event.dataTransfer.files[0])
  }
}

const handleFile = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    error.value = 'Please upload an image file'
    return
  }
  
  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    error.value = 'Image size should be less than 5MB'
    return
  }
  
  error.value = null
  isUploading.value = true
  
  try {
    const imageUrl = await uploadImage(file)
    image.value = imageUrl
  } catch (err) {
    error.value = 'Failed to upload image'
    console.error(err)
  } finally {
    isUploading.value = false
  }
}

const removeImage = () => {
  image.value = ''
}
</script>