import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export type GetUserResponse = {
  user: User
  stats: {
    totalReviewedBooks: number
    totalReviewedAuthors: number
    mostReviewedCategory: string
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
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

  const categories = user.ratings.flatMap((r) =>
    r.book.categories.map((c) => c.category.name),
  )

  const mostRepeatedCategory = Object.entries(
    categories.reduce((acc: { [key: string]: number }, category: string) => {
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {}),
  ).reduce(
    (max, [category, count]) => (count > max[1] ? [category, count] : max),
    ['', 0],
  )[0]

  const stats = {
    totalReviewedBooks: user.ratings.length,
    totalReviewedAuthors: user.ratings.reduce(
      (total, rating) => (rating.book.author ? total + 1 : total),
      0,
    ),
    mostReviewedCategory: mostRepeatedCategory,
  }

  return Response.json({ user, stats } as GetUserResponse)
}
