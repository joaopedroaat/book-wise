import { PopularBooksList } from '@/app/book-wise/home/components/PopularBooksList'
import { RecentRatingList } from '@/app/book-wise/home/components/RecentRatingsList'
import { ChartLineUp } from '@phosphor-icons/react/dist/ssr/ChartLineUp'

export default function Home() {
  return (
    <section>
      <h1 className="flex items-center gap-3 text-2xl mb-10">
        <ChartLineUp className="text-green-100" size={32} />
        Início
      </h1>
      <main className="grid grid-cols-4 gap-16">
        <div className="col-span-4 2xl:col-span-3">
          <RecentRatingList />
        </div>
        <aside className="col-span-1 hidden 2xl:block">
          <PopularBooksList />
        </aside>
      </main>
    </section>
  )
}
