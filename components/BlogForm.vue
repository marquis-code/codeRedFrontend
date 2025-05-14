<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-4">
      <!-- Cover Image -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cover Image
        </label>
        <ImageUploader v-model="form.coverImage" />
      </div>
      
      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title
        </label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="Enter blog title"
          required
        />
      </div>
      
      <!-- Excerpt -->
      <div>
        <label for="excerpt" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          v-model="form.excerpt"
          rows="2"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="Brief summary of your blog"
          required
        ></textarea>
      </div>
      
      <!-- Content -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content
        </label>
        <div class="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
          <ckeditor 
            v-model="form.content" 
            :editor="editor" 
            :config="editorConfig"
            class="min-h-[300px]"
          />
        </div>
      </div>
      
      <!-- Published Status -->
      <div class="flex items-center">
        <input
          id="published"
          v-model="form.published"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="published" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Publish immediately
        </label>
      </div>
    </div>
    
    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$router.back()"
        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isSubmitting" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saving...
        </span>
        <span v-else>{{ blog ? 'Update' : 'Create' }} Blog</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBlog, type Blog } from '@/composables/useBlog'

// Import CKEditor components
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-vue'

const props = defineProps<{
  blog?: Blog
}>()

const router = useRouter()
const { createBlog, updateBlog } = useBlog()

const form = reactive({
  title: '',
  content: '',
  excerpt: '',
  coverImage: '',
  published: false
})

const isSubmitting = ref(false)

// CKEditor setup
const editor = ClassicEditor
const editorConfig = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'link',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'alignment',
    '|',
    'blockQuote',
    'insertTable',
    'undo',
    'redo',
    'imageUpload'
  ],
  image: {
    toolbar: [
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      '|',
      'toggleImageCaption',
      'imageTextAlternative'
    ]
  },
  // Set up the editor theme to match your app's theme
  ui: {
    viewportOffset: { top: 10, right: 10, bottom: 10, left: 10 }
  }
}

// Initialize form with blog data if editing
onMounted(() => {
  if (props.blog) {
    form.title = props.blog.title
    form.content = props.blog.content
    form.excerpt = props.blog.excerpt
    form.coverImage = props.blog.coverImage
    form.published = props.blog.published
  }
})

// Watch for changes in props.blog
watch(() => props.blog, (newBlog) => {
  if (newBlog) {
    form.title = newBlog.title
    form.content = newBlog.content
    form.excerpt = newBlog.excerpt
    form.coverImage = newBlog.coverImage
    form.published = newBlog.published
  }
}, { deep: true })

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    if (props.blog) {
      // Update existing blog
      await updateBlog(props.blog.id, form)
    } else {
      // Create new blog
      await createBlog(form)
    }
    
    // Navigate to blogs list
    router.push('/blogs')
  } catch (error) {
    console.error('Error saving blog:', error)
    // In a real app, you would show an error notification
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style>
/* CKEditor custom styles */
.ck-editor__editable {
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto !important;
}

/* Dark mode support */
.dark .ck.ck-editor__main>.ck-editor__editable {
  background-color: #1e293b !important;
  color: #e2e8f0 !important;
}

.dark .ck.ck-editor__main>.ck-editor__editable:focus {
  border-color: #4b5563 !important;
}

.dark .ck.ck-toolbar {
  background-color: #1e293b !important;
  border-color: #4b5563 !important;
}

.dark .ck.ck-button,
.dark .ck.ck-button.ck-on {
  color: #e2e8f0 !important;
  background-color: #1e293b !important;
}

.dark .ck.ck-button:hover,
.dark .ck.ck-button.ck-on:hover {
  background-color: #374151 !important;
  color: #f9fafb !important;
}

.dark .ck.ck-toolbar .ck.ck-toolbar__separator {
  background-color: #4b5563 !important;
}

.dark .ck.ck-dropdown__panel {
  background-color: #1e293b !important;
  border-color: #4b5563 !important;
}

.dark .ck.ck-list__item {
  color: #e2e8f0 !important;
}

.dark .ck.ck-list__item:hover:not(.ck-disabled) {
  background-color: #374151 !important;
}
</style>