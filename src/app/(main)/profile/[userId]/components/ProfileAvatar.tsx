import { Avatar } from '@/components/Avatar'
import { User } from '@prisma/client'

export function ProfileAvatar({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center">
      <Avatar user={user} size={72} border />
      <strong className="mt-5 text-center mb-1">{user.name}</strong>
      <small className="text-gray-400">
        {new Date(user.createdAt).toISOString()}
      </small>
    </div>
  )
}
