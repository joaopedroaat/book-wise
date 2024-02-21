import { prisma } from '@/lib/prisma'
import { CategoryResponse, categorySchema } from './category.schema'
import { z } from 'zod'

const searchParamsSchema = z.object({
  bookId: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const { bookId } = searchParamsSchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    )

    const categories = categorySchema.array().parse(
      await prisma.category.findMany({
        where: {
          books: {
            every: {
              bookId,
            },
          },
        },
      }),
    )

    return Response.json({ categories } as CategoryResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
