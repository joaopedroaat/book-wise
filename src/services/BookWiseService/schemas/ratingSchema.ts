import { z } from 'zod'
import { bookWithRatingsAndCategories } from './bookSchema'
import { userSchema } from './userSchema'

export const ratingSchema = z.object({
  id: z.string(),
  rate: z.number(),
  description: z.string(),
  created_at: z.string(),
  book_id: z.string(),
  user_id: z.string(),
})

export const ratingWithBookSchema = ratingSchema
  .omit({ book_id: true })
  .extend({
    book: bookWithRatingsAndCategories,
  })

export const ratingWithUserSchema = ratingSchema
  .omit({ user_id: true })
  .extend({
    user: userSchema,
  })

export const ratingWithBookAndUser = ratingSchema
  .omit({ book_id: true, user_id: true })
  .extend({
    book: bookWithRatingsAndCategories,
    user: userSchema,
  })
