import { prisma } from '@/lib/prisma'
import { UserStats, UserStatsResponse } from '@/services/BookWiseService/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id

    const userRatings = await prisma.rating.findMany({
      where: { userId },
      include: {
        book: { include: { categories: { include: { category: true } } } },
      },
    })

    const categoriesCount = userRatings
      .flatMap((rating) =>
        rating.book.categories.map(
          (categoriesOnBook) => categoriesOnBook.category.name,
        ),
      )
      .reduce(
        (acc, category) => {
          acc[category] = (acc[category] || 0) + 1
          return acc
        },
        {} as { [key: string]: number },
      )

    const stats = {
      totalBooksReviewed: userRatings.length,
      totalAuthorsReviewed: Array.from(
        new Set(userRatings.map((rating) => rating.book.name)),
      ).length,
      mostReviewedCategories: Object.keys(categoriesCount).reduce(
        (acc, category) => {
          if (
            !acc.length ||
            categoriesCount[category] > categoriesCount[acc[0]]
          )
            return [category]
          else if (categoriesCount[category] === categoriesCount[acc[0]])
            return [...acc, category]

          return acc
        },
        [] as string[],
      ),
    } as UserStats

    return Response.json({ stats } as UserStatsResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
