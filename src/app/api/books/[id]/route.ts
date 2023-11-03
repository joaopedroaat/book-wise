import { prisma } from '@/lib/prisma'
import {
  bookSchema,
  bookWithCategoriesSchema,
  bookWithRatingsAndCategoriesSchema,
  bookWithRatingsSchema,
} from '@/services/BookWiseService/schemas'
import { SingleBookResponse } from '@/services/BookWiseService/types'
import { z } from 'zod'

const searchParamsSchema = z.object({
  includeRatings: z
    .enum(['true', 'false'])
    .nullable()
    .transform((val) => val === 'true'),
  includeCategories: z
    .enum(['true', 'false'])
    .nullable()
    .transform((val) => val === 'true'),
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const { searchParams } = new URL(request.url)

    const validatedSearchParams = searchParamsSchema.safeParse({
      includeRatings: searchParams.get('includeRatings'),
      includeCategories: searchParams.get('includeCategories'),
    })

    if (!validatedSearchParams.success)
      return Response.json(
        { error: validatedSearchParams.error },
        { status: 400 },
      )

    const { includeRatings, includeCategories } = validatedSearchParams.data

    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        ratings: includeRatings
          ? {
              include: {
                user: true,
              },
            }
          : undefined,
        categories: {
          include: {
            category: includeCategories,
          },
        },
      },
    })

    let parsedBook = null

    if (includeRatings && includeCategories)
      parsedBook = bookWithRatingsAndCategoriesSchema.parse(book)
    else if (includeRatings) parsedBook = bookWithRatingsSchema.parse(book)
    else if (includeCategories)
      parsedBook = bookWithCategoriesSchema.parse(book)
    else parsedBook = bookSchema.parse(book)

    return Response.json({ book: parsedBook } as SingleBookResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
