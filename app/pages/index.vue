<template>
  <div class="bg-accent min-h-screen font-sans" dir="rtl">

    <!-- HERO SECTION -->
    <section class="relative lg:h-fit h-auto w-full overflow-hidden">
      <!-- Optimized Hero Image -->
      <picture style="display: block; min-height: 680px;" class="w-full">
        <source media="(min-width: 640px)" srcset="/abdu-upscaled.jpg">
        <NuxtImg src="/abdu.jpeg" alt="Chef Abdu" class="w-full h-[680px] md:h-full object-cover object-center"
          placeholder format="webp" quality="90" :preload="{ fetchPriority: 'high' }" />
      </picture>

      <!-- Gradient Overlay (Bottom #000 to Top #fff @ 20% opacity) -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-20"></div>

      <!-- Text Content Overlay -->
      <div class="absolute inset-0 flex flex-col justify-end items-center pb-6 px-6 text-center lg:pb-44">
        <h1 class="text-hardwhite text-5xl md:text-7xl font-black leading-none mb-6 drop-shadow-lg ">
          تعلـــم الطـبخ
        </h1>
        <NuxtLink to="/recipes"
          class="bg-secondary text-hardwhite px-6 py-2 rounded-md text-md font-normal hover:scale-105 transition-transform duration-300 shadow-xl">
          عرض الوصفات
        </NuxtLink>
      </div>
    </section>

    <!-- SOCIAL MEDIA BAR -->
    <section class="py-6 border-b border-graytext/20 bg-hardwhite lg:h-24">
      <div class="container mx-auto px-4 flex justify-center items-center gap-8">

        <div class="flex gap-6 items-center">
          <a target="_blank"
            href="https://www.instagram.com/abdalrhman_tresh?igsh=MTJudmppaDVsczJlMQ%3D%3D&utm_source=qr"
            class="text-softblack hover:text-primary transition-all hover:scale-125">
            <Icon name="uil:instagram" class="size-8 md:size-10 hover:text-highlight transition-all hover:scale-125" />
          </a>
          <a target="_blank" href="https://www.youtube.com/@abdalrhmantresh"
            class="text-softblack hover:text-primary transition-all hover:scale-125">
            <Icon name="uil:youtube" class="size-8 md:size-10 hover:text-highlight transition-all hover:scale-125" />
          </a>
          <a target="_blank" href="https://www.tiktok.com/@abdulrhmantriesh?_r=1&_t=ZS-94S6KbdrtKi "
            class="text-softblack hover:text-primary transition-all hover:scale-125">
            <Icon name="fa6-brands:tiktok"
              class="size-8 md:size-10 hover:text-highlight transition-all hover:scale-125" />
          </a>
          <a target="_blank" href="https://www.facebook.com/share/187Q9Mz9LH/?mibextid=wwXIfr"
            class="text-softblack hover:text-primary transition-all hover:scale-125">
            <Icon name="uil:facebook" class="size-8 md:size-10 hover:text-highlight transition-all hover:scale-125" />
          </a>
        </div>
      </div>
    </section>

    <!-- EXPLORE SECTION (Full Width Image) -->
    <section class="relative w-full h-[310px] md:h-[500px] flex items-center justify-center overflow-hidden">
      <NuxtImg src="/site/fried-egg.png" class="absolute inset-0 w-full h-full object-cover scale-110" loading="lazy"
        format="webp" />
      <div class="absolute inset-0 bg-softblack/50"></div>
      <div class="relative z-10 text-center">
        <h2 class="text-hardwhite text-4xl md:text-7xl font-black mb-8 animate-fade-in-up">إكتـشف الوصفات</h2>
        <NuxtLink to="/recipes"
          class="bg-secondary text-hardwhite px-6 py-2 rounded-md text-md font-normal hover:scale-105 transition-transform duration-300 shadow-xl">
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
      <div class="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory lg:no-scrollbar sm:overflow-x-scroll">
        <NuxtLink v-for="(item, idx) in latestRecipes" :key="item.id" :to="item.path"
          class="min-w-[300px] md:min-w-[380px]  h-[280px] bg-hardwhite rounded-[16px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col transition-all duration-300 hover:scale-[1.03] hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] group snap-start"
          :style="{ animationDelay: `${idx * 0.1}s` }">
          <div class="h-[60%] w-full overflow-hidden">
            <NuxtImg :src="item.meta?.image" :alt="item.title" format="webp" quality="90" width="720" loading="lazy"
              fit="cover" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div class="p-5 flex flex-col justify-between flex-grow">
            <h3 class="text-xl font-black text-softblack line-clamp-1 group-hover:text-primary transition-colors">
              {{ item.title }}
            </h3>
            <div class="flex items-center justify-between mt-4 text-xs">
              <div class="flex items-center gap-1">
                <Icon name="tresh-icon:time-icon" class="w-5 h-5 text-highlight" />
                <span class="text-graytext">{{ item.meta?.prepTime }} دقائق</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="tresh-icon:diff-icon" class="w-5 h-5 text-highlight" />
                <span class="text-graytext">{{ item.meta?.difficulty }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="tresh-icon:people-icon" class="w-5 h-5 text-highlight" />
                <span class="text-graytext">{{ item.meta?.servings }} أشخاص</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section id="bio" class="relative bg-primary w-full py-20 h-[310px] md:h-[500px] flex items-center overflow-hidden">
      <NuxtImg src="/site/pancake.png"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-auto h-full opacity-10"
        loading="lazy" format="webp" quality="50" />
      <div
        class="relative z-10 container mx-2 px-0 md:px-[24px] lg:px-[60px] flex flex-row md:flex-row items-center justify-between ">
        <h2
          class="text-hardwhite text-center  text-[52px] md:text-[92px] font-bold leading-12  whitespace-nowrap w-1/2">
          نبذة <br class="block md:block lg:hidden">عنـي
        </h2>
        <p
          class="text-hardwhite text-right md:text-center text-md md:text-3xl md:leading-relaxed leading-relaxed font-light  w-1/2">
          شيف ليبي محترف وصانع محتوى يقدّم نصائح ووصفات يومية.<br> يسعى يجعل الطبخ عادة ممتعة وسهلة. </p>
      </div>
    </section>

    <!-- CONTACT SECTION -->
    <!-- CONTACT SECTION -->
    <section class="relative bg-hardwhite w-full py-20 h-[310px] md:h-[500px] flex items-center overflow-hidden"
      dir="rtl">

      <div class="relative z-10 container mx-auto px-4 md:px-[60px] flex flex-row items-center justify-between">

        <!-- RIGHT SIDE: HEADING (Identical to About Section) -->
        <h2 class="text-primary text-center text-[52px] md:text-[92px] font-bold leading-tight whitespace-nowrap w-1/2">
          <span class="relative inline-block">
            تواصل
            <!-- This is the line -->
            <span
              class="absolute -bottom-1 md:-bottom-2 left-1/2 -translate-x-1/2 w-[40%] h-[4px] md:h-[8px] bg-primary rounded-full"></span>
          </span>
          <br class="block md:block">
          معـي
        </h2>

        <!-- LEFT SIDE: CONTACT DETAILS (Aligned to the Left) -->
        <div class="w-1/2 flex flex-col items-start lg:items-center" dir="ltr">
          <!-- dir="ltr" here ensures Icon is on the left and text flows to the right, 
           and items-start pushes the whole block to the visual left of the screen -->

          <div class="w-full text-right mb-4 md:mb-8">
            <h3 class="text-primary text-lg md:text-4xl font-bold lg:text-center" dir="rtl">للتواصل او الاعلان</h3>
          </div>

          <div class="flex flex-col gap-3 md:gap-6 justify-center align-items-center">
            <!-- Phone Link: [Icon] [Item] -->
            <a href="tel:+905013681310" class="flex items-center gap-3 md:gap-4 group">
              <div class="p-2 md:p-3   transition-all duration-300">
                <Icon name="heroicons:phone" class="text-primary w-5 h-5 md:w-8 md:h-8" />
              </div>
              <span class="text-softblack text-sm md:text-2xl font-medium tracking-wider">
                +90 501 368 13 10
              </span>
            </a>

            <!-- Email Link: [Icon] [Item] -->
            <a href="mailto:abdulrhmantriesh@gmail.com" class="flex items-center gap-3 md:gap-4 group">
              <div class="p-2 md:p-3   transition-all duration-300">
                <Icon name="heroicons:envelope" class="text-primary w-5 h-5 md:w-8 md:h-8" />
              </div>
              <span class="text-softblack text-sm md:text-2xl font-medium break-all md:break-normal">
                abdulrhmantriesh@gmail.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL MEDIA SECTION (Immediately Beneath) -->
    <section class="py-6 border-b border-graytext/20 bg-hardwhite lg:h-24">
      <div class="container mx-auto px-4 flex justify-center items-center gap-8">
        <div class="flex gap-6 items-center">
          <a target="_blank"
            href="https://www.instagram.com/abdalrhman_tresh?igsh=MTJudmppaDVsczJlMQ%3D%3D&utm_source=qr"
            class="text-primary hover:text-primary transition-all hover:scale-125">
            <Icon name="uil:instagram" class="size-8 md:size-10 hover:text-highlight transition-all hover:scale-125" />
          </a>
          <a target="_blank" href="https://www.youtube.com/@abdalrhmantresh"
            class="text-primary hover:text-primary transition-all hover:scale-125">
            <Icon name="uil:youtube" class="size-8 md:size-10 hover:text-highlight transition-all hover:scale-125" />
          </a>
          <a target="_blank" href="https://www.tiktok.com/@abdulrhmantriesh?_r=1&_t=ZS-94S6KbdrtKi"
            class="text-primary hover:text-primary transition-all hover:scale-125">
            <Icon name="fa6-brands:tiktok"
              class="size-8 md:size-10 hover:text-highlight transition-all hover:scale-125" />
          </a>
          <a target="_blank" href="https://www.facebook.com/share/187Q9Mz9LH/?mibextid=wwXIfr"
            class="text-primary hover:text-primary transition-all hover:scale-125">
            <Icon name="uil:facebook" class="size-8 md:size-10 hover:text-highlight transition-all hover:scale-125" />
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// Fetch the LATEST recipes by sorting by 'date' or a similar field descending
const { data: latestRecipes } = await useAsyncData('latest-recipes', () => {
  return queryCollection('recipes')
    .order('date', 'DESC')
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