import { prisma } from '@/lib/prisma'

export type BookRateResponse = {
  rate: number
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const bookId = params.id
    const aggregation = await prisma.rating.aggregate({
      where: {
        bookId,
      },
      _avg: {
        rate: true,
      },
    })

    return Response.json({
      rate: aggregation._avg.rate || 0,
    } as BookRateResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
