import { SignOut } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'

interface SignOutFormProps {
  user: {
    id: string
    name?: string | null
    avatarUrl?: string | null
  }
}

export function SignOutForm({ user }: SignOutFormProps) {
  return (
    <div
      className="flex items-center justify-center gap-3"
      onClick={() => signOut()}
    >
      <span>{user.name}</span>
      <SignOut className="text-red-100" size={20} />
    </div>
  )
}
