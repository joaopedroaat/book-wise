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
    const parsedBody = ratingPostRequestBody.safeParse(await request.json())

    if (!parsedBody.success)
      return Response.json({ error: parsedBody.error }, { status: 400 })

    let { rating } = parsedBody.data

    const existingRate = await prisma.rating.findFirst({
      where: {
        bookId: rating.bookId,
        userId: rating.userId,
      },
    })

    rating = existingRate
      ? await prisma.rating.update({
          data: rating,
          where: {
            id: existingRate.id,
          },
        })
      : await prisma.rating.create({
          data: rating,
        })

    rating = ratingSchema.parse(rating)

    return Response.json({ rating } as RatingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
