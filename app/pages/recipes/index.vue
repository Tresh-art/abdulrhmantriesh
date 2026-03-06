<script setup>
// Fetching using the Collections API
const { data: recipes } = await useAsyncData('recipes', () => {
  return queryCollection('recipes').all()
})

const searchQuery = ref('');
const selectedCategory = ref('الكل');
const isFilterOpen = ref(false);

// Filter States
const filters = ref({
  maxPrepTime: 240,
  servings: 0, // 0 means any
  difficulty: 'الكل'
});

// Extract unique categories
const categories = computed(() => {
  if (!recipes.value) return [];
  const allCats = recipes.value.map(r => r.meta?.category).filter(Boolean);
  return ['الكل', ...new Set(allCats)];
});

// Advanced Filter logic
const filteredRecipes = computed(() => {
  if (!recipes.value) return [];
  return recipes.value.filter(recipe => {
    const meta = recipe.meta || {};

    // Search Title
    const matchesSearch = (recipe.title || '').toLowerCase().includes(searchQuery.value.toLowerCase());

    // Category
    const matchesCategory = selectedCategory.value === 'الكل' || meta.category === selectedCategory.value;

    // Prep Time (if recipe time is less than or equal to filter)
    const matchesTime = meta.prepTime <= filters.value.maxPrepTime;

    // Servings (if 0, ignore, else match exactly)
    const matchesServings = filters.value.servings === 0 || meta.servings === filters.value.servings;

    // Difficulty
    const matchesDifficulty = filters.value.difficulty === 'الكل' || meta.difficulty === filters.value.difficulty;

    return matchesSearch && matchesCategory && matchesTime && matchesServings && matchesDifficulty;
  });
});

const resetFilters = () => {
  filters.value = {
    maxPrepTime: 240,
    servings: 0,
    difficulty: 'الكل'
  };
};

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value;
};
</script>

