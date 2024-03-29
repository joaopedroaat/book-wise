'use server'

import { authOptions } from '@/lib/next-auth/authOptions'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function upsertReading(bookId: string) {
  const session = await getServerSession(authOptions)

  if (!session) return

  const { user } = session

  let reading = await prisma.reading.findFirst({
    where: {
      userId: user.id,
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
        userId: user.id,
        bookId,
      },
    })
}
