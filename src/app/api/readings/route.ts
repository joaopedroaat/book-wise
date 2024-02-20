import { prisma } from '@/lib/prisma'
import {
  ReadingResponse,
  postReadingRequestBodySchema,
  readingSchema,
} from './reading.schema'
import { z } from 'zod'

const searchParamsSchema = z.object({
  book: z.preprocess((val) => val === 'true', z.boolean()),
})

export async function GET(request: Request) {
  try {
    const { book: includeBook } = searchParamsSchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    )

    const a = await prisma.reading.findMany({
      include: {
        book: includeBook,
      },
    })

    const readings = readingSchema.array().parse(
      await prisma.reading.findMany({
        include: {
          book: includeBook,
        },
      }),
    )

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
      userId,
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
