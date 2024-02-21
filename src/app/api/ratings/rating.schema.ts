import { z } from 'zod'

// Rating
export const ratingSchema = z.object({
  id: z.string(),
  rate: z.number(),
  description: z.string(),
  bookId: z.string(),
  userId: z.string(),
  createdAt: z.date().transform((date) => date.toISOString()),
})

// Post Rating Request
export const ratingPostRequestBody = z.object({
  rating: ratingSchema.omit({ id: true, createdAt: true }),
})

// Rating Response
const ratingResponseSchema = z.object({
  page: z.number().positive().optional(),
  perPage: z.number().positive().optional(),
  ratings: ratingSchema.array().optional(),
  rating: ratingSchema.optional(),
})

export type RatingResponse = z.infer<typeof ratingResponseSchema>
