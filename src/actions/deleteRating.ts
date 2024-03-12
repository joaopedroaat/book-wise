'use server'

import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'

export async function deleteRating(id: string) {
  const rating = await prisma.rating.delete({
    where: { id },
  })

  revalidateTag('ratings')

  return rating
}
