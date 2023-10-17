import { RecentRatingList } from '@/components/RecentRatingsList'
import { ChartLineUp } from '@phosphor-icons/react/dist/ssr/ChartLineUp'
import './page.css'

export default function Home() {
  return (
    <div className="home-container">
      <main>
        <h1>
          <ChartLineUp size={32} />
          Início
        </h1>
        <RecentRatingList />
      </main>
      <aside />
    </div>
  )
}
