import { prisma } from '@/lib/prisma'
import { Book, Reading } from '@prisma/client'
import { z } from 'zod'

export type GetReadingResponse = {
  latestReading?: Reading | (Reading & { book: Book })
  readings?: Reading[] | (Reading & { book: Book })[]
}

export async function GET(request: Request) {
  try {
    const {
      userId,
      book: includeBook,
      latest: latestReadingOnly,
    } = z
      .object({
        userId: z.string().optional(),
        book: z.preprocess((val) => val === 'true', z.boolean()),
        latest: z.preprocess((val) => val === 'true', z.boolean()),
      })
      .parse(Object.fromEntries(new URL(request.url).searchParams))

    let latestReading, readings
    if (latestReadingOnly) {
      latestReading = await prisma.reading.findFirst({
        where: {
          userId,
        },
        include: {
          book: includeBook,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else {
      readings = await prisma.reading.findMany({
        where: {
          userId,
        },
        include: {
          book: includeBook,
        },
      })
    }

    return Response.json({
      latestReading,
      readings,
    } as GetReadingResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

export type PostReadingResponse = {
  reading: Reading
}

export async function POST(request: Request) {
  const { userId, bookId } = z
    .object({
      userId: z.string(),
      bookId: z.string(),
    })
    .parse(await request.json())

  let reading = await prisma.reading.findFirst({
    where: {
      userId,
      bookId,
    },
  })

  if (reading)
    reading = await prisma.reading.update({
      data: { createdAt: new Date() },
      where: { id: reading.id },
    })
  else
    reading = await prisma.reading.create({
      data: {
        userId,
        bookId,
      },
    })

  return Response.json({ reading } as PostReadingResponse)
}
