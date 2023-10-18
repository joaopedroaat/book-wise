import { RecentRatingList } from '@/components/RecentRatingsList'
import { ChartLineUp } from '@phosphor-icons/react/dist/ssr/ChartLineUp'

export default function Home() {
  return (
    <div className="flex gap-16">
      <main className="basis-2/3">
        <h1 className="flex items-center gap-3 text-2xl mb-10">
          <ChartLineUp className="text-green-100" size={32} />
          Início
        </h1>
        <RecentRatingList />
      </main>
      <aside />
    </div>
  )
}
