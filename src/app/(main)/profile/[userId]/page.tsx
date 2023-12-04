import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { BookWiseService } from '@/services/BookWiseService'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr/CaretLeft'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { ProfileAvatar } from './components/ProfileAvatar'
import { ProfileRatingList } from './components/ProfileRatingList'
import { StatsList } from './components/StatsList'

type ProfileProps = {
  params: {
    userId: string
  }
}

export default async function Profile({ params: { userId } }: ProfileProps) {
  const session = await getServerSession(authOptions)
  const userProfile = await BookWiseService.getUserProfile(userId)
  const userRatings = await BookWiseService.getUserRatings(userId)

  const isUserProfile = !!session && session.user.id === userId

  return (
    <div className="flex flex-col-reverse justify-between lg:flex-row gap-16">
      <section className="flex-grow">
        {!isUserProfile && (
          <Link className="flex items-center gap-3 mb-10 font-bold" href="">
            <CaretLeft size="1.2rem" weight="bold" /> Voltar
          </Link>
        )}
        <ProfileRatingList ratings={userRatings} />
        {!userRatings.length && <p>Nenhuma avaliação</p>}
      </section>
      <aside className="flex flex-col items-center gap-16 basis-80 lg:border-l border-gray-700 px-14">
        <ProfileAvatar user={userProfile.user} />
        <StatsList stats={userProfile.stats} />
      </aside>
    </div>
  )
}
