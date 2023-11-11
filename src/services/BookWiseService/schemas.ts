import { z } from 'zod'

// Primary Schemas

export const bookSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  summary: z.string(),
  cover_url: z.string(),
  total_pages: z.number(),
  created_at: z.date(),
})

export const ratingSchema = z.object({
  id: z.string(),
  rate: z.number(),
  description: z.string(),
  created_at: z.date(),
  bookId: z.string(),
  userId: z.string(),
})

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  avatarUrl: z.string().nullable(),
  created_at: z.date(),
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
  book: bookSchema.extend({
    categories: z.array(
      z
        .object({
          category: categorySchema,
        })
        .transform((val) => val.category),
    ),
    ratings: z.array(ratingSchema),
  }),
})

export const bookWithRatingsAndCategoriesSchema = bookWithRatingsSchema.merge(
  bookWithCategoriesSchema,
)

export const ratingWithBookAndUserSchema = ratingWithBookSchema
  .merge(ratingWithUserSchema)
  .omit({ bookId: true, userId: true })

// Request Schemas
export const ratingPostRequestBodySchema = z.object({
  rating: ratingSchema.omit({ id: true, created_at: true }),
})

export const ratingPutRequestBodySchema = z.object({
  rating: ratingSchema.omit({
    id: true,
    created_at: true,
    bookId: true,
    userId: true,
  }),
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
