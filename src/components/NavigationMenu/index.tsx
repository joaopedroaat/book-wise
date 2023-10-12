'use client'

import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './styles.css'

interface NavigationMenuProps {
  isAuthenticated: boolean
}

export function NavigationMenu({ isAuthenticated }: NavigationMenuProps) {
  const currentPath = usePathname()
  const currentPage = currentPath.split('/').pop()

  return (
    <nav className="navigation-menu-container">
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
