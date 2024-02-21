import { prisma } from '@/lib/prisma'
import { BookRateResponse } from '../../book.schema'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const bookId = params.id
    const ratings = await prisma.rating.findMany({
      where: {
        bookId,
      },
    })

    // If book was never rated returns -1
    const rate = ratings.length
      ? ratings.reduce((acc, rating) => rating.rate + acc, 0) / ratings.length
      : -1

    return Response.json({ rate } as BookRateResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
