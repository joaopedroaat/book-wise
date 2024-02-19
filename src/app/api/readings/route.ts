import { prisma } from '@/lib/prisma'
import {
  ReadingResponse,
  postReadingRequestBodySchema,
  readingSchema,
} from './reading.schema'

export async function GET() {
  try {
    const readings = readingSchema
      .array()
      .parse(await prisma.reading.findMany())

    return Response.json({ readings } as ReadingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const requestBody = postReadingRequestBodySchema.parse(await request.json())

  const { userId, bookId } = requestBody

  let readingData = await prisma.reading.findFirst({
    where: {
      bookId,
    },
  })

  readingData = readingData
    ? await prisma.reading.update({
        data: { createdAt: new Date() },
        where: { id: readingData.id },
      })
    : await prisma.reading.create({
        data: {
          userId,
          bookId,
        },
      })

  const reading = readingSchema.parse(readingData)

  return Response.json({ reading } as ReadingResponse)
}
