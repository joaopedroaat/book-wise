import { LastReading } from './components/LastReading'
import { PopularBooks } from './components/PopularBooks'
import { RecentRatings } from './components/RecentRatings'

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-16">
      <div className="col-span-4 2xl:col-span-3 flex flex-col gap-10">
        <LastReading />
        <RecentRatings />
      </div>
      <aside className="col-span-1 hidden 2xl:block">
        <PopularBooks />
      </aside>
    </div>
  )
}
