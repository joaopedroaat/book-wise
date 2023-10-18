import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Math.abs(Number(searchParams.get('page'))) || 1
  const includeRatings = searchParams.get('includeRatings') === 'true'
  const includeCategories = searchParams.get('includeCategories') === 'true'

  const booksPerPage = 10

  const popularBooks = await prisma.book.findMany({
    skip: (page - 1) * booksPerPage,
    take: booksPerPage,
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

  return Response.json({ books: popularBooks })
}
