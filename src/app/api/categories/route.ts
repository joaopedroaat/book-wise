import { prisma } from '@/lib/prisma'
import { Category } from '@prisma/client'
import { z } from 'zod'

export type GetCategoriesResponse = {
  categories: Category[]
}

export async function GET(request: Request) {
  try {
    const { bookId } = z
      .object({
        bookId: z.string().optional(),
      })
      .parse(Object.fromEntries(new URL(request.url).searchParams))

    const categories = await prisma.category.findMany({
      where: {
        books: {
          every: {
            bookId,
          },
        },
      },
    })

    return Response.json({ categories } as GetCategoriesResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
