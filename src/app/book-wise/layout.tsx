import { Menu } from '@/components/Menu'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-screen p-5 grid grid-cols-12">
      <aside className="col-span-2">
        <Menu />
      </aside>
      <main className="col-span-10 px-24 pt-14 overflow-scroll">
        {children}
      </main>
    </div>
  )
}
