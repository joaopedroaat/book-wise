import { prisma } from '@/lib/prisma'
import { ratingSchema } from '@/services/BookWiseService/schemas'
import { RatingResponse } from '@/services/BookWiseService/types'
import { z } from 'zod'

const requestBodySchema = ratingSchema.omit({
  id: true,
  created_at: true,
  book_id: true,
  user_id: true,
})

export type PutRating = z.infer<typeof requestBodySchema>

export async function PUT(
  request: Response,
  { params }: { params: { id: string } },
) {
  const id = params.id

  try {
    const parsedBody = requestBodySchema.safeParse(await request.json())

    if (!parsedBody.success)
      return Response.json({ error: parsedBody.error }, { status: 400 })

    const { rate, description } = parsedBody.data

    const updatedRating = await prisma.rating.update({
      data: { rate, description },
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
