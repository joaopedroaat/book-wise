import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export type GetCategoriesResponse = {
  categories: string[]
}

export async function GET(request: Request) {
  try {
    const { bookId } = z
      .object({
        bookId: z.string().optional(),
      })
      .parse(Object.fromEntries(new URL(request.url).searchParams))

    let categories, data

    if (bookId) {
      data = await prisma.categoriesOnBooks.findMany({
        where: {
          bookId,
        },
        include: {
          category: true,
        },
      })
      categories = data.map((c) => c.category.name)
    } else {
      data = await prisma.category.findMany()
      categories = data.map((c) => c.name)
    }

    return Response.json({
      categories,
    } as GetCategoriesResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
