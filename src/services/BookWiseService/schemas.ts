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

export enum Genre {
  GEEK = 'Geek',
  ROMANCE = 'Romance',
  SUSPENSE = 'Suspense',
  FICTION = 'Ficção',
  FABLE = 'Fábula',
  HORROR = 'Terror',
  ALLEGORY = 'Alegoria',
  ARCHITECTURE = 'Arquitetura',
  SELF_HELP = 'Autoajuda',
  PROGRAMMING = 'Programação',
  ADVENTURE = 'Aventura',
  EDUCATION = 'Educação',
}

export const categorySchema = z.object({
  id: z.string(),
  name: z.nativeEnum(Genre),
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
export const postRatingSchema = z.object({
  rating: ratingSchema.omit({ id: true, createdAt: true }),
})

export const postReadingSchema = z.object({
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

export const booksResponseSchema = z.object({
  books: bookWithRatingsAndCategoriesSchema.array(),
})

export const categoriesResponseSchema = z.object({
  categories: z.array(categorySchema),
})

export const singleRatingResponseSchema = z.object({
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

export const singleReadingResponseSchema = z.object({
  reading: readingSchema,
})

export const readingsResponseSchema = z.object({
  readings: readingWithBookSchema.array(),
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
