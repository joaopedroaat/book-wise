'use client'

import { ReactNode } from 'react'
import { TanstackProvider } from './TanstackProvider'
import { NextAuthProvider } from './NextAuthProvider'
import { ExploreContextProvider } from '@/contexts/ExploreContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextAuthProvider>
      <TanstackProvider>
        <ExploreContextProvider>{children}</ExploreContextProvider>
      </TanstackProvider>
    </NextAuthProvider>
  )
}