<template>
  <div class="min-h-screen bg-accent pb-12" dir="rtl">
    <!-- Header Section -->
    <header class="m-4 mt-0 md:px-8 lg:px-16 lg:max-w-7xl max-w-full mx-auto sm:max-w-full">
      <div class="flex items-center gap-3 p-4 pb-0">
        <div class="relative w-[85%]">
          <input v-model="searchQuery" type="text" placeholder="ابحث عن وصفتك"
            class="w-full py-3 pr-4 pl-12 rounded-xl border border-accent bg-gray-50 focus:ring-2 focus:ring-primary outline-none text-right shadow-sm">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Filter Toggle Button -->
        <button @click="toggleFilter" :class="isFilterOpen ? 'bg-secondary' : 'bg-primary'"
          class="w-[15%] h-[50px] rounded-md flex justify-center items-center text-hardwhite shadow-md transition-all active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="#fff" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <div class="text-hardwhite hidden lg:block mr-2">
            فلترة
          </div>
        </button>
      </div>

      <!-- Quick Category Tabs -->
      <div class="mt-4 pr-4 flex gap-3 overflow-x-auto sm:no-scrollbar whitespace-nowrap pb-2 md:overflow-x-scroll">
        <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="[
          'px-5 py-2 rounded-md text-sm transition-all duration-300  border-2 border-accent shadow-sm',
          selectedCategory === cat
            ? 'bg-primary text-hardwhite border-primary'
            : 'bg-hardwhite border-2 text-primary border-gray-100 font-normal hover:border-primary'
        ]">
          {{ cat }}
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <hr class="border-gray-100 my-4">
      <div class="flex justify-between items-end my-6">
        <h2 class="text-[32px] font-bold text-primary">الوصفات</h2>
        <span class="text-gray-400 text-sm mb-2">{{ filteredRecipes.length }} وصفة موجودة</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        <NuxtLink v-for="recipe in filteredRecipes" :key="recipe.id" :to="recipe.path"
          class="bg-hardwhite rounded-[12px] overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.08)] flex flex-col h-[300px] transition-transform duration-300 hover:translate-y-[-4px]">
          <div class="h-[60%] w-full relative">
            <NuxtImg :src="recipe.meta?.image" :alt="recipe.title" width="400" height="240" format="webp" quality="80"
              loading="lazy" fit="cover" class="w-full h-full object-cover" />
            <div
              class="absolute top-2 right-2 bg-primary backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-hardwhite">
              {{ recipe.meta?.category }}
            </div>
          </div>
          <div class="p-4 flex flex-col justify-between flex-grow">
            <h3 class="text-lg font-bold text-gray-800 truncate">{{ recipe.title }}</h3>
            <div class="flex items-center justify-between mt-auto">
              <div class="flex items-center gap-1">
                <Icon name="heroicons:clock" class="w-4 h-4 text-primary opacity-70" />
                <span class="text-xs text-gray-500 font-medium">{{ recipe.meta?.prepTime }} دقيقة</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="heroicons:bolt" class="w-4 h-4 text-primary opacity-70" />
                <span class="text-xs text-gray-500 font-medium">{{ recipe.meta?.difficulty }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="heroicons:users" class="w-4 h-4 text-primary opacity-70" />
                <span class="text-xs text-gray-500 font-medium">{{ recipe.meta?.servings }} أشخاص</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- PREMIUM FILTER DRAWER -->
    <Transition name="fade">
      <div v-if="isFilterOpen" class="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" @click="isFilterOpen = false">
      </div>
    </Transition>

    <Transition name="slide">
      <div v-if="isFilterOpen"
        class="fixed inset-y-0 left-0 right-0 md:right-auto md:w-[400px] bg-hardwhite z-[70] shadow-2xl flex flex-col rounded-t-[32px] md:rounded-t-none md:rounded-l-[32px] overflow-hidden">

        <!-- Drawer Header -->
        <div class="p-6 border-b flex justify-between items-center bg-hardwhite">
          <h3 class="text-xl font-bold text-primary">تصفية النتائج</h3>
          <button @click="isFilterOpen = false" class="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <Icon name="heroicons:x-mark" class="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <!-- Drawer Body -->
        <div class="flex-grow overflow-y-auto p-6 space-y-8 bg-hardwhite">

          <!-- Difficulty Section -->
          <div class="space-y-4">
            <label class="block text-sm font-bold text-gray-700">درجة الصعوبة</label>
            <div class="flex gap-2">
              <button v-for="diff in ['الكل', 'سهل', 'متوسط', 'صعب']" :key="diff" @click="filters.difficulty = diff"
                :class="filters.difficulty === diff ? 'bg-primary text-hardwhite border-primary' : 'bg-gray-50 text-gray-500 border-gray-100'"
                class="flex-1 py-2 text-sm rounded-xl border transition-all">
                {{ diff }}
              </button>
            </div>
          </div>

          <!-- Prep Time Section -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-bold text-gray-700">وقت التحضير الأقصى</label>
              <span class="text-primary font-bold">{{ filters.maxPrepTime }} دقيقة</span>
            </div>
            <input v-model.number="filters.maxPrepTime" type="range" min="0" max="240" step="5"
              class="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-gray-400">
              <span>5 دقائق</span>
              <span>120 دقيقة</span>
            </div>
          </div>




          <!-- Prep Time Section -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-bold text-gray-700">عدد الأشخاص (الكمية)</label>
              <span class="text-primary font-bold">{{ filters.servings }} أشخاص</span>
            </div>
            <input v-model.number="filters.servings" type="range" min="1" max="20" step="1"
              class="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary">
            <div class="flex justify-between text-[10px] text-gray-400">
              <span>1 أشخاص</span>
              <span>20 أشخاص</span>
            </div>
          </div>


        </div>

        <!-- Drawer Footer -->
        <div class="p-6 border-t bg-hardwhite flex gap-4">
          <button @click="isFilterOpen = false"
            class="flex-[2] bg-primary text-hardwhite py-4 rounded-md font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all hover:bg-accent hover:text-primary hover:border-primary border-2 border-transparent ">
            عرض النتائج
          </button>
          <button @click="resetFilters"
            class="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold active:scale-95 transition-transform">
            إعادة تعيين
          </button>
        </div>
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

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  transform: translateX(-100%);
}

/* Slide from Right for RTL or Left depending on preference */
.slide-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 768px) {

  .slide-enter-from,
  .slide-leave-to {
    transform: translateY(100%);
  }
}

/* Custom Range Styling */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ffffff;
  border: 4px solid #F05A28;
  /* Assuming primary color */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


/* Custom animations */
.animate-fade-in-up {
  animation-fill-mode: both;
  will-change: transform, opacity;
}
.animate-fade-in-up {
  animation: fadeInUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
}

</style>