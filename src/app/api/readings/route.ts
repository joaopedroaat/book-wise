import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { Book, Reading } from '@prisma/client'

export type GetReadingResponse = {
  reading: Reading & {
    book: Book
  }
}

export async function GET(request: NextRequest) {
  const { userId } = z
    .object({
      userId: z.string(),
    })
    .parse(Object.fromEntries(request.nextUrl.searchParams))

  const reading = await prisma.reading.findFirst({
    where: {
      userId,
    },
    include: {
      book: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return Response.json({ reading } as GetReadingResponse)
}
