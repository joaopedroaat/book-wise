import { prisma } from '@/lib/prisma'
import { categorySchema } from '@/services/BookWiseService/schemas'
import { CategoryResponse } from '@/services/BookWiseService/types'

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    const parsedCategories = categories.map((category) =>
      categorySchema.parse(category),
    )

    return Response.json({ categories: parsedCategories } as CategoryResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
