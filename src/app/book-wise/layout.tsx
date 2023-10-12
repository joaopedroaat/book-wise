import { NavigationMenu } from '@/components/NavigationMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import './layout.css'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <div className="bookwise-layout-container">
      <aside>
        <NavigationMenu session={session} />
      </aside>
      <main>{children}</main>
    </div>
  )
}
