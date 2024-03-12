'use client'

import { ReactNode } from 'react'
import { TanstackProvider } from './TanstackProvider'
import { NextAuthProvider } from './NextAuthProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextAuthProvider>
      <TanstackProvider>{children}</TanstackProvider>
    </NextAuthProvider>
  )
}
