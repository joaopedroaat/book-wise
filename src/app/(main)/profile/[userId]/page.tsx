import { BookWiseService } from '@/services/BookWiseService'
import { ProfileAvatar } from './components/ProfileAvatar'
import { RatingList } from './components/RatingList'
import { ReadingList } from './components/ReadingList'
import { StatsList } from './components/StatsList'

type ProfileProps = {
  params: {
    userId: string
  }
}

export default async function Profile({ params: { userId } }: ProfileProps) {
  const userProfile = await BookWiseService.getUserProfile(userId)
  const userRatings = await BookWiseService.getUserRatings(userId)
  const userReadings = await BookWiseService.getUserReadings(userId)

  return (
    <div className="flex flex-col-reverse justify-between lg:flex-row gap-16">
      <section className="flex flex-col gap-6 flex-grow">
        <ReadingList readings={userReadings} />
        <RatingList ratings={userRatings} />
      </section>
      <aside className="flex flex-col items-center gap-16 basis-80 lg:border-l border-gray-700 px-14">
        <ProfileAvatar user={userProfile.user} />
        <StatsList stats={userProfile.stats} />
      </aside>
    </div>
  )
}
