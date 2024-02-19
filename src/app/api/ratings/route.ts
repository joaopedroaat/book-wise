import { prisma } from '@/lib/prisma'
import {
  RatingResponse,
  ratingPostRequestBody,
  ratingSchema,
} from './rating.schema'

export async function GET() {
  try {
    const ratings = ratingSchema.array().parse(await prisma.rating.findMany())

    return Response.json({ ratings } as RatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { rating: newRating } = ratingPostRequestBody.parse(
      await request.json(),
    )

    let ratingData = await prisma.rating.findFirst({
      where: {
        bookId: newRating.bookId,
        userId: newRating.userId,
      },
    })

    ratingData = ratingData
      ? await prisma.rating.update({
          data: newRating,
          where: {
            id: ratingData.id,
          },
        })
      : await prisma.rating.create({
          data: newRating,
        })

    const rating = ratingSchema.parse(ratingData)

    return Response.json({ rating } as RatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
