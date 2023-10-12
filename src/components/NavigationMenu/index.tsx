'use client'

import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import Link from 'next/link'
import { useState } from 'react'
import './styles.css'

interface NavigationMenuProps {
  isAuthenticated: boolean
}

type Pages = 'home' | 'explore' | 'profile'

export function NavigationMenu({ isAuthenticated }: NavigationMenuProps) {
  const [currentPage, setCurrentPage] = useState<Pages>('home')

  function handleChangePage(page: Pages) {
    if (currentPage !== page) setCurrentPage(page)
  }

  return (
    <nav className="navigation-menu-container">
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
  )
}
