import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { BookWiseIcon } from '../BookWiseIcon'
import { NavLinks } from './components/NavLinks'
import { SessionSwitcher } from './components/SessionSwitcher'

export async function Menu() {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session

  return (
    <nav className="w-full h-full bg-gray-700 p-6 flex flex-col items-center rounded-xl">
      <header className="mb-16">
        <Link href="/book-wise/home">
          <BookWiseIcon />
        </Link>
      </header>
      <main>
        <NavLinks isAuthenticated={isAuthenticated} />
      </main>
      <footer className="mt-auto">
        <SessionSwitcher session={session} />
      </footer>
    </nav>
  )
}
