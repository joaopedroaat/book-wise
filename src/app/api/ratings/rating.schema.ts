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
const ratingResponseSchema = z
  .object({
    ratings: ratingSchema.array().optional(),
    rating: ratingSchema.optional(),
  })
  .transform((response) => ({
    ...response,
    rating: response.rating || undefined,
    ratings: response.ratings || undefined,
  }))
  // Checks if rating and ratings don't exist simultaneously, and if there's at
  // least one of them present
  .refine(
    (response) =>
      !(response.rating && response.ratings) &&
      (response.rating || response.ratings),
  )

export type RatingResponse = z.infer<typeof ratingResponseSchema>
