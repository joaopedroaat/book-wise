import { prisma } from '@/lib/prisma'
import {
  bookSchema,
  bookWithCategoriesSchema,
  bookWithRatingsAndCategoriesSchema,
  bookWithRatingsSchema,
  categorySchema,
} from '@/services/BookWiseService/schemas'
import {
  Book,
  BookResponse,
  BookWithCategories,
  BookWithRatings,
  BookWithRatingsAndCategories,
} from '@/services/BookWiseService/types'
import { z } from 'zod'

const searchParamsSchema = z.object({
  page: z
    .number()
    .nonnegative()
    .nullable()
    .transform((val) => val || 1),
  category: z
    .string()
    .refine((val) =>
      Object.values(categorySchema.shape.name.enum)
        .map((categoryName) => categoryName.toLowerCase())
        .includes(val.toLowerCase()),
    )
    .nullable(),
  includeRatings: z
    .enum(['true', 'false'])
    .nullable()
    .transform((val) => val === 'true'),
  includeCategories: z
    .enum(['true', 'false'])
    .nullable()
    .transform((val) => val === 'true'),
  orderBy: z.enum(['popular']).nullable(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const validatedSearchParams = searchParamsSchema.safeParse({
      page: searchParams.get('page'),
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

    const { page, category, includeRatings, includeCategories, orderBy } =
      validatedSearchParams.data

    const booksPerPage = 30

    const books = await prisma.book.findMany({
      skip: (page - 1) * booksPerPage,
      take: booksPerPage,
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
        ratings: includeRatings,
        categories: {
          include: {
            category: includeCategories,
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

    let parsedBooks:
      | Book[]
      | BookWithRatings[]
      | BookWithCategories[]
      | BookWithRatingsAndCategories[] = []

    if (includeRatings && includeCategories)
      parsedBooks = books.map((book) =>
        bookWithRatingsAndCategoriesSchema.parse(book),
      )
    else if (includeRatings)
      parsedBooks = books.map((book) => bookWithRatingsSchema.parse(book))
    else if (includeCategories)
      parsedBooks = books.map((book) => bookWithCategoriesSchema.parse(book))
    else parsedBooks = books.map((book) => bookSchema.parse(book))

    return Response.json({ books: parsedBooks } as BookResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
