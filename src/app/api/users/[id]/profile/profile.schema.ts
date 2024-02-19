import { z } from 'zod'
import { userSchema } from '../users.schema'
import { categorySchema } from '@/app/api/categories/category.schema'

export const userProfileSchema = z.object({
  user: z.lazy(() => userSchema),
  stats: z.object({
    totalBooksReviewed: z.number(),
    totalAuthorsReviewed: z.number(),
    mostReviewedCategories: z.array(categorySchema.shape.name),
  }),
})
export type UserProfile = z.infer<typeof userProfileSchema>

const userProfileResponseSchema = z.object({
  profile: userProfileSchema,
})
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>
