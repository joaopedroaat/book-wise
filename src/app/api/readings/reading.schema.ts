import { z } from 'zod'
import { bookSchema } from '../books/book.schema'

export const readingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  bookId: z.string(),
  book: z.lazy(() => bookSchema.optional()),
  createdAt: z.date().transform((date) => date.toISOString()),
})

export const postReadingRequestBodySchema = z.object({
  userId: z.string(),
  bookId: z.string(),
})

const readingResponseSchema = z
  .object({
    reading: readingSchema.optional(),
    readings: readingSchema.array().optional(),
  })
  .transform((response) => ({
    reading: response.reading || undefined,
    readings: response.readings || undefined,
  }))
  .refine(
    (response) =>
      !(response.reading && response.readings) &&
      !(response.reading || response.readings),
  )

export type ReadingResponse = z.infer<typeof readingResponseSchema>
