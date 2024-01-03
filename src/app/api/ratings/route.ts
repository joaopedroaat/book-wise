import { prisma } from '@/lib/prisma'
import {
  postRatingSchema,
  ratingSchema,
  ratingWithBookAndUserSchema,
  singleRatingResponseSchema,
} from '@/services/BookWiseService/schemas'
import {
  RatingsResponse,
  SingleRatingResponse,
} from '@/services/BookWiseService/types'
import { z } from 'zod'

const searchParamsSchema = z.object({
  page: z.coerce
    .number()
    .nonnegative()
    .nullable()
    .transform((val) => val || 1),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const validatedSearchParams = searchParamsSchema.safeParse({
      page: searchParams.get('page'),
    })

    if (!validatedSearchParams.success)
      return Response.json(
        { error: validatedSearchParams.error },
        { status: 400 },
      )

    const { page } = validatedSearchParams.data

    const ratingsPerPage = 10

    const ratings = await prisma.rating.findMany({
      skip: (page - 1) * ratingsPerPage,
      take: 10,
      include: {
        user: true,
        book: {
          include: {
            ratings: true,
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const parsedRatings = ratingWithBookAndUserSchema.array().parse(ratings)

    return Response.json({ ratings: parsedRatings } as RatingsResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const parsedBody = postRatingSchema.safeParse(await request.json())

    if (!parsedBody.success)
      return Response.json({ error: parsedBody.error }, { status: 400 })

    const { rating } = parsedBody.data

    const existingRate = await prisma.rating.findFirst({
      where: {
        bookId: rating.bookId,
        userId: rating.userId,
      },
    })

    const createdRating = existingRate
      ? await prisma.rating.update({
          data: rating,
          where: {
            id: existingRate.id,
          },
        })
      : await prisma.rating.create({
          data: rating,
        })

    const parsedRating = ratingSchema.parse(createdRating)

    return Response.json({ rating: parsedRating } as SingleRatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
