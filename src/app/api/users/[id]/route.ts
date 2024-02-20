import { prisma } from '@/lib/prisma'
import { UserStats, UserResponse, userSchema } from './users.schema'
import { z } from 'zod'

const searchParamsSchema = z.object({
  stats: z.preprocess((val) => val === 'true', z.boolean()),
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const { stats: includeStats } = searchParamsSchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    )

    const user = userSchema.parse(
      await prisma.user.findUnique({ where: { id } }),
    )

    let stats
    if (includeStats) {
      const ratings = await prisma.rating.findMany({
        where: { userId: id },
        select: {
          book: {
            select: {
              author: true,
              categories: {
                select: {
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      const categoriesName = ratings.flatMap((rating) =>
        rating.book.categories.map((categories) => categories.category.name),
      )

      const mostRepeatedCategory = Object.entries(
        categoriesName.reduce(
          (acc: { [key: string]: number }, category: string) => {
            acc[category] = (acc[category] || 0) + 1
            return acc
          },
          {},
        ),
      ).reduce(
        (max, [category, count]) => (count > max[1] ? [category, count] : max),
        ['', 0],
      )[0]

      stats = {
        totalReviewedBooks: ratings.length,
        totalReviewedAuthors: ratings.reduce(
          (total, rating) => (rating.book.author ? total + 1 : total),
          0,
        ),
        mostReviewedCategory: mostRepeatedCategory,
      } as UserStats
    }

    user.stats = stats

    return Response.json({ user } as UserResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
