<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`recipes-${slug}`, () => {
  return queryCollection('recipes').path(`/recipes/${slug}`).first()
})
</script>

<template>
  <!-- Render the recipes post as Prose & Vue components -->
  <ContentRenderer :value="post" />
</template>
