'use client'

import { SignOut } from '@phosphor-icons/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './styles.css'

interface ProfileProps {
  session: Session
}

export function Profile({ session }: ProfileProps) {
  const basePath = usePathname()

  function handleLogout() {
    signOut({ callbackUrl: basePath })
  }

  return (
    <div className="profile-container">
      <Link href="/book-wise/profile">
        <Image
          src={session.user?.image || ''}
          width={32}
          height={32}
          alt={`${session.user?.name} profile picture.`}
        />
        <span>{session.user?.name}</span>
      </Link>
      <button onClick={handleLogout}>
        <SignOut size={24} />
      </button>
    </div>
  )
}
