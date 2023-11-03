import { z } from 'zod'
import {
  userSchema,
  categorySchema,
  bookSchema,
  bookWithRatingsSchema,
  bookWithCategoriesSchema,
  bookWithRatingsAndCategoriesSchema,
  ratingSchema,
  ratingWithBookSchema,
  ratingWithUserSchema,
  ratingWithBookAndUserSchema,
  bookResponseSchema,
  categoryResponseSchema,
  ratingResponseSchema,
  singleUserResponseSchema,
  singleBookResponseSchema,
} from './schemas'

export type User = z.infer<typeof userSchema>

export type Category = z.infer<typeof categorySchema>
export type CategoryNames = Category['name']

export type Book = z.infer<typeof bookSchema>
export type BookWithRatings = z.infer<typeof bookWithRatingsSchema>
export type BookWithCategories = z.infer<typeof bookWithCategoriesSchema>
export type BookWithRatingsAndCategories = z.infer<
  typeof bookWithRatingsAndCategoriesSchema
>

export type Rating = z.infer<typeof ratingSchema>
export type RatingWithBook = z.infer<typeof ratingWithBookSchema>
export type RatingWithUser = z.infer<typeof ratingWithUserSchema>
export type RatingWithBookAndUser = z.infer<typeof ratingWithBookAndUserSchema>

export type SingleUserResponse = z.infer<typeof singleUserResponseSchema>
export type SingleBookResponse = z.infer<typeof singleBookResponseSchema>
export type BookResponse = z.infer<typeof bookResponseSchema>
export type CategoryResponse = z.infer<typeof categoryResponseSchema>
export type RatingResponse = z.infer<typeof ratingResponseSchema>
