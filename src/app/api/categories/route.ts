import { prisma } from '@/lib/prisma'
import { CategoryResponse, categorySchema } from './category.schema'

export async function GET() {
  try {
    const categories = categorySchema
      .array()
      .parse(await prisma.category.findMany())

    return Response.json({ categories } as CategoryResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
