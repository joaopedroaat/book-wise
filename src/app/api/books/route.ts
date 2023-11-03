import { prisma } from '@/lib/prisma'
import { categorySchema } from '@/services/BookWiseService/schemas/categorySchema'
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
  includeRatings: z.coerce
    .boolean()
    .nullable()
    .transform((val) => val || false),
  includeCategories: z.coerce
    .boolean()
    .nullable()
    .transform((val) => val || false),
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const validatedSearchParams = searchParamsSchema.safeParse({
    page: searchParams.get('page'),
    category: searchParams.get('category'),
    includeRatings: searchParams.get('includeRatings'),
    includeCategories: searchParams.get('includeCategories'),
  })

  if (!validatedSearchParams.success)
    return Response.json(
      { error: validatedSearchParams.error },
      { status: 400 },
    )

  const { page, category, includeRatings, includeCategories } =
    validatedSearchParams.data

  console.log(category)

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
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
  })

  return Response.json({ books })
}
