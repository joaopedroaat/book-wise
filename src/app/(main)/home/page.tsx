import { ChartLineUp } from '@phosphor-icons/react/dist/ssr/ChartLineUp'
import { LastReadingSection } from './components/LastReadingSection'
import { PopularBooksList } from './components/PopularBookList'
import { RecentRatingList } from './components/RecentRatingList'

export default function Home() {
  return (
    <section>
      <h1 className="flex items-center gap-3 text-2xl mb-10">
        <ChartLineUp className="text-green-100" size={32} />
        Início
      </h1>
      <main className="grid grid-cols-4 gap-16">
        <div className="col-span-4 2xl:col-span-3 flex flex-col gap-10">
          <LastReadingSection />
          <RecentRatingList />
        </div>
        <aside className="col-span-1 hidden 2xl:block">
          <PopularBooksList />
        </aside>
      </main>
    </section>
  )
}
