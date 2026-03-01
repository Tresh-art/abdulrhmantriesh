<script setup>
// Fetching using the Collections API as per your setup
const { data: recipes } = await useAsyncData('recipes', () => {
  return queryCollection('recipes').all()
})

const searchQuery = ref('');
const selectedCategory = ref('الكل');

// Extract unique categories from recipe.meta.category
const categories = computed(() => {
  if (!recipes.value) return [];
  // Get all categories from the meta object
  const allCats = recipes.value.map(r => r.meta?.category).filter(Boolean);
  // Return unique values plus the "All" option
  return ['الكل', ...new Set(allCats)];
});

// Search and Category Filter logic
const filteredRecipes = computed(() => {
  if (!recipes.value) return [];
  return recipes.value.filter(recipe => {
    const title = recipe.title || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'الكل' || recipe.meta?.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});
</script>

<template>
  <!-- dir="rtl" handles the Arabic layout flow (icons on right, text alignment) -->
  <div class="min-h-screen bg-accent pb-12" dir="rtl">

    <!-- Top Section: Search & Filter -->
    <header class="m-4 mt-0 md:px-8 lg:px-16 lg:max-w-7xl max-w-full mx-auto sm:max-w-full">
      <div class="flex items-center gap-3 p-4 pb-0">
        <!-- Search Bar (85%) -->
        <div class="relative w-[85%]">
          <input v-model="searchQuery" type="text" placeholder="ابحث عن وصفتك"
            class="w-full py-3 pr-4 pl-12 rounded-xl border border-accent bg-gray-50 focus:ring-2 focus:ring-primary outline-none text-right" />
          <!-- Search Icon (Inside Left because of RTL, but you asked for right-anchored in design) -->
          <!-- In RTL, pr-4 is the start. To be anchored "Inside on the right", we use right-4 -->
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Filter Button (15%) -->
        <button
          class="w-[15%] bg-primary h-[50px] rounded-xl flex justify-center items-center text-hardwhite shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      <!-- Sideway Scrollable Categories -->
      <div class="mt-4 pr-4 flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap pb-2">
        <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="[
          'px-5 py-2 rounded-md text-sm  transition-colors ',
          selectedCategory === cat
            ? 'bg-primary text-hardwhite'
            : 'bg-hardwhite text-gray-600 border-transparent font-normal'
        ]">
          {{ cat }}
        </button>
      </div>
    </header>

    <div class="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <!-- Horizontal Line -->
      <hr class="border-gray-100 my-4" />

      <!-- Subtitle -->
      <h2 class="text-[32px] font-bold text-primary my-6">الوصفات</h2>

      <!-- Recipes Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="recipe in filteredRecipes" :key="recipe.id" :to="recipe.path"
          class="bg-white rounded-[12px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col h-[290px] transition-transform duration-200 hover:scale-[1.01]">
          <!-- Image Section (approx 65% height as per your code) -->
          <div class="h-[65%] w-full">
            <img :src="recipe.meta?.image" class="w-full h-full object-cover" :alt="recipe.title" />
          </div>

          <!-- Text Section -->
          <div class="p-3 pb-4 flex flex-col justify-between flex-grow">
            <h3 class="text-lg font-bold text-gray-800 truncate">{{ recipe.title }}</h3>

            <!-- Metadata Icons -->
            <div class="flex items-center justify-between mt-1 mx-2">
              <!-- Duration -->
              <div class="flex items-center gap-1">
                <Icon name="heroicons:clock" class="w-4 h-4 text-highlight" />
                <span class="text-sm text-graytext font-normal">{{ recipe.meta?.duration }} دقيقة</span>
              </div>

              <!-- Difficulty (Signal Icon) -->
              <div class="flex items-center gap-1">
                <Icon name="heroicons:signal" class="w-4 h-4 text-highlight" />
                <span class="text-sm text-graytext font-normal">{{ recipe.meta?.difficulty }}</span>
              </div>

              <!-- People -->
              <div class="flex items-center gap-1">
                <Icon name="heroicons:users" class="w-4 h-4 text-highlight" />
                <span class="text-sm text-graytext font-normal">{{ recipe.meta?.servings }} أشخاص</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Standard way to hide scrollbars while keeping functionality */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>