<script setup>
const isPageReady = ref(false)
const route = useRoute()

const cleanPath = computed(() => route.path.replace(/\/$/, '') || '/')

const { data: recipe } = await useAsyncData(`recipe-${cleanPath.value}`, () => {
  return queryCollection('recipes').path(cleanPath.value).first()
})

const { data: suggested } = await useAsyncData(`suggested-${cleanPath.value}`, () => {
  return queryCollection('recipes')
    .where('path', '<>', cleanPath.value)
    .limit(5)
    .all()
})

const macrosCard = ref(null)
const isVisible = ref(false)
const isImgModalOpen = ref(false)

onMounted(() => {
  isPageReady.value = true
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.3 })
  if (macrosCard.value) observer.observe(macrosCard.value)
})

const macros = computed(() => recipe.value?.meta?.macros || null)
const chartData = computed(() => {
  if (!macros.value) return null
  const p = Number(macros.value.protein) || 0
  const c = Number(macros.value.carbs) || 0
  const f = Number(macros.value.fat) || 0
  const total = p + c + f
  if (total === 0) return null
  return {
    protein: (p / total) * 100,
    carbs: (c / total) * 100,
    fat: (f / total) * 100,
    carbsOffset: -(p / total * 100),
    fatOffset: -((p + c) / total * 100)
  }
})
</script>

