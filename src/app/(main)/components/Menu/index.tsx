import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { BookWiseIcon } from '@/components/BookWiseIcon'
import { Binoculars } from '@phosphor-icons/react/dist/ssr/Binoculars'
import { ChartLineUp } from '@phosphor-icons/react/dist/ssr/ChartLineUp'
import { User } from '@phosphor-icons/react/dist/ssr/User'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { MenuLink } from './components/MenuLink'
import { SessionForm } from './components/SessionForm'

export async function Menu() {
  const session = await getServerSession(authOptions)

  const isAuthenticated = !!session?.user

  return (
    <div className="flex justify-between items-center md:flex-col h-full gap-5">
      <Link href="/home" className="md:mb-16">
        <BookWiseIcon />
      </Link>
      <nav className="flex flex-col gap-10 mb-auto">
        <MenuLink href="/home">
          <ChartLineUp size="2rem" />
          Início
        </MenuLink>

        <MenuLink href="/explore">
          <Binoculars size="2rem" />
          Explorar
        </MenuLink>

        {isAuthenticated && (
          <MenuLink href={`/profile/${session.user.id}`}>
            <User size="2rem" />
            Perfil
          </MenuLink>
        )}
      </nav>
      <SessionForm />
    </div>
  )
}
