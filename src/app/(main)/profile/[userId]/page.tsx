import { ProfileAvatar } from './components/ProfileAvatar'
import { RatingList } from './components/RatingList'
import { StatsList } from './components/StatsList'
import { Book, Rating, User } from '@prisma/client'
import { appApi } from '@/lib/axios'
import { GetUserResponse } from '@/app/api/users/[id]/route'

async function fetchUserData(userId: string) {
  const { status, data } = await appApi.get<GetUserResponse>(
    `/users/${userId}`,
    {
      params: {
        ratings: true,
        stats: true,
      },
    },
  )

  if (status !== 200) return

  return data as {
    user: User & { ratings: (Rating & { book: Book })[] }
    stats: NonNullable<GetUserResponse['stats']>
  }
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
