'use client'

import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'

export function PageTitle() {
  const path = usePathname().split('/')

  const iconSize = '2rem'

  return (
    <>
      <h1 className="flex items-center gap-3 text-xl mb-10 font-bold [&>svg]:text-green-100">
        {path.includes('home') && (
          <>
            <ChartLineUp size={iconSize} /> Início
          </>
        )}
        {path.includes('explore') && (
          <>
            <Binoculars size={iconSize} /> Explorar
          </>
        )}
        {path.includes('profile') && (
          <>
            <User size={iconSize} /> Perfil
          </>
        )}
      </h1>
    </>
  )
}
