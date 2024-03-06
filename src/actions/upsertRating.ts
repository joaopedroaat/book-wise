'use server'

import { prisma } from '@/lib/prisma'
import { Rating } from '@prisma/client'
import { revalidateTag } from 'next/cache'

export async function upsertRating(rating: Omit<Rating, 'id' | 'createdAt'>) {
  const existingRating = await prisma.rating.findFirst({
    where: {
      userId: rating.userId,
      bookId: rating.bookId,
    },
  })

  let newRating
  if (existingRating) {
    newRating = prisma.rating.update({
      where: {
        id: existingRating.id,
      },
      data: rating,
    })
  } else {
    newRating = prisma.rating.create({
      data: rating,
    })
  }

  revalidateTag('ratings')

  return newRating
}
