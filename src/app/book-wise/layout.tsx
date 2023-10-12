import { BookWiseIcon } from '@/components/BookWiseIcon'
import { NavigationMenu } from '@/components/NavigationMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import './layout.css'
import { AuthenticationFooter } from '@/components/AuthenticationFooter'
import Link from 'next/link'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session

  return (
    <div className="bookwise-layout-container">
      <aside>
        <header>
          <Link href="/book-wise/home">
            <BookWiseIcon />
          </Link>
        </header>
        <main>
          <NavigationMenu isAuthenticated={isAuthenticated} />
        </main>
        <footer>
          <AuthenticationFooter session={session} />
        </footer>
      </aside>
      <main>{children}</main>
    </div>
  )
}
