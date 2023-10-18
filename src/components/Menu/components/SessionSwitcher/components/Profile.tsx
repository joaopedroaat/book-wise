'use client'

import { SignOut } from '@phosphor-icons/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ProfileProps {
  session: Session
}

export function Profile({ session }: ProfileProps) {
  const basePath = usePathname()

  function handleLogout() {
    signOut({ callbackUrl: basePath })
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        className="text-gray-200 no-underline flex items-center gap-3"
        href="/book-wise/profile"
      >
        <Image
          className="rounded-full"
          src={session.user?.image || ''}
          width={32}
          height={32}
          alt={`${session.user?.name} profile picture.`}
        />
        <span>{session.user?.name}</span>
      </Link>
      <button
        className="bg-transparent border-none text-red-100 cursor-pointer"
        onClick={handleLogout}
      >
        <SignOut size={24} />
      </button>
    </div>
  )
}
