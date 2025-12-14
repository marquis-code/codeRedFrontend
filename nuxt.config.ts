export default {
  ssr: false,
  target: "static",
  runtimeConfig: {
    public: {
      googleMapsKey: process.env.GOOGLE_MAPS_KEY,
      googleGeocodeKey: process.env.GOOGLE_GEOCODE_KEY,
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
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyCa0Rx0TJ9BGkQ9NC23BZc51zCql_Xrhs0&libraries=places,geometry`,
          async: true,
          defer: true,
        },
      ],
    },
  },

  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      Gorditas: true, // Loads Gorditas font
    },
    display: 'swap', // Adds display swap for faster loading
  },

  plugins: ["~/plugins/aos.client.ts","~/plugins/googleMaps.client.ts"],
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