import { prisma } from '@/lib/prisma'
import {
  RatingResponse,
  ratingPostRequestBody,
  ratingSchema,
} from './rating.schema'
import { z } from 'zod'

const searchParamsSchema = z.object({
  page: z.coerce.number().positive().default(1),
  perPage: z.coerce.number().positive().default(30),
  orderBy: z.literal('date').optional(),
  bookId: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const { page, perPage, orderBy, bookId } = searchParamsSchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    )

    const ratings = ratingSchema.array().parse(
      await prisma.rating.findMany({
        where: {
          bookId,
        },
        skip: page * perPage - perPage,
        take: perPage,
        orderBy: orderBy === 'date' ? { createdAt: 'desc' } : undefined,
      }),
    )

    return Response.json({ page, perPage, ratings } as RatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { rating: newRating } = ratingPostRequestBody.parse(
      await request.json(),
    )

    let ratingData = await prisma.rating.findFirst({
      where: {
        bookId: newRating.bookId,
        userId: newRating.userId,
      },
    })

    ratingData = ratingData
      ? await prisma.rating.update({
          data: newRating,
          where: {
            id: ratingData.id,
          },
        })
      : await prisma.rating.create({
          data: newRating,
        })

    const rating = ratingSchema.parse(ratingData)

    return Response.json({ rating } as RatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
