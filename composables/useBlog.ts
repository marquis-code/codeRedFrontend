import { ref, reactive } from 'vue'

export interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  coverImage: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export function useBlog() {
  const blogs = ref<Blog[]>([])
  const currentBlog = ref<Blog | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Mock data for demonstration
  const mockBlogs: Blog[] = [
    {
      id: '1',
      title: 'Getting Started with Nuxt 3',
      content: '<p>This is a comprehensive guide to Nuxt 3...</p>',
      excerpt: 'Learn how to build modern web applications with Nuxt 3',
      coverImage: '/placeholder.svg?height=400&width=600',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Mastering TypeScript',
      content: '<p>TypeScript is a powerful language that extends JavaScript...</p>',
      excerpt: 'Enhance your JavaScript with static typing and advanced features',
      coverImage: '/placeholder.svg?height=400&width=600',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  // Fetch all blogs
  const fetchBlogs = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/blogs')
      // blogs.value = await response.json()
      
      // Using mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
      blogs.value = [...mockBlogs]
    } catch (err) {
      error.value = 'Failed to fetch blogs'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  // Fetch a single blog by ID
  const fetchBlog = async (id: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/blogs/${id}`)
      // currentBlog.value = await response.json()
      
      // Using mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API delay
      const blog = mockBlogs.find(blog => blog.id === id)
      currentBlog.value = blog ? { ...blog } : null
    } catch (err) {
      error.value = 'Failed to fetch blog'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  // Create a new blog
  const createBlog = async (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>) => {
    isLoading.value = true
    error.value = null
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/blogs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(blog)
      // })
      // const newBlog = await response.json()
      
      // Using mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
      const newBlog: Blog = {
        ...blog,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      blogs.value = [newBlog, ...blogs.value]
      return newBlog
    } catch (err) {
      error.value = 'Failed to create blog'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update an existing blog
  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    isLoading.value = true
    error.value = null
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/blogs/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(blogData)
      // })
      // const updatedBlog = await response.json()
      
      // Using mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
      const index = blogs.value.findIndex(blog => blog.id === id)
      
      if (index !== -1) {
        const updatedBlog = {
          ...blogs.value[index],
          ...blogData,
          updatedAt: new Date().toISOString()
        }
        
        blogs.value[index] = updatedBlog
        return updatedBlog
      }
      
      throw new Error('Blog not found')
    } catch (err) {
      error.value = 'Failed to update blog'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete a blog
  const deleteBlog = async (id: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      
      // Using mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API delay
      blogs.value = blogs.value.filter(blog => blog.id !== id)
    } catch (err) {
      error.value = 'Failed to delete blog'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Upload image (mock implementation)
  const uploadImage = async (file: File): Promise<string> => {
    isLoading.value = true
    error.value = null
    
    try {
      // In a real app, this would upload to a storage service
      // const formData = new FormData()
      // formData.append('file', file)
      // const response = await fetch('/api/upload', { method: 'POST', body: formData })
      // const data = await response.json()
      // return data.url
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800)) // Simulate upload delay
      return URL.createObjectURL(file) // Local object URL for preview
    } catch (err) {
      error.value = 'Failed to upload image'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    blogs,
    currentBlog,
    isLoading,
    error,
    fetchBlogs,
    fetchBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    uploadImage
  }
}