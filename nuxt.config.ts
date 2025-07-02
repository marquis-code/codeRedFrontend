export default {
  ssr: false,
  target: "static",

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
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg&libraries=places",
          async: true,
          defer: true,
        },
      ],
    },
  },

  //   modules: ["@nuxtjs/tailwindcss", ['@nuxtjs/google-fonts', {
  //     families: {
  //       Roboto: true,
  //       Inter: [400, 700],
  //       'Josefin+Sans': true,
  //       Lato: [100, 300],
  //       Raleway: {
  //         wght: [100, 400],
  //         ital: [100]
  //       },
  //       Inter: '200..700',
  //       'Crimson Pro': {
  //         wght: '200..900',
  //         ital: '200..700',
  //       }
  //     }
  // }],],
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