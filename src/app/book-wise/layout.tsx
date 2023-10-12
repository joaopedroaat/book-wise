import bookWiseLogo from '@/assets/book-wise-logo.svg'
import { Menu } from '@/components/Menu'
import './layout.css'
import { SignIn, SignOut } from '@phosphor-icons/react/dist/ssr/index'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session?.user

  return (
    <div className="bookwise-layout-container">
      <aside>
        <header>
          <Link href="/book-wise/home">
            <Image
              src={bookWiseLogo}
              width={128}
              height={32}
              alt="BookWise logo."
            />
          </Link>
        </header>
        <main>
          <Menu isAuthenticated={isAuthenticated} />
        </main>
        <footer>
          {isAuthenticated && (
            <div className="authenticated-options">
              <Link href="/book-wise/profile">
                <Image
                  src={session.user?.image || ''}
                  width={32}
                  height={32}
                  alt={`${session.user?.name} profile picture.`}
                />
                <span>{session.user?.name}</span>
              </Link>
              <button>
                <SignOut size={20} />
              </button>
            </div>
          )}
          {!isAuthenticated && (
            <button className="unauthenticated-options">
              Fazer login
              <SignIn size={20} />
            </button>
          )}
        </footer>
      </aside>
      <main>{children}</main>
    </div>
  )
}
