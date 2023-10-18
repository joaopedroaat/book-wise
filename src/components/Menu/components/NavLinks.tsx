'use client'

import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationMenuProps {
  isAuthenticated: boolean
}

export function NavLinks({ isAuthenticated }: NavigationMenuProps) {
  const currentPath = usePathname()
  const currentPage = currentPath.split('/').pop()

  return (
    <nav className="flex flex-col gap-4 [&>a]:flex [&>a]:items-center [&>a]:gap-3 [&>a]:text-lg [&>a]:font-bold [&>a]:text-gray-400 [&>a]:no-underline hover:[&>a]:text-gray-300 [&>a]:relative [&>a.active]:text-gray-200 after:[&>a.active]:content-[''] after:[&>a.active]:block after:[&>a.active]:absolute after:[&>a.active]:w-1 after:[&>a.active]:h-6 after:[&>a.active]:-left-4 after:[&>a.active]:bg-green-200 after:[&>a.active]:rounded-lg">
      <Link
        href="/book-wise/home"
        className={currentPage === 'home' ? 'active' : ''}
      >
        <ChartLineUp size={24} />
        Início
      </Link>
      <Link
        href="/book-wise/explore"
        className={currentPage === 'explore' ? 'active' : ''}
      >
        <Binoculars size={24} />
        Explorar
      </Link>
      {isAuthenticated && (
        <Link
          href="/book-wise/profile"
          className={currentPage === 'profile' ? 'active' : ''}
        >
          <User size={24} />
          Perfil
        </Link>
      )}
    </nav>
  )
}
