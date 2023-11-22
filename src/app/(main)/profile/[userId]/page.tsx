import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Avatar } from '@/components/Avatar'
import { BookWiseService } from '@/services/BookWiseService'
import { getServerSession } from 'next-auth'

type ProfileProps = {
  params: {
    userId: string
  }
}

export default async function Profile({ params: { userId } }: ProfileProps) {
  const session = await getServerSession(authOptions)
  const user = await BookWiseService.getUser(userId)
  const stats = await BookWiseService.getUserStats(userId)

  const isUserProfile = !!session && session.user.id === userId

  return (
    <>
      <div>Profile</div>
      <aside>
        <div className="flex flex-col items-center">
          <Avatar user={user} size={72} border />
          <strong className="mt-5">{user.name}</strong>
          <small className="text-gray-400">{user.createdAt}</small>
        </div>
      </aside>
    </>
  )
}
