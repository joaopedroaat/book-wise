import { z } from 'zod'
import { ratingSchema } from './ratingSchema'
import { categorySchema } from './categorySchema'

export const bookSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  summary: z.string(),
  cover_url: z.string(),
  total_pages: z.number(),
  created_at: z.string().datetime(),
})

export const bookWithRatingsSchema = bookSchema.extend({
  ratings: z.array(ratingSchema),
})

export const bookWithCategories = bookSchema.extend({
  categories: z.array(categorySchema),
})

export const bookWithRatingsAndCategories = bookSchema.extend({
  ratings: z.array(ratingSchema),
  categories: z.array(categorySchema),
})
