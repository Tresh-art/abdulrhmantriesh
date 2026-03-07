// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devServer: {
  //   port: 3000, // Change this to your desired port
  //   host: '192.168.1.27'
  // },
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',
  tailwindcss: {
    config: {
      theme: {
        colors: {
          'primary': '#3F3128',
          'secondary': '#51594C',
          'highlight': '#CABB6B',
          'softblack': '#1B1B1B',
          'accent': '#F9F4F3',
          'hardwhite': '#FFFFFF',
          'graytext': '#BABABA'

        },
        fontFamily: {
          alex: ['Alexandria', 'sans-serif'],
        },
        keyframes: {
          'fade-in-up-custom': {
            '0%': {
              opacity: '0',
              transform: 'translateY(20px)', // Starts 20px down
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)', // Ends at original position
            },
          },
        },
        animation: {
          'fade-in-up-custom': 'fade-in-up 0.5s ease-out forwards', // 0.5s duration, ease-out timing, stays at the end state
        },
      }
    }
  },
  app: {
    head: {
      title: 'عبدالرحمن طريش',
      meta: [
        { name: 'description', content: 'عبدالرحمن طريش هو شيف ليبي محترف وصانع محتوى يقدّم نصائح ووصفات يومية. يسعى لجعل الطبخ عادة ممتعة وسهلة.' },
        { name: 'keywords', content: 'عبدالرحمن طريش, شيف ليبي, صانع محتوى, وصفات طبخ, نصائح طبخ, طبخ ليبي' },
        { name: 'author', content: 'عبدالرحمن طريش' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
      ]
    }
  },
  icon: {
    customCollections: [
      {
        prefix: 'tresh-icon',
        dir: './app/assets/tresh-icon', 
      },
    ]
  },
  googleFonts: {
    families: {
      Alexandria: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap', // Recommended for performance
    download: true,
  },
})