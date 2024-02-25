import { prisma } from '@/lib/prisma'
import { Rating } from '@prisma/client'
import { z } from 'zod'

export type GetRatingsResponse = {
  page: number
  perPage: number
  ratings: Rating[]
}

export async function GET(request: Request) {
  try {
    const {
      page,
      perPage,
      orderBy,
      bookId,
      userId,
      book: includeBook,
      user: includeUser,
    } = z
      .object({
        page: z.coerce.number().positive().default(1),
        perPage: z.coerce.number().positive().default(30),
        orderBy: z.literal('date').optional(),
        bookId: z.string().optional(),
        userId: z.string().optional(),
        book: z.preprocess((val) => val === 'true', z.boolean()).optional(),
        user: z.preprocess((val) => val === 'true', z.boolean()).optional(),
      })
      .parse(Object.fromEntries(new URL(request.url).searchParams))

    const ratings = await prisma.rating.findMany({
      where: {
        bookId,
        userId,
      },
      include: {
        book: includeBook,
        user: includeUser,
      },
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: orderBy === 'date' ? { createdAt: 'desc' } : undefined,
    })

    return Response.json({ page, perPage, ratings } as GetRatingsResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

export type PostRatingResponse = {
  rating: Rating
}

export async function POST(request: Request) {
  try {
    const { rating: newRating } = z
      .object({
        rating: z.object({
          rate: z.number(),
          description: z.string(),
          bookId: z.string(),
          userId: z.string(),
        }),
      })
      .parse(await request.json())

    let rating = await prisma.rating.findFirst({
      where: {
        bookId: newRating.bookId,
        userId: newRating.userId,
      },
    })

    rating = rating
      ? await prisma.rating.update({
          data: rating,
          where: {
            id: rating.id,
          },
        })
      : await prisma.rating.create({
          data: newRating,
        })

    return Response.json({ rating } as PostRatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
