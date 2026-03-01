<template>
  <div class="min-h-screen flex flex-col font-alex" dir="rtl">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3" :class="[
      navbarSolid ? 'bg-hardwhite shadow-md ' : 'bg-transparent',
      !isHomePage ? 'bg-hardwhite shadow-sm ' : ''
    ]">
      <nav class="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
        <!-- Desktop/Mobile: Right Side (Logo) -->
        <NuxtLink to="/" class="font-bold text-sm lg:text-xl transition-colors duration-300"
          :class="navbarSolid || !isHomePage ? 'text-primary' : 'text-hardwhite'">

          <span :class="navbarSolid ? 'text-secondary' : 'text-hardwhite'">عبدالرحمن</span><span
            :class="navbarSolid ? 'text-primary' : 'text-hardwhite'"> طريش</span>
        </NuxtLink>

        <!-- Desktop: Center (Horizontal Links) -->
        <div class="hidden md:flex items-center gap-10">
          <NuxtLink v-for="link in menuLinks" :key="link.to" :to="link.to"
            class="font-bold transition-all hover:text-highlight relative group"
            :class="navbarSolid || !isHomePage ? 'text-gray-700' : 'text-hardwhite'">
            {{ link.label }}
            <span class="absolute -bottom-1 right-0 w-0 h-0.5 bg-highlight transition-all group-hover:w-full"></span>
          </NuxtLink>
        </div>

        <!-- Desktop: Left Side (CTA Button) -->
        <div class="hidden md:block">
          <NuxtLink to="/#contact" class="px-8 py-2.5 rounded-full font-bold transition-all hover:scale-105 shadow-md"
            :class="navbarSolid || !isHomePage ? 'bg-primary text-hardwhite' : 'bg-hardwhite text-primary'">
            تواصل معي
          </NuxtLink>
        </div>

        <!-- Mobile: Burger Menu (Left Side in RTL if specified, or standard) -->
        <button @click="openMenu" class="md:hidden p-2 transition-colors duration-300 focus:outline-none"
          :class="navbarSolid || !isHomePage ? 'text-primary' : 'text-hardwhite'">
          <Icon name="heroicons:bars-3-bottom-left" class="w-9 h-9" />
        </button>
      </nav>
    </header>

    <!-- Premium Mobile Menu Overlay -->
    <div class="fixed inset-0 z-[60] pointer-events-none">
      <!-- Dark Backdrop -->
      <Transition name="fade">
        <div v-if="isMenuOpen" @click="closeMenu"
          class="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" />
      </Transition>

      <!-- Menu Panel (Slides from Left to Right) -->
      <Transition name="slide-right">
        <aside v-if="isMenuOpen"
          class="absolute top-0 left-0 bottom-0 w-full max-w-[100%] bg-hardwhite pointer-events-auto flex flex-col p-8 shadow-2xl">
          <!-- Close Button -->
          <div class="flex justify-end items-center mb-12">
            <button @click="closeMenu" class="p-2 text-primary hover:rotate-90 transition-transform duration-300">
              <Icon name="heroicons:x-mark" class="w-10 h-10" />
            </button>
          </div>

          <!-- Staggered Mobile Links -->
          <nav class="flex flex-col gap-8 flex-1 justify-center items-center">
            <div v-for="(link, index) in menuLinks" :key="link.to" class="overflow-hidden">
              <Transition name="link-pop" appear>
                <NuxtLink v-show="isMenuOpen" :to="link.to" @click="closeMenu"
                  class="block text-4xl font-black text-gray-900 hover:text-primary transition-colors text-center"
                  :style="{ transitionDelay: `${200 + index * 100}ms` }">
                  {{ link.label }}
                </NuxtLink>
              </Transition>
            </div>

          </nav>

          <!-- Socials at bottom of menu -->
          <div class="flex justify-center gap-8 mt-auto pb-10">
            <Icon v-for="s in ['instagram', 'youtube', 'tiktok']" :key="s" :name="`simple-icons:${s}`"
              class="w-7 h-7 text-primary/30" />
          </div>
        </aside>
      </Transition>
    </div>

    <!-- Main Content -->
    <main class="flex-1">
      <!-- Spacer for non-home pages so content doesn't hide under fixed navbar -->
      <div :class="{ 'h-20': !isHomePage }"></div>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="relative bg-primary overflow-hidden">
      <!-- Opacity background image -->
      <div class="absolute inset-0 bg-cover bg-center opacity-[0.04] pointer-events-none"
        style="background-image: url('/images/footer-bg.jpg')" />

      <div class="relative z-10 py-16 px-6 md:px-12 flex flex-col items-center text-center">
        <nav class="flex flex-wrap justify-center gap-8 mb-8">
          <NuxtLink v-for="link in menuLinks" :key="link.to" :to="link.to"
            class="text-hardwhite/90 font-bold hover:text-highlight transition-colors">
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="w-12 h-1 bg-highlight/40 rounded-full mb-8" />

        <div class="flex items-center gap-6 mb-8">
          <a v-for="social in socialLinks" :key="social.name" :href="social.url"
            class="text-hardwhite hover:scale-125 transition-transform">
            <Icon :name="social.icon" class="w-6 h-6 text-highlight" />
          </a>
        </div>

        <p class="text-hardwhite/40 text-sm">
          © {{ currentYear }} عبدالرحمن. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const route = useRoute()
const isScrolled = ref(false)
const isMenuOpen = ref(false)

// Route check: Only transparent on Home Page
const isHomePage = computed(() => route.path === '/')
const navbarSolid = computed(() => !isHomePage.value || isScrolled.value)

const menuLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/recipes', label: 'الوصفات' },
  { to: '/#contact', label: 'تواصل معي' }
]

const socialLinks = [
  { name: 'Instagram', url: '#', icon: 'simple-icons:instagram' },
  { name: 'YouTube', url: '#', icon: 'simple-icons:youtube' },
  { name: 'TikTok', url: '#', icon: 'simple-icons:tiktok' }
]

const currentYear = new Date().getFullYear()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const openMenu = () => {
  isMenuOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
</script>

<style scoped>
/* Main Fade for Backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Premium Side Panel: Sliding Left to Right */
.slide-right-enter-active {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-right-leave-active {
  transition: transform 0.5s cubic-bezier(0.7, 0, 0.84, 0);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
}

/* Link Stagger Animation */
.link-pop-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.link-pop-enter-from {
  opacity: 0;
  transform: translateY(50px) scale(0.9);
}

.link-pop-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>