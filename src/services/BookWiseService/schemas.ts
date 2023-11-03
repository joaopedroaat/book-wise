import { z } from 'zod'

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
  book_id: z.string(),
  user_id: z.string(),
})

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  avatar_url: z.string().nullable(),
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

export const bookWithRatingsSchema = bookSchema.extend({
  ratings: z.array(ratingSchema),
})

export const bookWithCategories = bookSchema.extend({
  categories: z.array(
    z
      .object({
        category: categorySchema,
      })
      .transform(({ category }) => ({ id: category.id, name: category.name })),
  ),
})

export const bookWithRatingsAndCategories = bookSchema.extend({
  ratings: z.array(ratingSchema),
  categories: z.array(
    z.object({
      category: categorySchema,
    }),
  ),
})

export const ratingWithBookSchema = ratingSchema
  .omit({ book_id: true })
  .extend({
    book: bookWithRatingsAndCategories.extend({
      categories: z.array(
        z.object({
          category: categorySchema,
        }),
      ),
    }),
  })

export const ratingWithUserSchema = ratingSchema
  .omit({ user_id: true })
  .extend({
    user: userSchema,
  })

export const ratingWithBookAndUser = ratingSchema
  .omit({ book_id: true, user_id: true })
  .extend({
    book: bookWithRatingsAndCategories.extend({
      categories: z.array(
        z.object({
          category: categorySchema,
        }),
      ),
    }),
    user: userSchema,
  })

export const bookResponseSchema = z.object({
  books: z.union([
    z.array(bookSchema),
    z.array(bookWithRatingsSchema),
    z.array(bookWithCategories),
    z.array(bookWithRatingsAndCategories),
  ]),
})

export const categoryResponseSchema = z.object({
  categories: z.array(categorySchema),
})

export const ratingResponseSchema = z.object({
  ratings: z.union([
    z.array(ratingSchema),
    z.array(ratingWithBookSchema),
    z.array(ratingWithUserSchema),
    z.array(ratingWithBookAndUser),
  ]),
})
