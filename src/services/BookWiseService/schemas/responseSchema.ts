import { z } from 'zod'
import {
  bookSchema,
  bookWithCategories,
  bookWithRatingsAndCategories,
  bookWithRatingsSchema,
} from './bookSchema'
import { categorySchema } from './categorySchema'
import {
  ratingSchema,
  ratingWithBookAndUser,
  ratingWithBookSchema,
  ratingWithUserSchema,
} from './ratingSchema'

export const bookResponseSchema = z.object({
  books: z.union([
    z.array(bookSchema),
    z.array(bookWithRatingsSchema),
    z.array(bookWithCategories),
    z.array(bookWithRatingsAndCategories),
  ]),
})

export const categoryResponseSchema = z.object({
  categories: z.array(categorySchema),
})

export const ratingResponseSchema = z.object({
  ratings: z.union([
    z.array(ratingSchema),
    z.array(ratingWithBookSchema),
    z.array(ratingWithUserSchema),
    z.array(ratingWithBookAndUser),
  ]),
})
