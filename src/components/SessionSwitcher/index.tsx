'use client'

import { Session } from 'next-auth'
import { LoginDialog } from './components/LoginDialog'
import { Profile } from './components/Profile'

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
