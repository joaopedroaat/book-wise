import { prisma } from '@/lib/prisma'
import { UserProfile, UserProfileResponse } from './profile.schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        ratings: {
          include: {
            book: {
              include: {
                categories: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!user)
      return Response.json({ error: 'User not found' }, { status: 404 })

    const categoriesCount = user.ratings
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

    const profile = {
      user: {
        ...user,
        createdAt: user.createdAt.toISOString(),
      },

      stats: {
        totalBooksReviewed: user.ratings.length,
        totalAuthorsReviewed: Array.from(
          new Set(user.ratings.map((rating) => rating.book.name)),
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
      },
    } as UserProfile

    return Response.json({ profile } as UserProfileResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
