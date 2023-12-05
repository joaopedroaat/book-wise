import { Menu } from './components/Menu'
import { PageTitle } from './components/PageTitle'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-screen p-5 md:grid md:grid-cols-12">
      <aside className="bg-gray-700 border-gray-600 border-b md:border-0 p-3 md:p-6 fixed top-0 left-0 right-0 md:static md:rounded-xl md:col-span-3 lg:col-span-2">
        <Menu />
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 px-2 md:px-24 pt-14 pb-5 md:pb-0 overflow-auto">
        <PageTitle />
        {children}
      </main>
    </div>
  )
}
