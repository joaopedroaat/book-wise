import { prisma } from '@/lib/prisma'
import { Book } from '@prisma/client'
import { z } from 'zod'
import { Genre } from '../categories/category.schema'

export type GetBooksResponse = {
  page: number
  perPage: number
  books: Book[]
}

export async function GET(request: Request) {
  try {
    const {
      page,
      perPage,
      orderBy,
      category,
      ratings: includeRatings,
      categories: includeCategories,
    } = z
      .object({
        page: z.coerce.number().positive().default(1),
        perPage: z.coerce.number().positive().default(30),
        category: z.nativeEnum(Genre).optional(),
        orderBy: z.literal('popular').optional(),
        ratings: z.preprocess((val) => val === 'true', z.boolean()).optional(),
        categories: z
          .preprocess((val) => val === 'true', z.boolean())
          .optional(),
      })
      .parse(Object.fromEntries(new URL(request.url).searchParams))

    const books = await prisma.book.findMany({
      skip: page * perPage - perPage,
      take: perPage,

      where: {
        categories: {
          some: {
            category: {
              name: category,
            },
          },
        },
      },
      include: {
        ratings: includeRatings,
        categories: includeCategories,
      },
      orderBy:
        orderBy === 'popular' ? { ratings: { _count: 'desc' } } : undefined,
    })

    return Response.json({ page, perPage, books } as GetBooksResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
