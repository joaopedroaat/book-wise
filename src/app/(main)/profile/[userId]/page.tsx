import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { BookWiseService } from '@/services/BookWiseService'
import { getServerSession } from 'next-auth'
import { ProfileAvatar } from './components/ProfileAvatar'
import { StatsList } from './components/StatsList'

type ProfileProps = {
  params: {
    userId: string
  }
}

export default async function Profile({ params: { userId } }: ProfileProps) {
  const session = await getServerSession(authOptions)
  const user = await BookWiseService.getUser(userId)
  const stats = await BookWiseService.getUserStats(userId)
  const userRatings = await BookWiseService.getUserRatings(userId)

  const isUserProfile = !!session && session.user.id === userId

  return (
    <>
      <span>{JSON.stringify(userRatings)}</span>
      <aside className="flex flex-col items-center gap-16">
        <ProfileAvatar user={user} />
        <StatsList stats={stats} />
      </aside>
    </>
  )
}
