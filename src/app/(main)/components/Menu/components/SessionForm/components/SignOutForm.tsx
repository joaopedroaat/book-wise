import { ProfilePicture } from '@/components/ProfilePicture'
import { SignOut } from '@phosphor-icons/react'
import { User } from 'next-auth'
import { signOut as logout } from 'next-auth/react'

interface SignOutFormProps {
  user: User
}

export function SignOutForm({ user }: SignOutFormProps) {
  return (
    <div className="text-sm flex items-center md:flex-col lg:flex-row justify-center gap-3">
      <ProfilePicture user={user} width={32} height={32} />
      <span className="hidden md:block text-center">{user.name}</span>
      <button onClick={() => logout()}>
        <SignOut className="text-red-100 text-base md:text-lg" />
      </button>
    </div>
  )
}
