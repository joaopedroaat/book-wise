import { prisma } from '@/lib/prisma'
import { ratingSchema } from '@/services/BookWiseService/schemas'
import { SingleRatingResponse } from '@/services/BookWiseService/types'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    if (!id)
      return Response.json(
        { error: "Url param 'id' not provided." },
        { status: 400 },
      )

    const rating = await prisma.rating.findUnique({ where: { id } })

    if (!rating)
      return Response.json({ error: `Rating with id "${id}" does not exist.` })

    const deletedRating = await prisma.rating.delete({ where: { id } })
    const parsedRating = ratingSchema.parse(deletedRating)

    return Response.json({ rating: parsedRating } as SingleRatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
