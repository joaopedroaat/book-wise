import { prisma } from '@/lib/prisma'
import { readingPostRequestBodySchema } from '@/services/BookWiseService/schemas'
import { ReadingsResponse } from '@/services/BookWiseService/types'
import { Reading } from '@prisma/client'

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

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const userId = params.id

  const parsedRequestBody = readingPostRequestBodySchema.safeParse(
    await request.json(),
  )

  if (!parsedRequestBody.success)
    return Response.json({ error: parsedRequestBody.error }, { status: 400 })

  const { bookId } = parsedRequestBody.data

  const existingReading = await prisma.reading.findFirst({
    where: {
      bookId,
      userId,
    },
  })

  let reading: Reading | null = null

  if (existingReading)
    reading = await prisma.reading.update({
      data: { createdAt: new Date() },
      where: { id: existingReading.id },
    })
  else
    reading = await prisma.reading.create({
      data: {
        userId,
        bookId,
      },
    })

  return Response.json(reading)
}
