import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    recipes: defineCollection({
      type: 'page',
      source: 'recipes/*.md',
      schema: z.object({
        date: z.date(), // Ensure 'date' is defined as a date type
      }),
    })
  }
})