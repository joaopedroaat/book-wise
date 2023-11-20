'use client'

import { BookWiseIcon } from '@/components/BookWiseIcon'
import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SessionForm } from './components/SessionForm'

export function Menu() {
  const path = usePathname()

  const session = useSession()

  const isAuthenticated = session.status === 'authenticated'

  return (
    <div className="flex justify-between items-center md:flex-col h-full gap-5">
      <Link href="/home" className="md:mb-16">
        <BookWiseIcon />
      </Link>
      <nav className="text-sm md:text-base lg:text-lg [&>a>svg]:text-lg [&>a>svg]:md:text-2xl flex md:flex-col md:flex-grow md:gap-4 gap-3 [&>a.active]:border-green-200 [&>a]:border-transparent [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:sm:gap-3 [&>a]:text-gray-400 [&>a]:no-underline hover:[&>a]:text-gray-300  [&>a.active]:text-gray-200">
        <Link href="/home" className={`${path.includes('home') && 'active'}`}>
          <ChartLineUp />
          Início
        </Link>

        <Link
          href="/explore"
          className={`${path.includes('explore') && 'active'}`}
        >
          <Binoculars />
          Explorar
        </Link>

        {isAuthenticated && (
          <Link
            href={`/profile/${session.data.user.id}`}
            className={`${path.includes('profile') && 'active'}`}
          >
            <User />
            Perfil
          </Link>
        )}
      </nav>
      <SessionForm />
    </div>
  )
}
