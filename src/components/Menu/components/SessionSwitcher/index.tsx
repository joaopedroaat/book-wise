'use client'

import { Session } from 'next-auth'
import { Profile } from './components/Profile'
import { LoginDialog } from './components/LoginDialog'

interface SessionSwitcherProps {
  session: Session | null
}

export function SessionSwitcher({ session }: SessionSwitcherProps) {
  const isAuthenticated = !!session

  return (
    <div className="session-switcher-container">
      {isAuthenticated && <Profile session={session} />}
      {!isAuthenticated && <LoginDialog />}
    </div>
  )
}
