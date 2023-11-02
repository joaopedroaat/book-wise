import { ProfilePicture } from '@/components/ProfilePicture'
import { SignOut } from '@phosphor-icons/react'
import { User } from 'next-auth'
import { signOut as logout } from 'next-auth/react'

interface SignOutFormProps {
  user: User
}

export function SignOutForm({ user }: SignOutFormProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <ProfilePicture user={user} width={32} height={32} />
      <span className="hidden xl:flex text-center">{user.name}</span>
      <button onClick={() => logout()}>
        <SignOut className="text-red-100" size={20} />
      </button>
    </div>
  )
}
