import { prisma } from '@/lib/prisma'
import {
  ratingWithBookSchema,
  userRatingsResponseSchema,
} from '@/services/BookWiseService/schemas'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id

    const userRatings = await prisma.rating.findMany({
      where: { userId },
      include: { book: true },
    })

    const parsedUserRatings = ratingWithBookSchema.array().parse(userRatings)
    const response = userRatingsResponseSchema.parse({
      ratings: parsedUserRatings,
    })

    return Response.json(response)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
