import { prisma } from '@/lib/prisma'
import {
  bookWithRatingsAndCategoriesSchema,
  categorySchema,
} from '@/services/BookWiseService/schemas'
import { BooksResponse } from '@/services/BookWiseService/types'
import { z } from 'zod'

const searchParamsSchema = z.object({
  page: z
    .number()
    .nonnegative()
    .nullable()
    .transform((val) => val || 1),
  perPage: z.coerce
    .number()
    .nonnegative()
    .nullable()
    .transform((val) => val || 30),
  category: z
    .string()
    .refine((val) =>
      Object.values(categorySchema.shape.name.enum)
        .map((categoryName) => categoryName.toLowerCase())
        .includes(val.toLowerCase()),
    )
    .nullable(),
  orderBy: z.enum(['popular']).nullable(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const validatedSearchParams = searchParamsSchema.safeParse({
      page: searchParams.get('page'),
      perPage: searchParams.get('perPage'),
      category: searchParams.get('category'),
      includeRatings: searchParams.get('includeRatings'),
      includeCategories: searchParams.get('includeCategories'),
      orderBy: searchParams.get('orderBy'),
    })

    if (!validatedSearchParams.success)
      return Response.json(
        { error: validatedSearchParams.error },
        { status: 400 },
      )

    const { page, category, orderBy, perPage } = validatedSearchParams.data

    const books = await prisma.book.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      where: category
        ? {
            categories: {
              some: {
                category: {
                  name: category,
                },
              },
            },
          }
        : undefined,
      include: {
        ratings: {
          include: {
            user: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: orderBy
        ? {
            ratings: {
              _count: 'desc',
            },
          }
        : undefined,
    })

    const parsedBooks = bookWithRatingsAndCategoriesSchema.array().parse(books)

    return Response.json({ books: parsedBooks } as BooksResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
