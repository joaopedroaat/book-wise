'use server'

import { prisma } from '@/lib/prisma'

import { revalidatePath } from 'next/cache'

export async function deleteRating(id: string) {
  const rating = await prisma.rating.delete({
    where: { id },
  })

  revalidatePath('/ratings')

  return rating
}
