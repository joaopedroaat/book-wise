import { prisma } from '@/lib/prisma'
import {
  ReadingResponse,
  postReadingRequestBodySchema,
  readingSchema,
} from './reading.schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id

    const readings = readingSchema.array().parse(
      await prisma.reading.findMany({
        where: {
          userId,
        },
        // include: {
        //   book: true,
        // },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    )

    return Response.json({ readings } as ReadingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const userId = params.id

  const parsedRequestBody = postReadingRequestBodySchema.safeParse(
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
