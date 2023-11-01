'use client'

import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import Link from 'next/link'
import { BookWiseIcon } from './BookWiseIcon'
import { usePathname } from 'next/navigation'

export function Menu() {
  const currentPage = usePathname().split('/').pop()

  return (
    <div className="flex justify-between items-center md:flex-col">
      <nav className="flex md:flex-col md:gap-4 gap-3 text-sm md:text-lg [&>a:first-child]:mb-16 [&>a.active]:border-green-200 [&>a]:border-transparent [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:sm:gap-3 [&>a]:md:text-lg [&>a]:text-gray-400 [&>a]:no-underline hover:[&>a]:text-gray-300  [&>a.active]:text-gray-200 ">
        <Link href="home">
          <BookWiseIcon />
        </Link>
        <Link href="home" className={`${currentPage === 'home' && 'active'}`}>
          <ChartLineUp size={'1.5rem'} />
          Início
        </Link>

        <Link
          href="explore"
          className={`${currentPage === 'explore' && 'active'}`}
        >
          <Binoculars size={'1.5em'} />
          Explorar
        </Link>

        <Link
          href="profile"
          className={`${currentPage === 'profile' && 'active'}`}
        >
          <User size={'1.5rem'} />
          Perfil
        </Link>
      </nav>
    </div>
  )
}
