import { z } from 'zod'
import {
  averageRatingResponseSchema,
  bookRatingsResponseSchema,
  bookSchema,
  bookWithRatingsAndCategoriesSchema,
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
  userProfileResponseSchema,
  userProfileSchema,
  userRatingsResponseSchema,
  userSchema,
} from './schemas'

// Models - User
export type User = z.infer<typeof userSchema>
export type UserProfile = z.infer<typeof userProfileSchema>

// Models - Reading
export type Reading = z.infer<typeof readingSchema>
export type ReadingWithBook = z.infer<typeof readingWithBookSchema>

// Models - Category
export type Category = z.infer<typeof categorySchema>

// Models - Book
export type Book = z.infer<typeof bookSchema>
export type BookWithRatingsAndCategories = z.infer<
  typeof bookWithRatingsAndCategoriesSchema
>

// Models - Rating
export type Rating = z.infer<typeof ratingSchema>
export type RatingWithBook = z.infer<typeof ratingWithBookSchema>
export type RatingWithUser = z.infer<typeof ratingWithUserSchema>
export type RatingWithBookAndUser = z.infer<typeof ratingWithBookAndUserSchema>

// Requests
export type PostRating = z.infer<typeof postRatingSchema>
export type PostReading = z.infer<typeof postReadingSchema>

// Responses - Book
export type BooksResponse = z.infer<typeof booksResponseSchema>
export type BookRatingsResponse = z.infer<typeof bookRatingsResponseSchema>
export type SingleBookResponse = z.infer<typeof singleBookResponseSchema>

// Responses - User
export type SingleUserResponse = z.infer<typeof singleUserResponseSchema>
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>
export type UserRatingsResponse = z.infer<typeof userRatingsResponseSchema>

// Responses - Rating
export type RatingsResponse = z.infer<typeof ratingsResponseSchema>
export type SingleRatingResponse = z.infer<typeof singleRatingResponseSchema>
export type AverageRatingResponse = z.infer<typeof averageRatingResponseSchema>

// Responses - Category
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>
export type CategoriesOnBookResponse = z.infer<
  typeof categoriesOnBookResponseSchema
>

// Responses - Reading
export type ReadingsResponse = z.infer<typeof readingsResponseSchema>
export type SingleReadingResponse = z.infer<typeof singleReadingResponseSchema>
