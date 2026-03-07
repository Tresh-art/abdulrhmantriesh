<script setup>
const isPageReady = ref(false)
const route = useRoute()

// Normalize path to remove trailing slashes for accurate comparison
const cleanPath = computed(() => route.path.replace(/\/$/, '') || '/')

// 1. Fetch the specific recipe
const { data: recipe } = await useAsyncData(`recipe-${cleanPath.value}`, () => {
  return queryCollection('recipes').path(cleanPath.value).first()
})

// 2. Fetch suggested recipes (excluding the current one)
const { data: suggested } = await useAsyncData(`suggested-${cleanPath.value}`, () => {
  return queryCollection('recipes')
    .where('path', '<>', cleanPath.value)
    .limit(3)
    .all()
})

// 3. Observer for Macros
const macrosCard = ref(null)
const macrosCardDesktop = ref(null)
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
  if (macrosCardDesktop.value) observer.observe(macrosCardDesktop.value)
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
// Function to trigger PDF Print
const printRecipe = () => {
  isVisible.value = true // Ensure macros are visible before printing
  //if it is not visible, the chart will not render in the PDF, which looks unprofessional we will fix it with this:
  //scroll down then up real quick to trigger the observer if it's not already visible
  macrosCard.value?.classList.add('opacity-100', 'translate-y-0');
  macrosCardDesktop.value?.classList.add('opacity-100', 'translate-y-0');

  window.print()
}
const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/abdalrhman_tresh?igsh=MTJudmppaDVsczJlMQ%3D%3D&utm_source=qr', icon: 'simple-icons:instagram' },
  { name: 'YouTube', url: 'https://www.youtube.com/@abdalrhmantresh', icon: 'simple-icons:youtube' },
  { name: 'Facebook', url: 'https://www.facebook.com/share/187Q9Mz9LH/?mibextid=wwXIfr', icon: 'simple-icons:facebook' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@abdulrhmantriesh?_r=1&_t=ZS-94S6KbdrtKi ', icon: 'simple-icons:tiktok' }
]
</script>

