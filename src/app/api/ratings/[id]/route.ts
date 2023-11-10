import { prisma } from '@/lib/prisma'
import {
  ratingPutRequestBodySchema,
  ratingSchema,
} from '@/services/BookWiseService/schemas'
import { RatingResponse } from '@/services/BookWiseService/types'

export async function PUT(
  request: Response,
  { params }: { params: { id: string } },
) {
  const id = params.id

  try {
    const parsedBody = ratingPutRequestBodySchema.safeParse(
      await request.json(),
    )

    if (!parsedBody.success)
      return Response.json({ error: parsedBody.error }, { status: 400 })

    const { rating } = parsedBody.data

    const updatedRating = await prisma.rating.update({
      data: rating,
      where: {
        id,
      },
    })

    const parsedUpdatedRating = ratingSchema.parse(updatedRating)

    return Response.json({ rating: parsedUpdatedRating } as RatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
