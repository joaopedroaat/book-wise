import { Avatar } from '@/components/Avatar'
import { User } from '@/services/BookWiseService/types'

type ProfileAvatarProps = {
  user: User
}

export function ProfileAvatar({ user }: ProfileAvatarProps) {
  return (
    <div className="flex flex-col items-center">
      <Avatar user={user} size={72} border />
      <strong className="mt-5">{user.name}</strong>
      <small className="text-gray-400">{user.createdAt}</small>
    </div>
  )
}
