'use client'

import { RatingList } from '@/components/RecentRatingsList'
import { ChartLineUp } from '@phosphor-icons/react'

export default function Home() {
  return (
    <div className="home-container">
      <header>
        <ChartLineUp size={32} />
        Início
      </header>
      <main>
        <RatingList />
      </main>
    </div>
  )
}
