import { LastReadingSection } from './components/LastReadingSection'
import { PopularBooksList } from './components/PopularBookList'
import { RecentRatingList } from './components/RecentRatingList'

export default function Home() {
  return (
    <section>
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
