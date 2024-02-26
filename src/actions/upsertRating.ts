'use server'

import { prisma } from '@/lib/prisma'
import { Rating } from '@prisma/client'

export async function upsertRating(rating: Omit<Rating, 'id' | 'createdAt'>) {
  return await prisma.rating.create({
    data: rating,
  })
}
