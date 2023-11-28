import { z } from 'zod'

// Primary Schemas

export const bookSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  summary: z.string(),
  coverUrl: z.string(),
  totalPages: z.number(),
  createdAt: z.date().transform((date) => date.toISOString()),
})

export const ratingSchema = z.object({
  id: z.string(),
  rate: z.number(),
  description: z.string(),
  createdAt: z.date().transform((date) => date.toISOString()),
  bookId: z.string(),
  userId: z.string(),
})

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  avatarUrl: z.string().nullable(),
  createdAt: z.date().transform((date) => date.toISOString()),
})

export const categorySchema = z.object({
  id: z.string(),
  name: z.enum([
    'Geek',
    'Romance',
    'Suspense',
    'Ficção',
    'Fábula',
    'Terror',
    'Alegoria',
    'Arquitetura',
    'Autoajuda',
    'Programação',
    'Aventura',
    'Educação',
  ]),
})

export const readingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  bookId: z.string(),
  createdAt: z.date().transform((date) => date.toISOString()),
})

export const userStatsSchema = z.object({
  totalBooksReviewed: z.number(),
  totalAuthorsReviewed: z.number(),
  mostReviewedCategories: z.array(categorySchema.shape.name),
})

// Extensions

export const ratingWithUserSchema = ratingSchema.omit({ userId: true }).extend({
  user: userSchema,
})

export const bookWithRatingsSchema = bookSchema.extend({
  ratings: z.array(ratingWithUserSchema),
})

export const bookWithCategoriesSchema = bookSchema.extend({
  categories: z.array(
    z
      .object({
        category: categorySchema,
      })
      .transform(({ category }) => ({ id: category.id, name: category.name })),
  ),
})

export const ratingWithBookSchema = ratingSchema.omit({ bookId: true }).extend({
  book: bookSchema,
})

export const bookWithRatingsAndCategoriesSchema = bookWithRatingsSchema.merge(
  bookWithCategoriesSchema,
)

export const ratingWithBookAndUserSchema = ratingWithBookSchema
  .merge(ratingWithUserSchema)
  .omit({ bookId: true, userId: true })

export const readingWithBookSchema = readingSchema
  .omit({ bookId: true })
  .extend({
    book: bookSchema,
  })

// Request Schemas

export const ratingPostRequestBodySchema = z.object({
  rating: ratingSchema.omit({ id: true, createdAt: true }),
})

export const readingPostRequestBodySchema = z.object({
  bookId: z.string(),
})

// Response Schemas

export const singleUserResponseSchema = z.object({
  user: userSchema,
})

export const singleBookResponseSchema = z.object({
  book: z.union([
    bookSchema,
    bookWithRatingsSchema,
    bookWithCategoriesSchema,
    bookWithRatingsAndCategoriesSchema,
  ]),
})

export const bookResponseSchema = z.object({
  books: z.union([
    z.array(bookSchema),
    z.array(bookWithRatingsSchema),
    z.array(bookWithCategoriesSchema),
    z.array(bookWithRatingsAndCategoriesSchema),
  ]),
})

export const categoryResponseSchema = z.object({
  categories: z.array(categorySchema),
})

export const ratingResponseSchema = z.object({
  rating: ratingSchema,
})

export const ratingsResponseSchema = z.object({
  ratings: z.union([
    z.array(ratingSchema),
    z.array(ratingWithBookSchema),
    z.array(ratingWithUserSchema),
    z.array(ratingWithBookAndUserSchema),
  ]),
})

export const categoriesOnBookResponseSchema = z.object({
  categories: categorySchema
    .array()
    .refine((categories) =>
      categories.map(
        (category, index, array) => index === 0 || category.id === array[0].id,
      ),
    ),
})

export const readingsResponseSchema = z.object({
  readings: z.union([readingSchema.array(), readingWithBookSchema.array()]),
})

export const readingResponseSchema = z.object({
  reading: readingSchema,
})

export const userRatingsResponseSchema = z.object({
  ratings: z
    .array(ratingWithBookSchema)
    .refine((ratings) =>
      ratings.every(
        (rating, index, array) =>
          index === 0 || rating.userId === array[0].userId,
      ),
    ),
})

export const userStatsResponseSchema = z.object({
  stats: userStatsSchema,
})

export const averageRatingResponseSchema = z.object({
  average: z.number(),
})
