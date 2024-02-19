import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  avatarUrl: z.string().nullable(),
  createdAt: z.date().transform((date) => date.toISOString()),
})

const userResponseSchema = z.object({
  user: userSchema,
})

export type UserResponse = z.infer<typeof userResponseSchema>
