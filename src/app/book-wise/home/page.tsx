import { PopularBooksList } from '@/components/PopularBooksList'
import { RecentRatingList } from '@/components/RecentRatingsList'
import { ChartLineUp } from '@phosphor-icons/react/dist/ssr/ChartLineUp'

export default function Home() {
  return (
    <section>
      <h1 className="flex items-center gap-3 text-2xl mb-10">
        <ChartLineUp className="text-green-100" size={32} />
        Início
      </h1>
      <main className="w-full flex gap-16">
        <RecentRatingList />
        <aside className="flex-grow">
          <PopularBooksList />
        </aside>
      </main>
    </section>
  )
}
