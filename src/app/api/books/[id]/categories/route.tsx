import { prisma } from '@/lib/prisma'
import { categoriesOnBookResponseSchema } from '@/services/BookWiseService/schemas'
import { Category } from '@/services/BookWiseService/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const categoriesOnBook = await prisma.categoriesOnBooks.findMany({
      where: { bookId: id },
      include: {
        category: true,
      },
    })

    const categories = categoriesOnBook.map(
      (categoryOnBook) => categoryOnBook.category as Category,
    )

    const parsedResponse = categoriesOnBookResponseSchema.parse({ categories })

    return Response.json(parsedResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
