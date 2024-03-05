'use server'

import { prisma } from '@/lib/prisma'
import { Rating } from '@prisma/client'

export async function upsertRating(rating: Omit<Rating, 'id' | 'createdAt'>) {
  const existingRating = await prisma.rating.findFirst({
    where: {
      userId: rating.userId,
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

  return newRating
}
