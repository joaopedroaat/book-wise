import { prisma } from '@/lib/prisma'
import { Rating } from '@prisma/client'

export type DeleteRatingResponse = {
  rating: Rating
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const rating = await prisma.rating.delete({ where: { id } })

    return Response.json({ rating } as DeleteRatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
