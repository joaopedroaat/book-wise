import { z } from 'zod'

export const bookSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  summary: z.string(),
  coverUrl: z.string(),
  totalPages: z.number(),
  createdAt: z.date().transform((date) => date.toISOString()),
})

const bookResponseSchema = z.object({
  page: z.number().positive(),
  perPage: z.number().positive(),
  books: bookSchema.array(),
})

export const bookRateResponseSchema = z.object({
  rate: z.number(),
})

export type BookResponse = z.infer<typeof bookResponseSchema>
export type BookRateResponse = z.infer<typeof bookRateResponseSchema>
