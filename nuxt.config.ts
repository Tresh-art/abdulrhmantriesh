// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  tailwindcss: {
    config: {
      theme: {
        colors:{
          'primary': '#3F3128',
          'secondary':'#51594C',
          'highlight':'#CABB6B',
          'softblack':'#1B1B1B',
          'accent':'#F9F4F3',
          'hardwhite':'#FFFFFF',

        },
        fontFamily: {
          alex: ['Alexandria', 'sans-serif'],
        }
      }
    }
  },
  googleFonts: {
    families: {
      Alexandria: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap', // Recommended for performance
    download: true,
  },
})