import { z } from 'zod'
import {
  bookSchema,
  bookWithRatingsSchema,
  bookWithCategories,
  bookWithRatingsAndCategories,
} from '../schemas/bookSchema'
import { categorySchema } from '../schemas/categorySchema'
import {
  ratingSchema,
  ratingWithBookSchema,
  ratingWithUserSchema,
  ratingWithBookAndUser,
} from '../schemas/ratingSchema'
import {
  bookResponseSchema,
  categoryResponseSchema,
  ratingResponseSchema,
} from '../schemas/responseSchema'
import { userSchema } from '../schemas/userSchema'

export type User = z.infer<typeof userSchema>
export type Category = z.infer<typeof categorySchema>

export type Book = z.infer<typeof bookSchema>
export type BookWithRatings = z.infer<typeof bookWithRatingsSchema>
export type BookWithCategories = z.infer<typeof bookWithCategories>
export type BookWithRatingsAndCategories = z.infer<
  typeof bookWithRatingsAndCategories
>

export type Rating = z.infer<typeof ratingSchema>
export type RatingWithBook = z.infer<typeof ratingWithBookSchema>
export type RatingWithUser = z.infer<typeof ratingWithUserSchema>
export type RatingWithBookAndUser = z.infer<typeof ratingWithBookAndUser>

export type BookResponse = z.infer<typeof bookResponseSchema>
export type CategoryResponse = z.infer<typeof categoryResponseSchema>
export type RatingResponse = z.infer<typeof ratingResponseSchema>
