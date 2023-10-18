import { prisma } from '@/lib/prisma'
import { Book } from '@prisma/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, Number(searchParams.get('page')))
  const category = searchParams.get('category')
  const includeRatings = searchParams.get('includeRatings') === 'true'
  const includeCategories = searchParams.get('includeCategories') === 'true'

  const booksPerPage = 10

  let books: Book[] = []

  books = await prisma.book.findMany({
    skip: (page - 1) * booksPerPage,
    take: booksPerPage,
    where: category
      ? {
          categories: {
            some: {
              category: {
                name: category,
              },
            },
          },
        }
      : undefined,
    include: {
      ratings: includeRatings,
      categories: includeCategories,
    },
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
  })

  return Response.json({ books })
}
