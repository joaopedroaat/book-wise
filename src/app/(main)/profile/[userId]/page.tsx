import { ProfileAvatar } from './components/ProfileAvatar'
import { RatingList } from './components/RatingList'
import { StatsList } from './components/StatsList'
import axios from 'axios'
import { User, UserResponse } from '@/app/api/users/[id]/users.schema'
import { Rating } from '@/app/api/ratings/rating.schema'

type ProfileProps = {
  params: {
    userId: string
  }
}

async function fetchUserData(userId: string) {
  const { data } = await axios.get<UserResponse>(`/users/${userId}`)

  const user = data.user as User & { stats: NonNullable<User['stats']> }
  const ratings = data.ratings as (Rating & {
    book: NonNullable<Rating['book']>
  })[]

  return { user, ratings }
}

export default async function Profile({ params: { userId } }: ProfileProps) {
  const { user, ratings } = await fetchUserData(userId)

  return (
    <div className="flex flex-col-reverse justify-between lg:flex-row gap-16">
      <section className="flex flex-col gap-6 flex-grow">
        <RatingList ratings={ratings} />
      </section>
      <aside className="flex flex-col items-center gap-16 basis-80 lg:border-l border-gray-700 px-14">
        <ProfileAvatar user={user} />
        <StatsList stats={user.stats} />
      </aside>
    </div>
  )
}
