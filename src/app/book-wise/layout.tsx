import bookWiseLogo from '@/assets/book-wise-logo.svg'
import '@/styles/app/book-wise/layout.css'
import {
  Binoculars,
  ChartLineUp,
  SignIn,
  SignOut,
  User,
} from '@phosphor-icons/react/dist/ssr/index'
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
          <nav>
            <Link href="/book-wise/home">
              <ChartLineUp size={24} />
              Início
            </Link>
            <Link href="/book-wise/explore">
              <Binoculars size={24} />
              Explorar
            </Link>
            {isAuthenticated && (
              <Link href="/book-wise/profile">
                <User size={24} />
                Perfil
              </Link>
            )}
          </nav>
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
