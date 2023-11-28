import { prisma } from '@/lib/prisma'
import { ratingWithUserSchema } from '@/services/BookWiseService/schemas'
import { RatingsResponse } from '@/services/BookWiseService/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const ratings = await prisma.rating.findMany({
      where: {
        bookId: id,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const parsedRatings = ratingWithUserSchema.array().parse(ratings)

    return Response.json({ ratings: parsedRatings } as RatingsResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