<template>
  <div v-if="recipe" class="min-h-screen bg-accent pb-20 pt-24 lg:pt-32" dir="rtl">
    <!-- Initial fade-in to prevent flashing -->
    <div :class="[isPageReady ? 'opacity-100' : 'opacity-0', 'duration-500 transition-all']">

      <!-- Mobile Container (max-w-[390px]) / Desktop Container (max-w-7xl) -->
      <div class="max-w-[390px] lg:max-w-7xl mx-auto px-[26px] lg:px-12">

        <!-- Desktop: Two Column Layout -->
        <div class="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24">

          <!-- Left Column: Image & Quick Stats (Desktop) -->
          <div class="lg:order-2 lg:sticky lg:top-32 lg:self-start space-y-6">

            <!-- Category Pill - Desktop Top Right -->
            <div class="hidden lg:flex justify-between animate-reveal-right">
              <span
                class="bg-primary text-hardwhite px-6 py-2 rounded-md text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                {{ recipe.meta?.category }}
              </span>

              <button @click="printRecipe"
                class="flex items-center gap-2 px-6 py-2 border-primary text-primary  rounded-[6px] font-bold text-sm lg:text-sm hover:bg-primary transition-all hover:text-hardwhite hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 no-print">
                <Icon name="heroicons:printer" class="w-5 h-5" /> طباعة
              </button>
            </div>

            <!-- Main Image - Desktop Large Version -->
            <div
              class="hidden lg:block relative h-[500px] xl:h-[600px] w-full bg-hardwhite/40 rounded-[16px] overflow-hidden shadow-2xl fade-in-up-custom group cursor-pointer"
              @click="isImgModalOpen = true">
              <NuxtImg :src="recipe.meta?.image"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Recipe Image" format="webp" quality="90" width="720" loading="eager" preload
                fetchpriority="high" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>
              <div
                class="absolute bottom-6 right-6 left-6 text-hardwhite opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p class="text-sm font-medium">اضغط للتكبير</p>
              </div>
            </div>

            <!-- Desktop: Horizontal Info Cards -->
            <div class="hidden lg:grid grid-cols-3 gap-4 fade-in-up-custom">
              <div v-for="(val, label, idx) in { prepTime: 'التحضير', servings: 'الكمية', difficulty: 'المستوى' }"
                :key="idx"
                class="bg-hardwhite rounded-[16px] p-5 flex flex-col items-center text-center shadow-[0_0_8px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_0_16px_8px_rgba(63,49,40,0.1)] transition-all duration-300 hover:-translate-y-1 group">
                <div
                  class="w-12 h-12 rounded-full bg-highlight/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon
                    :name="idx === 0 ? 'tresh-icon:time-icon' : idx === 1 ? 'tresh-icon:people-icon' : 'tresh-icon:diff-icon'"
                    class="w-6 h-6 text-highlight" />
                </div>
                <span class="text-sm text-graytext font-medium mb-1">{{ val }}</span>
                <span class="text-lg text-softblack font-bold">{{ recipe.meta?.[label] }}{{ idx === 0 ? ' دقيقة' : ''
                }}</span>
              </div>
            </div>

            <!-- Desktop: Macros Card (Large) -->
            <div v-if="macros && chartData" ref="macrosCardDesktop"
              class="hidden lg:block bg-hardwhite rounded-[16px] p-8 shadow-[0px_0px_8px_4px_rgba(0,0,0,0.05)]">
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-4 text-right flex-1">
                  <h4 class="text-2xl font-black text-softblack mb-2">القيمة الغذائية</h4>
                  <div v-for="(val, label) in { carbs: 'كربوهيدرات', protein: 'بروتين', fat: 'دهون' }" :key="label"
                    class="flex flex-row justify-between items-center py-2 border-b border-accent last:border-0">
                    <div class="flex items-center gap-3">
                      <div class="w-4 h-4 rounded-full"
                        :class="{ 'bg-[#606C38]': label === 'carbs', 'bg-[#B25B42]': label === 'protein', 'bg-[#D9B650]': label === 'fat' }">
                      </div>
                      <span class="text-lg font-bold"
                        :class="{ 'text-secondary': label === 'carbs', 'text-[#B25B42]': label === 'protein', 'text-[#D9B650]': label === 'fat' }">
                        {{ val }}
                      </span>
                    </div>
                    <span class="text-xl font-bold text-primary">{{ macros[label] }} غرام</span>
                  </div>
                </div>

                <div class="relative w-40 h-40 flex items-center justify-center mr-8">
                  <svg viewBox="0 0 120 120" class="w-full h-full transform -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="transparent" stroke="#F9F4F3" stroke-width="10" />
                    <circle cx="60" cy="60" r="50" fill="transparent" stroke="#B25B42" stroke-width="10"
                      stroke-linecap="round" pathLength="100"
                      :stroke-dasharray="isVisible ? `${chartData.protein} 100` : '0 100'" class="chart-segment" />
                    <circle cx="60" cy="60" r="50" fill="transparent" stroke="#606C38" stroke-width="10"
                      stroke-linecap="round" pathLength="100"
                      :stroke-dasharray="isVisible ? `${chartData.carbs} 100` : '0 100'"
                      :stroke-dashoffset="chartData.carbsOffset" class="chart-segment delay-200" />
                    <circle cx="60" cy="60" r="50" fill="transparent" stroke="#D9B650" stroke-width="10"
                      stroke-linecap="round" pathLength="100"
                      :stroke-dasharray="isVisible ? `${chartData.fat} 100` : '0 100'"
                      :stroke-dashoffset="chartData.fatOffset" class="chart-segment delay-500" />
                  </svg>
                  <div
                    class="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000"
                    :class="isVisible ? 'opacity-100' : 'opacity-0'">
                    <span class="text-3xl font-black text-softblack">{{ macros.calories }}</span>
                    <span class="text-sm text-graytext">سعرة حرارية</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Content -->
          <div class="lg:order-1 space-y-6 lg:space-y-8">

            <!-- Mobile Category Pill -->
            <div class="lg:hidden flex justify-between animate-reveal-right">
              <span class="bg-primary text-hardwhite px-4 py-1 rounded-md text-xs font-bold shadow-sm">
                {{ recipe.meta?.category }}
              </span>
              <button @click="printRecipe"
                class="flex items-center px-4 py-1 gap-2 border-primary text-primary lg:px-8 lg:py-4 rounded-[6px] font-bold text-sm lg:text-base transition-all    no-print">
                <Icon name="heroicons:printer" class="w-5 h-5" /> طباعة
              </button>
            </div>

            <!-- Title & Description -->
            <header class="mt-4 lg:mt-0 text-right">
              <h1
                class="text-[40px] lg:text-[56px] xl:text-[64px] leading-[1.4] font-black text-primary animate-reveal-right">
                {{ recipe.title }}
              </h1>
              <p
                class="text-highlight mt-[26px] lg:mt-8 text-lg lg:text-xl xl:text-2xl font-normal leading-relaxed animate-reveal-right delay-100">
                {{ recipe.description }}
              </p>
            </header>
            <!-- Premium Print Button -->

            <!-- Action Buttons -->
            <div
              class="flex items-center justify-between lg:justify-start gap-4 lg:gap-6 mt-8 animate-fade-in-up no-print">
              <a href="#ingredients"
                class="border-2 border-primary text-primary px-8 lg:px-10 py-3 lg:py-4 rounded-[6px] font-bold text-sm lg:text-base hover:bg-primary hover:text-hardwhite transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5">
                انتقل للوصفة
              </a>
              <a v-if="recipe.meta?.videoUrl" :href="recipe.meta.videoUrl" target="_blank"
                class="text-primary font-normal text-sm lg:text-base border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors relative group">
                مشاهدة الفيديو
                <span
                  class="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            <!-- Divider Line -->
            <div class="w-[166px] lg:w-[200px] h-[1px] bg-primary mt-8 mb-8 animate-scale-x" />

            <!-- Mobile Info Grid -->
            <div class="lg:hidden grid grid-cols-3 gap-3 fade-in-up-custom">
              <div v-for="(val, label, idx) in { prepTime: 'التحضير', servings: 'الكمية', difficulty: 'المستوى' }"
                :key="idx"
                class="bg-hardwhite rounded-[12px] p-3 flex flex-col items-center text-center shadow-[0_0_4px_2px_rgba(0,0,0,0.05)]">
                <Icon
                  :name="idx === 0 ? 'tresh-icon:time-icon' : idx === 1 ? 'tresh-icon:people-icon' : 'tresh-icon:diff-icon'"
                  class="w-5 h-5 text-highlight mb-1" />
                <span class="text-[10px] text-graytext font-normal">{{ val }}</span>
                <span class="text-[14px] text-softblack font-normal">{{ recipe.meta?.[label] }}{{ idx === 0 ? ' د' : ''
                }}</span>
              </div>
            </div>

            <!-- Mobile Image -->
            <div
              class="lg:hidden relative h-[190px] w-full bg-hardwhite/40 rounded-[8px] overflow-hidden shadow-lg fade-in-up-custom group cursor-pointer"
              @click="isImgModalOpen = true">
              <NuxtImg :src="recipe.meta?.image"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Recipe Image" format="webp" quality="90" width="720" loading="eager" preload
                fetchpriority="high" />
            </div>

            <!-- Socials -->
            <div id="ingredients"
              class="no-print bg-hardwhite rounded-[12px] lg:rounded-[16px] p-4 lg:p-6 flex justify-around lg:justify-center lg:gap-8 shadow-[0_0_4px_2px_rgba(0,0,0,0.05)] animate-fade-in-up">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-primary hover:text-hardwhite transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-sm">
                <Icon :name="social.icon" class="w-6 h-6 lg:w-7 lg:h-7" />
              </a>
            </div>

            <!-- Mobile Macros Card -->
            <div v-if="macros && chartData" ref="macrosCard"
              class="lg:hidden bg-hardwhite rounded-[12px] p-6 shadow-[0px_0px_4px_2px_rgba(0,0,0,0.05)] flex items-center justify-between transition-all duration-700"
              :class="isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-4'">
              <div class="flex flex-col gap-3 text-right">
                <h4 class="text-xl font-black text-softblack mb-1">القيمة الغذائية</h4>
                <div v-for="(val, label) in { carbs: 'كربوهيدرات', protein: 'بروتين', fat: 'دهون' }" :key="label"
                  class="flex flex-row justify-between">
                  <span class="text-[14px] font-black"
                    :class="{ 'text-secondary': label === 'carbs', 'text-[#B25B42]': label === 'protein', 'text-[#D9B650]': label === 'fat' }">
                    {{ val }}
                  </span>
                  <span class="text-base font-normal text-primary leading-none">{{ macros[label] }} غ</span>
                </div>
              </div>
              <div class="relative w-28 h-28 flex items-center justify-center mt-2">
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
                <div
                  class="absolute inset-0 flex flex-col items-center justify-center pt-1 transition-opacity duration-1000"
                  :class="isVisible ? 'opacity-100' : 'opacity-0'">
                  <span class="text-base font-bold text-softblack leading-none">{{ macros.calories }}</span>
                  <span class="text-sm text-graytext">سعرة</span>
                </div>
              </div>
            </div>

            <!-- Ingredients -->
            <section
              class="bg-hardwhite rounded-[12px] lg:rounded-[16px] p-6 lg:p-8 shadow-[0_0_4px_2px_rgba(0,0,0,0.05)] animate-fade-in-up">
              <h2 class="text-xl lg:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                المقادير
              </h2>
              <ul class="space-y-4">
                <li v-for="(item) in recipe.meta?.ingredients" :key="item"
                  class="flex items-center gap-4 text-highlight font-bold text-sm lg:text-base group cursor-default">
                  <div
                    class="w-3 h-3 rounded-full bg-highlight group-hover:scale-150 transition-transform duration-300" />
                  <span class="group-hover:translate-x-2 transition-transform duration-300">{{ item }}</span>
                </li>
              </ul>
            </section>

            <!-- Steps -->
            <section
              class="bg-hardwhite rounded-[12px] lg:rounded-[16px] p-6 lg:p-8 shadow-[0_0_4px_2px_rgba(0,0,0,0.05)] animate-fade-in-up">
              <h2 class="text-xl lg:text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                طريقة التحضير
              </h2>
              <div class="space-y-8 lg:space-y-10">
                <div v-for="(step, idx) in recipe.meta?.steps" :key="idx"
                  class="flex items-start gap-4 lg:gap-6 group relative pb-8 lg:pb-10">
                  <div class="relative z-10">
                    <div
                      class="w-[28px] h-[28px] lg:w-[32px] lg:h-[32px] rounded-full bg-primary text-hardwhite flex items-center justify-center text-sm lg:text-base font-black shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                      {{ idx + 1 }}
                    </div>
                  </div>
                  <!-- Line that stretches to next step using absolute positioning -->
                  <div v-if="idx < recipe.meta?.steps.length - 1"
                    class="absolute right-[14px] lg:right-[16px] top-[32px] lg:top-[36px] bottom-0 w-0.5 bg-primary/10 group-hover:bg-primary/30 transition-colors">
                  </div>
                  <div class="flex-1">
                    <h3
                      class="text-primary font-black text-lg lg:text-xl mb-2 group-hover:text-secondary transition-colors">
                      {{ step.title }}</h3>
                    <p class="text-highlight text-sm lg:text-base leading-relaxed font-medium whitespace-pre-line">{{
                      step.content }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Chef Tip -->
            <section v-if="recipe.meta?.chefTip"
              class="relative bg-hardwhite border-[5px] border-secondary rounded-[12px] lg:rounded-[16px] p-6 lg:p-8 animate-fade-in-up overflow-visible">
              <div
                class="no-print absolute -top-3 -right-3 w-8 h-8 lg:w-10 lg:h-10 bg-secondary rounded-full flex items-center justify-center  hover:rotate-[360deg]  transition-transform duration-500 z-10">
                <Icon name="tresh-icon:lightbulb" class="w-6 h-6 lg:w-8 lg:h-8 text-highlight hover:scale-125 transition-all  duration-300" />
              </div>
              <h2 class="text-xl lg:text-2xl font-bold text-secondary mb-4 mt-2">نصائح الشيف</h2>
              <p class="text-secondary font-normal leading-relaxed text-sm lg:text-base whitespace-pre-line">{{
                recipe.meta.chefTip }}</p>
            </section>
          </div>
        </div>

        <!-- Suggestions Section - Full Width -->
        <section class="mt-16 lg:mt-24 pb-10  no-print">
          <h2 class="text-xl lg:text-3xl font-bold text-primary mb-8 lg:mb-10 flex items-center gap-3">
            <span class="w-1 h-8 bg-highlight rounded-full"></span>
            وصفات قد تعجبك
          </h2>

          <!-- Desktop Grid -->
          <div class="hidden lg:grid lg:grid-cols-3  gap-6">
            <NuxtLink v-for="(item, idx) in suggested" :key="item.id" :to="item.path"
              class="bg-hardwhite  rounded-[16px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col h-[380px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] group"
              :style="{ animationDelay: `${idx * 0.1}s` }">
              <div class="h-[70%] w-full overflow-hidden">
                <NuxtImg :src="item.meta?.image" :alt="item.title" format="webp" quality="90" width="720" loading="lazy"
                  fit="cover"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div class="p-5 flex flex-col justify-between flex-grow">
                <h3 class="text-lg font-black text-softblack line-clamp-2 group-hover:text-primary transition-colors">{{
                  item.title }}</h3>
                <div class="flex items-center justify-between mt-auto text-xs">
                  <div class="flex items-center gap-1">
                    <Icon name="tresh-icon:time-icon" class="w-4 h-4 text-highlight" />
                    <span class="text-graytext">{{ item.meta?.prepTime }} دقائق</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="tresh-icon:diff-icon" class="w-4 h-4 text-highlight" />
                    <span class="text-graytext">{{ item.meta?.difficulty }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="tresh-icon:people-icon" class="w-4 h-4 text-highlight" />
                    <span class="text-graytext">{{ item.meta?.servings }} أشخاص</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Mobile Scroll -->
          <div class="lg:hidden flex gap-5 overflow-x-auto no-scrollbar pb-8 px-1 scroll-smooth no-print">
            <NuxtLink v-for="item in suggested" :key="item.id" :to="item.path"
              class="min-w-[280px] bg-hardwhite rounded-[12px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col h-[290px] transition-all hover:scale-[1.02]">
              <div class="h-[65%] w-full bg-hardwhite/50">
                <NuxtImg :src="item.meta?.image" class="w-full h-full object-cover" :alt="item.title" loading="lazy"
                  format="webp" quality="90" width="720" />
              </div>
              <div class="p-3 pb-4 flex flex-col justify-between flex-grow">
                <h3 class="text-lg font-black text-gray-800 truncate">{{ item.title }}</h3>
                <div class="flex items-center justify-between mt-1">
                  <div class="flex items-center gap-1">
                    <Icon name="tresh-icon:time-icon" class="w-4 h-4 text-highlight" />
                    <span class="text-xs text-graytext">{{ item.meta?.prepTime }} دقيقة</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="tresh-icon:diff-icon" class="w-4 h-4 text-highlight" />
                    <span class="text-xs text-graytext">{{ item.meta?.difficulty }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="tresh-icon:people-icon" class="w-4 h-4 text-highlight" />
                    <span class="text-xs text-graytext">{{ item.meta?.servings }} أشخاص</span>
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
        class="fixed inset-0 z-[100] bg-softblack/95 flex items-center justify-center p-6 backdrop-blur-sm"
        @click="isImgModalOpen = false">
        <NuxtImg :src="recipe.meta?.image" width="1600" format="webp" quality="80" :densities="undefined"
          class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-zoom-in" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
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

@keyframes zoom-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in-up,
.animate-reveal-right,
.animate-fade-in-down,
.animate-scale-x {
  animation-fill-mode: both;
  will-change: transform, opacity;
}

.animate-reveal-right {
  animation: reveal-right 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.animate-fade-in-up {
  animation: fadeInUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.animate-scale-x {
  animation: scale-x 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.animate-zoom-in {
  animation: zoom-in 0.3s ease-out;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-500 {
  animation-delay: 0.5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .chart-segment {
    transition: stroke-dasharray 2s cubic-bezier(0.34, 1.56, 0.64, 1), stroke-dashoffset 2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}
</style>