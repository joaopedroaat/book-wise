import { prisma } from '@/lib/prisma'
import { BookResponse, bookSchema } from './book.schema'
import { z } from 'zod'

const searchParamsSchema = z.object({
  page: z.coerce.number().positive().default(1),
  perPage: z.coerce.number().positive().default(30),
  orderBy: z.literal('popular').nullish(),
})

export async function GET(request: Request) {
  try {
    const { page, perPage, orderBy } = searchParamsSchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    )

    const books = bookSchema.array().parse(
      await prisma.book.findMany({
        skip: page * perPage - perPage,
        take: perPage,
        orderBy:
          orderBy === 'popular' ? { ratings: { _count: 'desc' } } : undefined,
      }),
    )

    return Response.json({ page, perPage, books } as BookResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
