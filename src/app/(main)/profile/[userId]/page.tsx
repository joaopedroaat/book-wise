import { appAPi } from '@/api/appApi'
import { ProfileAvatar } from './components/ProfileAvatar'
import { RatingList } from './components/RatingList'
import { StatsList } from './components/StatsList'
import { GetUserResponse } from '@/app/api/users/[id]/route'

async function fetchUserData(userId: string) {
  const response = await fetch(`${appAPi}/users/${userId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch data user data.')
  }

  return (await response.json()) as GetUserResponse
}

export default async function Profile({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const { user, stats } = await fetchUserData(userId)

  return (
    <div className="flex flex-col-reverse justify-between lg:flex-row gap-16">
      <section className="flex flex-col gap-6 flex-grow">
        <RatingList userId={userId} />
      </section>
      <aside className="flex flex-col items-center gap-16 basis-80 lg:border-l border-gray-700 px-14">
        <ProfileAvatar user={user} />
        <StatsList stats={stats} />
      </aside>
    </div>
  )
}
