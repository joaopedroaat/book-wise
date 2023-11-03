import { prisma } from '@/lib/prisma'
import { categorySchema } from '@/services/BookWiseService/schemas'
import { Book } from '@prisma/client'
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

  let books: Book[] = []

  books = await prisma.book.findMany({
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
      categories: includeCategories && {
        select: {
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

  return Response.json({ books })
}
