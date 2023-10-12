'use client'

import bookWiseLogo from '@/assets/book-wise-logo.svg'
import {
  Binoculars,
  ChartLineUp,
  SignIn,
  SignOut,
  User,
} from '@phosphor-icons/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import './styles.css'

interface NavigationMenuProps {
  session: Session | null
}

type Pages = 'home' | 'explore' | 'profile'

export function NavigationMenu({ session }: NavigationMenuProps) {
  const [currentPage, setCurrentPage] = useState<Pages>('home')

  const isAuthenticated = !!session?.user

  const pathName = usePathname()

  function handleChangePage(page: Pages) {
    if (currentPage !== page) setCurrentPage(page)
  }

  function handleLogout() {
    signOut({ callbackUrl: pathName })
  }

  return (
    <div className="navigation-menu-container">
      <header>
        <Link href="/book-wise/home">
          <Image
            src={bookWiseLogo}
            width={128}
            height={32}
            alt="BookWise logo."
          />
        </Link>
      </header>
      <main>
        <nav>
          <Link
            href="/book-wise/home"
            className={currentPage === 'home' ? 'active' : ''}
            onClick={() => handleChangePage('home')}
          >
            <ChartLineUp size={24} />
            Início
          </Link>
          <Link
            href="/book-wise/explore"
            className={currentPage === 'explore' ? 'active' : ''}
            onClick={() => handleChangePage('explore')}
          >
            <Binoculars size={24} />
            Explorar
          </Link>
          {isAuthenticated && (
            <Link
              href="/book-wise/profile"
              className={currentPage === 'profile' ? 'active' : ''}
              onClick={() => handleChangePage('profile')}
            >
              <User size={24} />
              Perfil
            </Link>
          )}
        </nav>
      </main>
      <footer>
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
      </footer>
    </div>
  )
}