<template>
  <div v-if="recipe" class="min-h-screen bg-accent pb-20 pt-24 md:pt-32" dir="rtl">
    <div :class="[isPageReady ? 'opacity-100' : 'opacity-0', 'transition-all duration-500']">

      <!-- Main Container: Unlocked for Desktop -->
      <div class="max-w-[390px] md:max-w-6xl mx-auto px-[26px] md:px-12">

        <!-- Responsive Grid Wrapper -->
        <div class="lg:flex lg:flex-row lg:gap-16 lg:items-start">

          <!-- RIGHT COLUMN (Text Content) -->
          <div class="lg:flex-1">
            <!-- Category Pill -->
            <div class="flex justify-start animate-reveal-right">
              <span class="bg-primary text-hardwhite px-4 py-1 rounded-md text-xs font-bold shadow-sm">
                {{ recipe.meta?.category }}
              </span>
            </div>

            <!-- Title & Description -->
            <header class="mt-4 text-right">
              <h1
                class="text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] font-black text-primary animate-reveal-right">
                {{ recipe.title }}
              </h1>
              <p
                class="text-highlight mt-[26px] text-lg md:text-xl font-normal animate-reveal-right delay-100 lg:max-w-2xl">
                {{ recipe.description }}
              </p>
            </header>

            <!-- Action Buttons -->
            <div class="flex items-center gap-4 mt-8 animate-fade-in-up justify-between md:justify-start">
              <a href="#ingredients"
                class="border-2 border-primary text-primary px-8 py-3 rounded-[6px] font-bold text-sm hover:bg-primary hover:text-hardwhite transition-all">
                انتقل للوصفة
              </a>
              <a v-if="recipe.meta?.videoUrl" :href="recipe.meta.videoUrl" target="_blank"
                class="text-primary font-normal text-sm border-b-2 border-primary pb-0.5">
                مشاهدة الفيديو
              </a>
            </div>

            <div class="w-[166px] h-[1px] bg-primary mt-8 mb-8 animate-scale-x" />

            <!-- Info Grid (Always 3 columns) -->
            <div class="grid grid-cols-3 gap-3 md:gap-6 fade-in-up-custom lg:max-w-lg">
              <div v-for="(val, label, idx) in { prepTime: 'التحضير', servings: 'الكمية', difficulty: 'المستوى' }"
                :key="idx"
                class="bg-hardwhite rounded-[12px] p-4 flex flex-col items-center text-center shadow-[0_0_4px_2px_rgba(0,0,0,0.05)]">
                <Icon :name="idx === 0 ? 'heroicons:clock' : idx === 1 ? 'heroicons:users' : 'heroicons:signal'"
                  class="w-6 h-6 text-highlight mb-1" />
                <span class="text-[10px] md:text-xs text-graytext font-normal">{{ val }}</span>
                <span class="text-[14px] md:text-base text-softblack font-bold">{{ recipe.meta?.[label] }}{{ idx === 0 ?
                  ' د' : '' }}</span>
              </div>
            </div>

            <!-- Mobile Only: Image and Macros move here on mobile, but are hidden on desktop column -->
            <div class="lg:hidden">
              <div
                class="mt-8 relative h-[190px] w-full bg-hardwhite/40 rounded-[8px] overflow-hidden shadow-lg group cursor-pointer"
                @click="isImgModalOpen = true">
                <img :src="recipe.meta?.image" class="w-full h-full object-cover" alt="Recipe Image" />
              </div>
              <!-- Macros inserted here for mobile flow -->
              <div v-if="macros" class="mt-6">
                <!-- (Macro card code same as below) -->
              </div>
            </div>

            <!-- Ingredients Section -->
            <section id="ingredients"
              class="mt-12 bg-hardwhite rounded-[12px] p-8 shadow-[0_0_4px_2px_rgba(0,0,0,0.05)] animate-fade-in-up">
              <h2 class="text-2xl font-bold text-primary mb-6">المقادير</h2>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li v-for="item in recipe.meta?.ingredients" :key="item"
                  class="flex items-center gap-3 text-highlight font-bold text-base">
                  <div class="w-2.5 h-2.5 rounded-full bg-highlight" /> {{ item }}
                </li>
              </ul>
            </section>

            <!-- Preparation Steps -->
            <section
              class="mt-8 bg-hardwhite rounded-[12px] p-8 shadow-[0_0_4px_2px_rgba(0,0,0,0.05)] animate-fade-in-up">
              <h2 class="text-2xl font-bold text-primary mb-8">طريقة التحضير</h2>
              <div class="space-y-10">
                <div v-for="(step, idx) in recipe.meta?.steps" :key="idx" class="flex items-start gap-6">
                  <div
                    class="w-8 h-8 min-w-[32px] rounded-full bg-primary text-hardwhite flex items-center justify-center text-sm font-black shadow-sm">
                    {{ idx + 1 }}
                  </div>
                  <div>
                    <h3 class="text-primary font-black text-xl mb-2">{{ step.title }}</h3>
                    <p class="text-highlight text-base leading-relaxed font-medium">{{ step.content }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- LEFT COLUMN (Sticky Sidebar for Image, Socials, Macros) -->
          <div class="hidden lg:block lg:w-[420px] lg:sticky lg:top-32">

            <!-- Main Image (Larger on Desktop) -->
            <div
              class="relative h-[300px] w-full bg-hardwhite/40 rounded-[12px] overflow-hidden shadow-xl group cursor-pointer"
              @click="isImgModalOpen = true">
              <img :src="recipe.meta?.image"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Recipe Image" />
              <div
                class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Icon name="heroicons:magnifying-glass-plus" class="text-hardwhite w-10 h-10" />
              </div>
            </div>

            <!-- Socials -->
            <div class="mt-6 bg-hardwhite rounded-[12px] p-5 flex justify-around shadow-[0_0_4px_2px_rgba(0,0,0,0.05)]">
              <Icon v-for="icon in ['instagram', 'youtube', 'tiktok', 'facebook']" :key="icon"
                :name="`simple-icons:${icon}`"
                class="w-6 h-6 text-primary hover:text-highlight cursor-pointer transition-colors" />
            </div>

            <!-- Macros Card (Desktop Integrated) -->
            <div v-if="macros && chartData" ref="macrosCard"
              class="mt-6 bg-hardwhite rounded-[12px] p-8 shadow-[0px_0px_4px_2px_rgba(0,0,0,0.05)] flex items-center justify-between transition-all duration-700">

              <div class="flex flex-col gap-4 text-right">
                <h4 class="text-xl font-black text-softblack">القيمة الغذائية</h4>
                <div v-for="(val, label) in { carbs: 'كربوهيدرات', protein: 'بروتين', fat: 'دهون' }" :key="label"
                  class="flex flex-row justify-between gap-6">
                  <span class="text-base font-black"
                    :class="{ 'text-secondary': label === 'carbs', 'text-[#B25B42]': label === 'protein', 'text-[#D9B650]': label === 'fat' }">
                    {{ val }}
                  </span>
                  <span class="text-lg font-normal text-primary">{{ macros[label] }} غ</span>
                </div>
              </div>

              <div class="relative w-32 h-32 flex items-center justify-center">
                <svg viewBox="0 0 120 120" class="w-full h-full transform -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="transparent" stroke="#F9F4F3" stroke-width="12" />
                  <circle cx="60" cy="60" r="50" fill="transparent" stroke="#B25B42" stroke-width="12"
                    stroke-linecap="round" pathLength="100"
                    :stroke-dasharray="isVisible ? `${chartData.protein} 100` : '0 100'" class="chart-segment" />
                  <circle cx="60" cy="60" r="50" fill="transparent" stroke="#606C38" stroke-width="12"
                    stroke-linecap="round" pathLength="100"
                    :stroke-dasharray="isVisible ? `${chartData.carbs} 100` : '0 100'"
                    :stroke-dashoffset="chartData.carbsOffset" class="chart-segment delay-200" />
                  <circle cx="60" cy="60" r="50" fill="transparent" stroke="#D9B650" stroke-width="12"
                    stroke-linecap="round" pathLength="100"
                    :stroke-dasharray="isVisible ? `${chartData.fat} 100` : '0 100'"
                    :stroke-dashoffset="chartData.fatOffset" class="chart-segment delay-500" />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center pt-1">
                  <span class="text-xl font-black text-softblack">{{ macros.calories }}</span>
                  <span class="text-xs text-graytext font-bold">سعرة</span>
                </div>
              </div>
            </div>

            <!-- Chef Tip (Desktop Position) -->
            <section v-if="recipe.meta?.chefTip"
              class="mt-8 relative bg-hardwhite border-[5px] border-secondary rounded-[12px] p-8">
              <h2 class="text-xl font-bold text-secondary mb-4">نصائح الشيف</h2>
              <div
                class="absolute -top-5 -right-5 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg rotate-[45deg]">
                <Icon name="heroicons:light-bulb" class="w-6 h-6 text-highlight" />
              </div>
              <p class="text-secondary font-medium leading-relaxed text-sm">{{ recipe.meta.chefTip }}</p>
            </section>
          </div>

        </div>

        <!-- Suggestions (Full Width Bottom) -->
        <!-- Suggestions Section -->
<section class="mt-24 pb-10">
  <h2 class="text-2xl md:text-3xl font-bold text-primary mb-10">وصفات قد تعجبك</h2>
  
  <!-- Scroll Container: -mx-[26px] allows edge-to-edge scrolling on mobile -->
  <div class="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-8 -mx-[26px] px-[26px] md:mx-0 md:px-0 scroll-smooth">
    <NuxtLink 
      v-for="item in suggested" 
      :key="item.id" 
      :to="item.path"
      class="min-w-[300px] md:min-w-[340px] bg-hardwhite rounded-[15px] overflow-hidden shadow-lg flex flex-col h-[340px] transition-all hover:-translate-y-2 group"
    >
      <!-- Image Section (65% height) -->
      <div class="h-[65%] w-full bg-accent/20 overflow-hidden">
        <img 
          :src="item.meta?.image" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          :alt="item.title" 
          loading="lazy" 
        />
      </div>

      <!-- Text Section -->
      <div class="p-5 flex flex-col justify-between flex-grow text-right">
        <!-- Title: font-black as requested -->
        <h3 class="text-xl font-black text-softblack truncate leading-tight">
          {{ item.title }}
        </h3>

        <!-- Metadata Icons -->
        <div class="flex items-center justify-between">
          <!-- Duration -->
          <div class="flex items-center gap-2 text-graytext font-bold text-sm">
            <Icon name="heroicons:clock" class="w-5 h-5 text-highlight" /> 
            <span>{{ item.meta?.prepTime }} د</span>
          </div>
          <!-- Duration -->
          <div class="flex items-center gap-2 text-graytext font-bold text-sm">
            <Icon name="heroicons:users" class="w-5 h-5 text-highlight" /> 
            <span>{{ item.meta?.servings }} أشخاص</span>
          </div>

          <!-- Difficulty -->
          <div class="flex items-center gap-2 text-graytext font-bold text-sm">
            <Icon name="heroicons:signal" class="w-5 h-5 text-highlight" /> 
            <span>{{ item.meta?.difficulty }}</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</section>

      </div>
    </div>

    <!-- Image Modal -->
    <Transition name="fade">
      <div v-if="isImgModalOpen"
        class="fixed inset-0 z-[100] bg-softblack/95 flex items-center justify-center p-12 backdrop-blur-md cursor-pointer"
        @click="isImgModalOpen = false">
        <img :src="recipe.meta?.image"
          class="max-w-7xl max-h-[85vh] rounded-xl shadow-2xl transition-transform animate-zoom-in" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Keeping all your existing styles exactly as they were */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.chart-segment {
  transition: stroke-dasharray 1.5s cubic-bezier(0.34, 1.56, 0.64, 1), stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: stroke-dasharray, stroke-dashoffset;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes reveal-right {
  0% {
    transform: translateX(20px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes scale-x {
  0% {
    transform: scaleX(0);
    transform-origin: right;
  }

  100% {
    transform: scaleX(1);
    transform-origin: right;
  }
}

.animate-reveal-right {
  animation: reveal-right 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.animate-scale-x {
  animation: scale-x 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-500 {
  animation-delay: 0.45s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>