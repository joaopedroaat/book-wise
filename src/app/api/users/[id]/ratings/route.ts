import { prisma } from '@/lib/prisma'
import { ratingWithBookSchema } from '@/services/BookWiseService/schemas'
import { UserRatingsResponse } from '@/services/BookWiseService/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const userRatings = await prisma.rating.findMany({
      where: { userId: id },
      include: {
        book: true,
      },
    })

    const parsedUserRatings = ratingWithBookSchema.array().parse(userRatings)

    return Response.json({ ratings: parsedUserRatings } as UserRatingsResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
