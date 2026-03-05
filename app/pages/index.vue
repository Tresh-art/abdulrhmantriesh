<template>
  <div class="bg-accent min-h-screen font-sans" dir="rtl">

    <!-- HERO SECTION -->
    <section class="relative h-auto w-full overflow-hidden">
      <!-- Optimized Hero Image -->
      <picture>
        <source media="(min-width: 640px)" srcset="/abdu-upscaled.png">
        <NuxtImg src="/abdu.png" alt="Chef Abdu" class=" w-full h-[680px] md:h-full object-cover object-center"
          placeholder format="webp" quality="100" />
      </picture>

      <!-- Gradient Overlay (Bottom #000 to Top #fff @ 20% opacity) -->
      <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent  opacity-20"></div>

      <!-- Text Content Overlay -->
      <div class="absolute inset-0 flex flex-col justify-end items-center pb-20 px-6 text-center">
        <h1
          class="text-hardwhite text-[80px] md:text-[42px] font-black leading-none mb-6 drop-shadow-lg animate-fade-in-up">
          تعلـــم الطـبخ
        </h1>
        <NuxtLink to="/recipes"
          class="bg-secondary text-hardwhite px-12 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform duration-300 shadow-xl">
          عرض الوصفات
        </NuxtLink>
      </div>
    </section>

    <!-- SOCIAL MEDIA BAR -->
    <section class="py-6 border-b border-graytext/20 bg-hardwhite">
      <div class="container mx-auto px-4 flex justify-center items-center gap-8">
        <div class="flex gap-6 items-center">
          <a href="#" class="text-softblack hover:text-primary transition-colors">
            <Icon name="uil:instagram" size="24" />
          </a>
          <a href="#" class="text-softblack hover:text-primary transition-colors">
            <Icon name="uil:youtube" size="24" />
          </a>
          <a href="#" class="text-softblack hover:text-primary transition-colors">
            <Icon name="fa6-brands:tiktok" size="24" />
          </a>
          <a href="#" class="text-softblack hover:text-primary transition-colors">
            <Icon name="uil:facebook" size="24" />
          </a>
        </div>
        <span class="font-bold text-softblack text-lg">متواجد على</span>
      </div>
    </section>

    <!-- EXPLORE SECTION (Full Width Image) -->
    <section class="relative w-full h-[500px] md:h-[735px] flex items-center justify-center overflow-hidden">
      <NuxtImg src="/explore-bg.jpg" class="absolute inset-0 w-full h-full object-cover" loading="lazy" format="webp" />
      <div class="absolute inset-0 bg-softblack/40"></div>
      <div class="relative z-10 text-center">
        <h2 class="text-hardwhite text-5xl md:text-7xl font-black mb-8">إكتـشف الوصفات</h2>
        <NuxtLink to="/recipes"
          class="bg-secondary text-hardwhite px-12 py-4 rounded-full text-xl font-bold hover:bg-primary transition-all shadow-xl">
          عرض الوصفات
        </NuxtLink>
      </div>
    </section>

    <!-- LATEST RECIPES SECTION -->
    <section class="py-20 px-4 md:px-12 bg-accent">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl md:text-5xl font-black text-softblack">أحدث الوصفات</h2>
        <NuxtLink to="/recipes" class="text-primary font-bold border-b-2 border-primary">عرض الكل</NuxtLink>
      </div>

      <!-- Horizontal Scrollable Container -->
      <div class="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory no-scrollbar">
        <NuxtLink v-for="(item, idx) in latestRecipes" :key="item.id" :to="item.path"
          class="min-w-[300px] md:min-w-[380px] bg-hardwhite rounded-[16px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col h-[450px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] group snap-start"
          :style="{ animationDelay: `${idx * 0.1}s` }">
          <div class="h-[60%] w-full overflow-hidden">
            <NuxtImg :src="item.meta?.image" :alt="item.title" format="webp" quality="90" width="720" loading="lazy"
              fit="cover" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div class="p-5 flex flex-col justify-between flex-grow">
            <h3 class="text-xl font-black text-softblack line-clamp-2 group-hover:text-primary transition-colors">
              {{ item.title }}
            </h3>
            <div class="flex items-center justify-between mt-auto text-sm">
              <div class="flex items-center gap-1">
                <Icon name="heroicons:clock" class="w-5 h-5 text-highlight" />
                <span class="text-graytext">{{ item.meta?.prepTime }} دقائق</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="heroicons:users" class="w-5 h-5 text-highlight" />
                <span class="text-graytext">{{ item.meta?.servings }} أشخاص</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="heroicons:signal" class="w-5 h-5 text-highlight" />
                <span class="text-graytext">{{ item.meta?.difficulty }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section class="bg-primary w-full py-20 md:h-[849px] flex items-center overflow-hidden">
      <div class="container mx-auto px-6 md:px-[82px] flex flex-col md:flex-row items-center justify-between gap-12">
        <h2 class="text-hardwhite text-[42px] md:text-[42px] font-black leading-none whitespace-nowrap">
          نبذة عني
        </h2>
        <p
          class="text-hardwhite text-2xl md:text-[47px] leading-relaxed font-regular max-w-4xl text-right md:text-justify">
          شيف ليبي محترف وصانع محتوى يقدّم نصائح ووصفات يومية.
          يسعى يجعل الطبخ عادة ممتعة وسهلة.
        </p>
      </div>
    </section>

    <!-- CONTACT SECTION -->
    <section class="w-full py-20 md:h-[849px] flex items-center">
      <div class="container mx-auto px-6 md:px-[82px] flex flex-col md:flex-row items-center justify-between gap-12">
        <h2 class="text-softblack text-[42px] md:text-[42px] font-black leading-none whitespace-nowrap">
          تواصل معي
        </h2>
        <div class="flex flex-col gap-6 text-right w-full md:w-auto">
          <h3 class="text-softblack text-3xl md:text-5xl font-bold mb-4">للتواصل او الاعلان</h3>
          <div class="flex items-center gap-4 text-2xl md:text-3xl text-softblack group cursor-pointer">
            <Icon name="heroicons:phone" class="text-highlight w-10 h-10" />
            <span class="dir-ltr">08911231314</span>
          </div>
          <div class="flex items-center gap-4 text-2xl md:text-3xl text-softblack group cursor-pointer">
            <Icon name="heroicons:envelope" class="text-highlight w-10 h-10" />
            <span>myemail@gmail.com</span>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER SOCIALS -->
    <footer class="py-12 border-t border-graytext/20">
      <div class="flex justify-center gap-10">
        <a href="#" class="text-softblack hover:text-highlight transition-all scale-125">
          <Icon name="uil:instagram" />
        </a>
        <a href="#" class="text-softblack hover:text-highlight transition-all scale-125">
          <Icon name="uil:youtube" />
        </a>
        <a href="#" class="text-softblack hover:text-highlight transition-all scale-125">
          <Icon name="fa6-brands:tiktok" />
        </a>
        <a href="#" class="text-softblack hover:text-highlight transition-all scale-125">
          <Icon name="uil:facebook" />
        </a>
      </div>
    </footer>

  </div>
</template>

<script setup>
// Fetch the LATEST recipes by sorting by 'date' or a similar field descending
const { data: latestRecipes } = await useAsyncData('latest-recipes', () => {
  return queryCollection('recipes')
    .order('date', 'DESC') // Sort by newest first
    .limit(6)              // Get the top 6
    .all()
})
</script>

<style scoped>
/* Custom animations */
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hide scrollbar for the cards container */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Force LTR for phone numbers */
.dir-ltr {
  direction: ltr;
  unicode-bidi: embed;
}
</style>