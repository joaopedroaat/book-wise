'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { TanstackProvider } from './TanstackProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TanstackProvider>{children}</TanstackProvider>
    </SessionProvider>
  )
}
