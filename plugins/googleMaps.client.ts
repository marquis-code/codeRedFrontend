// plugins/googleMaps.client.ts
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
export default defineNuxtPlugin((nuxtApp) => {
    return {
      provide: {
        loadGoogleMaps: () => {
          if (typeof window.google !== 'undefined') {
            return Promise.resolve(window.google)
          }
  
          return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
            script.async = true
            script.defer = true
            script.onload = () => resolve(window.google)
            script.onerror = (error) => reject(error)
            document.head.appendChild(script)
          })
        },
      },
    }
  })
  