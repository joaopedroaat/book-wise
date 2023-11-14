import { prisma } from '@/lib/prisma'
import {
  readingPostRequestBodySchema,
  readingSchema,
  readingWithBookSchema,
} from '@/services/BookWiseService/schemas'
import {
  Reading,
  ReadingResponse,
  ReadingWithBook,
  ReadingsResponse,
} from '@/services/BookWiseService/types'
import { z } from 'zod'

const searchParamsSchema = z.object({
  includeBooks: z
    .enum(['true', 'false'])
    .nullable()
    .transform((val) => val === 'true'),
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const { searchParams } = new URL(request.url)

    const validatedSearchParams = searchParamsSchema.safeParse({
      includeBooks: searchParams.get('includeBooks'),
    })

    if (!validatedSearchParams.success)
      return Response.json(
        { error: validatedSearchParams.error },
        { status: 400 },
      )

    const { includeBooks } = validatedSearchParams.data

    const recentReadings = await prisma.reading.findMany({
      where: {
        userId: id,
      },
      include: {
        book: includeBooks,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    let readings: Reading[] | ReadingWithBook[] = []

    if (includeBooks)
      readings = readingWithBookSchema.array().parse(recentReadings)
    else readings = readingSchema.array().parse(recentReadings)

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

  return Response.json({ reading } as ReadingResponse)
}
