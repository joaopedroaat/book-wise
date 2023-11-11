import { prisma } from '@/lib/prisma'
import { ReadingsResponse } from '@/services/BookWiseService/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const recentReadings = await prisma.reading.findMany({
      where: {
        userId: id,
      },
      include: {
        book: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const books = recentReadings.map((readings) => readings.book)

    return Response.json({ books } as ReadingsResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
