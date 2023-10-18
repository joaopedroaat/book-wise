import { BookWiseIcon } from '@/components/BookWiseIcon'
import { NavigationMenu } from '@/components/NavigationMenu'
import { SessionSwitcher } from '@/components/SessionSwitcher'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session

  return (
    <div className="w-full h-screen p-5 grid grid-cols-12">
      <aside className="col-span-2 w-full h-full p-7 rounded-xl bg-gray-700 flex flex-col items-center">
        <header className="mb-16">
          <Link href="/book-wise/home">
            <BookWiseIcon />
          </Link>
        </header>
        <main>
          <NavigationMenu isAuthenticated={isAuthenticated} />
        </main>
        <footer className="mt-auto">
          <SessionSwitcher session={session} />
        </footer>
      </aside>
      <main className="col-span-10 px-24 py-14">{children}</main>
    </div>
  )
}
