'use client'

import { Avatar } from '@/components/Avatar'
import { SignOut } from '@phosphor-icons/react'
import { User } from 'next-auth'
import { signOut as logout } from 'next-auth/react'

type SignOutFormProps = {
  user: User
}

export function SignOutForm({ user }: SignOutFormProps) {
  return (
    <div className="text-sm flex items-center md:flex-col lg:flex-row justify-center gap-3">
      <Avatar user={user} size={32} />
      <span className="hidden md:block text-center">{user.name}</span>
      <button onClick={() => logout()}>
        <SignOut className="text-red-100" size="1.5em" />
      </button>
    </div>
  )
}
