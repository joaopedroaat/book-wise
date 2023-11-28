import { prisma } from '@/lib/prisma'
import { AverageRatingResponse } from '@/services/BookWiseService/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const ratings = await prisma.rating.findMany({ where: { bookId: id } })
    const averageRating =
      ratings.reduce((acc, rating) => rating.rate + acc, 0) / ratings.length

    return Response.json({ average: averageRating } as AverageRatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
