'use client'

import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { SearchInput } from './SearchInput'

export function PageTitle() {
  const path = usePathname().split('/')

  const iconSize = '2rem'

  const Title = ({ children }: { children: ReactNode }) => (
    <h1 className="flex items-center gap-3 text-xl font-bold [&>svg]:text-green-100">
      {children}
    </h1>
  )

  return (
    <header className="mb-10">
      {path.includes('home') && (
        <Title>
          <ChartLineUp size={iconSize} /> Início
        </Title>
      )}
      {path.includes('explore') && (
        <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
          <Title>
            <Binoculars size={iconSize} /> Explorar
          </Title>
          <SearchInput />
        </div>
      )}
      {path.includes('profile') && (
        <Title>
          <User size={iconSize} /> Perfil
        </Title>
      )}
    </header>
  )
}
