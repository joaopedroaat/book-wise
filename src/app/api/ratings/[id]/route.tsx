import { prisma } from '@/lib/prisma'
import { RatingResponse, ratingSchema } from '../rating.schema'

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

    const ratingData = await prisma.rating.delete({ where: { id } })

    if (!ratingData)
      return Response.json(
        { error: `Rating with id "${id}" does not exist.` },
        { status: 404 },
      )

    const rating = ratingSchema.parse(ratingData)
    return Response.json({ rating } as RatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
