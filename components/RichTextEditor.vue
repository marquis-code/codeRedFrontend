<template>
    <div class="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <!-- Toolbar -->
      <div class="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button
          v-for="(button, index) in toolbarButtons"
          :key="index"
          @click="executeCommand(button.command, button.value)"
          class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          :class="{ 'bg-gray-200 dark:bg-gray-700': isActive(button.command, button.value) }"
          :title="button.title"
        >
          <component :is="button.icon" class="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </button>
        
        <div class="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
        
        <select 
          @change="executeCommand('formatBlock', $event.target.value)"
          class="p-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          <option value="">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="blockquote">Quote</option>
          <option value="pre">Code</option>
        </select>
      </div>
      
      <!-- Editor -->
      <div
        ref="editorRef"
        class="p-4 min-h-[200px] max-h-[500px] overflow-y-auto focus:outline-none prose dark:prose-invert prose-sm sm:prose-base max-w-none"
        contenteditable="true"
        @input="updateContent"
        @paste="handlePaste"
      ></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { 
    BoldIcon, ItalicIcon, UnderlineIcon, ListIcon, ListOrderedIcon, 
    AlignLeftIcon, AlignCenterIcon, AlignRightIcon, LinkIcon, ImageIcon,
    QuoteIcon, CodeIcon
  } from 'lucide-vue-next'
  import { useBlog } from '~/composables/useBlog'
  
  const props = defineProps<{
    modelValue: string
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'image-upload-requested'): void
  }>()
  
  const { uploadImage } = useBlog()
  const editorRef = ref<HTMLDivElement | null>(null)
  
  const toolbarButtons = [
    { icon: BoldIcon, command: 'bold', title: 'Bold' },
    { icon: ItalicIcon, command: 'italic', title: 'Italic' },
    { icon: UnderlineIcon, command: 'underline', title: 'Underline' },
    { icon: ListIcon, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrderedIcon, command: 'insertOrderedList', title: 'Numbered List' },
    { icon: AlignLeftIcon, command: 'justifyLeft', title: 'Align Left' },
    { icon: AlignCenterIcon, command: 'justifyCenter', title: 'Align Center' },
    { icon: AlignRightIcon, command: 'justifyRight', title: 'Align Right' },
    { icon: LinkIcon, command: 'createLink', title: 'Insert Link' },
    { icon: ImageIcon, command: 'insertImage', title: 'Insert Image' },
    { icon: QuoteIcon, command: 'formatBlock', value: 'blockquote', title: 'Quote' },
    { icon: CodeIcon, command: 'formatBlock', value: 'pre', title: 'Code Block' }
  ]
  
  onMounted(() => {
    if (editorRef.value) {
      editorRef.value.innerHTML = props.modelValue
    }
  })
  
  watch(() => props.modelValue, (newValue) => {
    if (editorRef.value && editorRef.value.innerHTML !== newValue) {
      editorRef.value.innerHTML = newValue
    }
  })
  
  const updateContent = () => {
    if (editorRef.value) {
      emit('update:modelValue', editorRef.value.innerHTML)
    }
  }
  
  const executeCommand = (command: string, value?: string) => {
    if (command === 'createLink') {
      const url = prompt('Enter the URL:', 'https://')
      if (url) {
        document.execCommand(command, false, url)
      }
    } else if (command === 'insertImage') {
      emit('image-upload-requested')
    } else if (command === 'formatBlock') {
      document.execCommand(command, false, `<${value}>`)
    } else {
      document.execCommand(command, false, value)
    }
    
    updateContent()
    editorRef.value?.focus()
  }
  
  const isActive = (command: string, value?: string): boolean => {
    if (command === 'formatBlock') {
      return document.queryCommandValue(command) === value
    }
    return document.queryCommandState(command)
  }
  
  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault()
    
    // Handle text paste
    if (event.clipboardData) {
      const text = event.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
    }
    
    // For a real app, you might want to handle image paste here
  }
  </script>
  
  <style>
  /* Add some basic styling for the editor content */
  [contenteditable] {
    outline: none;
  }
  
  [contenteditable] img {
    max-width: 100%;
    height: auto;
  }
  
  [contenteditable] blockquote {
    border-left: 3px solid #e2e8f0;
    padding-left: 1rem;
    color: #64748b;
  }
  
  [contenteditable] pre {
    background-color: #f1f5f9;
    padding: 1rem;
    border-radius: 0.25rem;
    overflow-x: auto;
  }
  
  .dark [contenteditable] pre {
    background-color: #1e293b;
  }
  
  .dark [contenteditable] blockquote {
    border-left-color: #475569;
    color: #94a3b8;
  }
  </style>