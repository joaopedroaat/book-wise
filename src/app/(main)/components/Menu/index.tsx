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
    <div className="relative flex flex-wrap justify-between items-center md:flex-col h-full gap-5">
      <Link
        href="/home"
        className="w-full flex justify-center md:flex-none md:mb-16"
      >
        <BookWiseIcon />
      </Link>
      <nav className="flex w-full justify-center md:w-auto text-sm md:text-lg gap-4 md:gap-10 items-center md:items-start md:flex-col md:mb-auto ">
        <MenuLink href="/home">
          <ChartLineUp size="1.5em" />
          Início
        </MenuLink>

        <MenuLink href="/explore">
          <Binoculars size="1.5em" />
          Explorar
        </MenuLink>

        {isAuthenticated && (
          <MenuLink href={`/profile/${session.user.id}`}>
            <User size="1.5em" />
            Perfil
          </MenuLink>
        )}
      </nav>
      <div className="absolute top-0 right-0 md:static">
        <SessionForm />
      </div>
    </div>
  )
}
