import { User } from '@/app/api/users/[id]/users.schema'
import { Avatar } from '@/components/Avatar'

export function ProfileAvatar({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center">
      <Avatar user={user} size={72} border />
      <strong className="mt-5">{user.name}</strong>
      <small className="text-gray-400">{user.createdAt}</small>
    </div>
  )
}
