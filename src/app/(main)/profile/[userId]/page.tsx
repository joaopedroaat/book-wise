import { ProfileAvatar } from './components/ProfileAvatar'
import { RatingList } from './components/RatingList'
import { StatsList } from './components/StatsList'
import { GetUserResponse } from '@/app/api/users/[id]/route'
import { prisma } from '@/lib/prisma'

async function fetchUserData(userId: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    include: {
      ratings: {
        include: {
          book: true,
        },
      },
    },
  })

  const ratings = await prisma.rating.findMany({
    where: { userId },
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

  const stats = {
    totalReviewedBooks: ratings.length,
    totalReviewedAuthors: ratings.reduce(
      (total, rating) => (rating.book.author ? total + 1 : total),
      0,
    ),
    mostReviewedCategory: mostRepeatedCategory,
  } as GetUserResponse['stats']

  return { user, stats }
}

export default async function Profile({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const userData = await fetchUserData(userId)

  if (!userData) return <p>Failed to fetch user data</p>

  const { user, stats } = userData

  return (
    <div className="flex flex-col-reverse justify-between lg:flex-row gap-16">
      <section className="flex flex-col gap-6 flex-grow">
        <RatingList ratings={user.ratings} />
      </section>
      <aside className="flex flex-col items-center gap-16 basis-80 lg:border-l border-gray-700 px-14">
        <ProfileAvatar user={user} />
        <StatsList stats={stats} />
      </aside>
    </div>
  )
}
