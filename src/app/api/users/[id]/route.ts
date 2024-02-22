import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { UserResponse } from './types'

const searchParamsSchema = z.object({
  ratings: z.preprocess((val) => val === 'true', z.boolean()).optional(),
  stats: z.preprocess((val) => val === 'true', z.boolean()).optional(),
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const { stats: includeStats, ratings: includeRatings } =
      searchParamsSchema.parse(
        Object.fromEntries(new URL(request.url).searchParams),
      )

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        ratings: includeRatings ? { include: { book: true } } : undefined,
      },
    })

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
      } as UserResponse['stats']
    }

    return Response.json({ user, stats } as UserResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
