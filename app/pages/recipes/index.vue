<template>
  <div>
    <h1>Recipes</h1>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        <NuxtLink :to="recipe.path">
          {{ recipe.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
// Query the 'recipes' collection
const { data: recipes } = await useAsyncData('recipes', () => {
  return queryCollection('recipes').select('title', 'description', 'path').all()
})
</script>