import { prisma } from '@/lib/prisma'
import {
  ratingSchema,
  ratingWithBookAndUserSchema,
  ratingWithBookSchema,
  ratingWithUserSchema,
} from '@/services/BookWiseService/schemas'
import {
  Rating,
  RatingResponse,
  RatingWithBook,
  RatingWithBookAndUser,
  RatingWithUser,
  RatingsResponse,
} from '@/services/BookWiseService/types'
import { z } from 'zod'

const searchParamsSchema = z.object({
  page: z.coerce
    .number()
    .nonnegative()
    .nullable()
    .transform((val) => val || 1),
  includeUser: z
    .enum(['true', 'false'])
    .nullable()
    .transform((val) => val === 'true'),
  includeBook: z
    .enum(['true', 'false'])
    .nullable()
    .transform((val) => val === 'true'),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const validatedSearchParams = searchParamsSchema.safeParse({
      page: searchParams.get('page'),
      includeUser: searchParams.get('includeUser'),
      includeBook: searchParams.get('includeBook'),
    })

    if (!validatedSearchParams.success)
      return Response.json(
        { error: validatedSearchParams.error },
        { status: 400 },
      )

    const { page, includeBook, includeUser } = validatedSearchParams.data

    const ratingsPerPage = 10

    const ratings = await prisma.rating.findMany({
      skip: (page - 1) * ratingsPerPage,
      take: 10,
      include: {
        user: includeUser,
        book: includeBook && {
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
        created_at: 'desc',
      },
    })

    let parsedRatings:
      | Rating[]
      | RatingWithBook[]
      | RatingWithUser[]
      | RatingWithBookAndUser[] = []

    if (includeBook && includeUser)
      parsedRatings = ratingWithBookAndUserSchema.array().parse(ratings)
    else if (includeBook)
      parsedRatings = ratingWithBookSchema.array().parse(ratings)
    else if (includeUser)
      parsedRatings = ratingWithUserSchema.array().parse(ratings)
    else parsedRatings = ratingSchema.array().parse(ratings)

    return Response.json({ ratings: parsedRatings } as RatingsResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

const requestBodySchema = z.object({
  rating: ratingSchema.omit({ id: true, created_at: true }),
})

export type PostRating = z.infer<typeof requestBodySchema>

export async function POST(request: Request) {
  try {
    const parsedBody = requestBodySchema.safeParse(await request.json())

    if (!parsedBody.success)
      return Response.json({ error: parsedBody.error }, { status: 400 })

    const createdRate = await prisma.rating.create({
      data: parsedBody.data.rating,
    })

    const parsedCreatedRate = ratingSchema.parse(createdRate)

    return Response.json({ rating: parsedCreatedRate } as RatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
