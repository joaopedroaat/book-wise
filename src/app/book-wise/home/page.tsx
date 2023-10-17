import { RecentRatingList } from '@/components/RecentRatingsList'
import { ChartLineUp } from '@phosphor-icons/react/dist/ssr/ChartLineUp'
import './page.css'

export default function Home() {
  return (
    <div className="home-container">
      <main>
        <header>
          <ChartLineUp size={32} />
          Início
        </header>
        <RecentRatingList />
      </main>
      <aside />
    </div>
  )
}
