'use client'

import { SignOut, SignIn } from '@phosphor-icons/react'
import Link from 'next/link'
import Image from 'next/image'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import './styles.css'

interface AuthenticationFooterProps {
  session: Session | null
}

export function AuthenticationFooter({ session }: AuthenticationFooterProps) {
  const isAuthenticated = !!session
  const basePath = usePathname()

  function handleLogout() {
    signOut({ callbackUrl: basePath })
  }

  return (
    <div className="authentication-footer-container">
      {isAuthenticated && (
        <div className="authenticated-options">
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
      )}
      {!isAuthenticated && (
        <button className="unauthenticated-options">
          Fazer login
          <SignIn size={24} />
        </button>
      )}
    </div>
  )
}
