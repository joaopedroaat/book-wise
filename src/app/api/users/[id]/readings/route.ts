import { prisma } from '@/lib/prisma'
import {
  postReadingSchema,
  readingSchema,
  readingWithBookSchema,
} from '@/services/BookWiseService/schemas'
import {
  ReadingsResponse,
  SingleReadingResponse,
} from '@/services/BookWiseService/types'

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

    const readings = readingWithBookSchema.array().parse(recentReadings)

    return Response.json({ readings } as ReadingsResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const userId = params.id

  const parsedRequestBody = postReadingSchema.safeParse(await request.json())

  if (!parsedRequestBody.success)
    return Response.json({ error: parsedRequestBody.error }, { status: 400 })

  const { bookId } = parsedRequestBody.data

  const existingReading = await prisma.reading.findFirst({
    where: {
      bookId,
      userId,
    },
  })

  const reading = existingReading
    ? await prisma.reading.update({
        data: { createdAt: new Date() },
        where: { id: existingReading.id },
      })
    : await prisma.reading.create({
        data: {
          userId,
          bookId,
        },
      })

  const parsedReading = readingSchema.parse(reading)

  return Response.json({ reading: parsedReading } as SingleReadingResponse)
}
