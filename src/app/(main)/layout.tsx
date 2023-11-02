import { Menu } from './components/Menu'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-screen p-5 md:grid md:grid-cols-12">
      <aside className="bg-gray-700 border-b border-gray-600 p-3 fixed top-0 left-0 right-0 md:static md:rounded-xl md:col-span-3 lg:col-span-2 md:p-6 mb-2 md:mb-0">
        <Menu />
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 px-24 pt-14 overflow-scroll">
        {children}
      </main>
    </div>
  )
}
