import { BookWiseService } from '@/services/BookWiseService'
import { ProfileAvatar } from './components/ProfileAvatar'
import { RatingList } from './components/RatingList'
import { StatsList } from './components/StatsList'

type ProfileProps = {
  params: {
    userId: string
  }
}

export default async function Profile({ params: { userId } }: ProfileProps) {
  const bookWiseService = new BookWiseService()
  const userProfile = await bookWiseService.getUserProfile(userId)
  const userRatings = await bookWiseService.getUserRatings(userId)

  return (
    <div className="flex flex-col-reverse justify-between lg:flex-row gap-16">
      <section className="flex flex-col gap-6 flex-grow">
        <RatingList ratings={userRatings} />
      </section>
      <aside className="flex flex-col items-center gap-16 basis-80 lg:border-l border-gray-700 px-14">
        <ProfileAvatar user={userProfile.user} />
        <StatsList stats={userProfile.stats} />
      </aside>
    </div>
  )
}
