'use client'

import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SessionForm } from './components/SessionForm'
import { BookWiseIcon } from '@/components/BookWiseIcon'

export function Menu() {
  const currentPage = usePathname().split('/').pop()

  return (
    <div className="flex justify-between items-center md:flex-col h-full gap-5">
      <Link href="home" className="md:mb-16">
        <BookWiseIcon />
      </Link>
      <nav className="text-sm md:text-base lg:text-lg [&>a>svg]:text-lg [&>a>svg]:md:text-2xl flex md:flex-col md:flex-grow md:gap-4 gap-3 [&>a.active]:border-green-200 [&>a]:border-transparent [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:sm:gap-3 [&>a]:text-gray-400 [&>a]:no-underline hover:[&>a]:text-gray-300  [&>a.active]:text-gray-200">
        <Link href="home" className={`${currentPage === 'home' && 'active'}`}>
          <ChartLineUp />
          Início
        </Link>

        <Link
          href="explore"
          className={`${currentPage === 'explore' && 'active'}`}
        >
          <Binoculars />
          Explorar
        </Link>

        <Link
          href="profile"
          className={`${currentPage === 'profile' && 'active'}`}
        >
          <User />
          Perfil
        </Link>
      </nav>
      <SessionForm />
    </div>
  )
}
