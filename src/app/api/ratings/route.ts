import { prisma } from '@/lib/prisma'
import {
  ratingWithBookAndUser,
  ratingWithBookSchema,
  ratingWithUserSchema,
} from '@/services/BookWiseService/schemas'
import {
  Rating,
  RatingWithBook,
  RatingWithBookAndUser,
  RatingWithUser,
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

    if (includeBook && includeUser) {
      parsedRatings = ratings.map((rating) =>
        ratingWithBookAndUser.parse(rating),
      )
    } else if (includeBook) {
      parsedRatings = ratings.map((rating) =>
        ratingWithBookSchema.parse(rating),
      )
    } else if (includeUser) {
      parsedRatings = ratings.map((rating) =>
        ratingWithUserSchema.parse(rating),
      )
    }

    return Response.json({ ratings: parsedRatings })
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
