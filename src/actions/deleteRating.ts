'use server'

import { prisma } from '@/lib/prisma'

export async function deleteRating(id: string) {
  const rating = await prisma.rating.delete({
    where: { id },
  })

  return rating
}
