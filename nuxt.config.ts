export default {
  ssr: false,
  target: "static",
  runtimeConfig: {
    public: {
      mapboxAccessToken: process.env.VITE_MAPBOX_ACCESS_TOKEN,
    },
  },
  app: {
    head: {
      title: "CodeRed | Home",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
        { rel: "stylesheet", href: "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" },
        { rel: "stylesheet", href: "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css", type: "text/css" }
      ],
      script: [],
    },
  },

  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      Gorditas: true, // Loads Gorditas font
    },
    display: 'swap', // Adds display swap for faster loading
  },

  plugins: ["~/plugins/aos.client.ts"],
  css: ["/assets/css/main.css", '@/assets/css/custom.css'],

  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },

  // buildModules: [
  //   '@nuxtjs/moment'
  // ]
  // alias: {
  // 	'@': '/'
  // },
  axios: {
    // Axios options here
    timeout: 10000, // Example: set timeout to 10 seconds
  },
  server: {
    port: 3000,
    host: '0.0.0.0' // This makes the server accessible from all network interfaces
  },
  build: {
    transpile: ['@ckeditor/ckeditor5-vue']
  },

  compatibilityDate: "2024-11-23",
};