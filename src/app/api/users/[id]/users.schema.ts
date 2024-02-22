import { z } from 'zod'
import { ratingSchema } from '../../ratings/rating.schema'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  avatarUrl: z.string().nullable(),
  stats: z
    .object({
      totalReviewedBooks: z.number(),
      totalReviewedAuthors: z.number(),
      mostReviewedCategory: z.string(),
    })
    .optional(),
  createdAt: z.date().transform((date) => date.toISOString()),
})

const userResponseSchema = z.object({
  user: userSchema,
  ratings: z.lazy(() => ratingSchema.array().optional()),
})

export type User = z.infer<typeof userSchema>
export type UserStats = z.infer<typeof userSchema.shape.stats>
export type UserResponse = z.infer<typeof userResponseSchema>
