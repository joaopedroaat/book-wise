import { z } from 'zod'
import {
  averageRatingResponseSchema,
  bookRatingsResponseSchema,
  bookSchema,
  bookWithCategoriesSchema,
  bookWithRatingsAndCategoriesSchema,
  bookWithRatingsSchema,
  booksResponseSchema,
  categoriesOnBookResponseSchema,
  categoriesResponseSchema,
  categorySchema,
  postRatingSchema,
  postReadingSchema,
  ratingSchema,
  ratingWithBookAndUserSchema,
  ratingWithBookSchema,
  ratingWithUserSchema,
  ratingsResponseSchema,
  readingSchema,
  readingWithBookSchema,
  readingsResponseSchema,
  singleBookResponseSchema,
  singleRatingResponseSchema,
  singleReadingResponseSchema,
  singleUserResponseSchema,
  userRatingsResponseSchema,
  userSchema,
  userStatsResponseSchema,
  userStatsSchema,
} from './schemas'

export type User = z.infer<typeof userSchema>
export type UserStats = z.infer<typeof userStatsSchema>

export type Reading = z.infer<typeof readingSchema>
export type ReadingWithBook = z.infer<typeof readingWithBookSchema>

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

// Requests
export type PostRating = z.infer<typeof postRatingSchema>
export type PostReading = z.infer<typeof postReadingSchema>

// Responses
export type SingleUserResponse = z.infer<typeof singleUserResponseSchema>
export type SingleBookResponse = z.infer<typeof singleBookResponseSchema>
export type BooksResponse = z.infer<typeof booksResponseSchema>
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>
export type SingleRatingResponse = z.infer<typeof singleRatingResponseSchema>
export type RatingsResponse = z.infer<typeof ratingsResponseSchema>
export type BookRatingsResponse = z.infer<typeof bookRatingsResponseSchema>
export type CategoriesOnBookResponse = z.infer<
  typeof categoriesOnBookResponseSchema
>
export type ReadingsResponse = z.infer<typeof readingsResponseSchema>
export type SingleReadingResponse = z.infer<typeof singleReadingResponseSchema>
export type UserRatingsResponse = z.infer<typeof userRatingsResponseSchema>
export type UserStatsResponse = z.infer<typeof userStatsResponseSchema>
export type AverageRatingResponse = z.infer<typeof averageRatingResponseSchema>
