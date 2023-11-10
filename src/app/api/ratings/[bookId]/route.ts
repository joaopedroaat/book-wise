import { prisma } from '@/lib/prisma'
import {
  ratingSchema,
  ratingWithUserSchema,
} from '@/services/BookWiseService/schemas'
import {
  Rating,
  RatingWithUser,
  RatingsResponse,
} from '@/services/BookWiseService/types'
import { z } from 'zod'

const searchParamsSchema = z.object({
  includeUser: z
    .enum(['true', 'false'])
    .nullable()
    .transform((val) => val === 'true'),
})

export async function GET(
  request: Request,
  { params }: { params: { bookId: string } },
) {
  try {
    const bookId = params.bookId

    const { searchParams } = new URL(request.url)

    const validatedSearchParams = searchParamsSchema.safeParse({
      includeUser: searchParams.get('includeUser'),
    })

    if (!validatedSearchParams.success)
      return Response.json(
        { error: validatedSearchParams.error },
        { status: 400 },
      )

    const { includeUser } = validatedSearchParams.data

    const ratings = await prisma.rating.findMany({
      where: {
        book_id: bookId,
      },
      include: {
        user: includeUser,
      },
    })

    let parsedRatings: Rating[] | RatingWithUser[] = []

    if (includeUser) parsedRatings = ratingWithUserSchema.array().parse(ratings)
    else parsedRatings = ratingSchema.array().parse(ratings)

    return Response.json({ ratings: parsedRatings } as RatingsResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}