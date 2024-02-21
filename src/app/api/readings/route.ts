import { prisma } from '@/lib/prisma'
import {
  ReadingResponse,
  postReadingRequestBodySchema,
  readingSchema,
} from './reading.schema'
import { z } from 'zod'

const searchParamsSchema = z.object({
  userId: z
    .string()
    .nullish()
    .transform((val) => val || undefined),
  book: z.preprocess((val) => val === 'true', z.boolean()),
})

export async function GET(request: Request) {
  try {
    const { userId, book: includeBook } = searchParamsSchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    )

    const readings = readingSchema.array().parse(
      await prisma.reading.findMany({
        where: {
          userId,
        },
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
