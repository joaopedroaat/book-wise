'use client'

import { BookWiseService } from '@/services/BookWiseService'
import { RatingWithBookAndUser } from '@/services/interfaces/models/RatingWithBookAndUser'
import { useQuery } from 'react-query'
import { RecentRatingItem } from './components/RecentRatingItem'
import './styles.css'

export function RecentRatingList() {
  const { data: ratings } = useQuery('ratings', () => {
    const result = BookWiseService.getRatings({
      includeBooks: true,
      includeUsers: true,
      page: 1,
    }) as unknown

    return result as RatingWithBookAndUser[]
  })

  return (
    <section className="recent-rating-list-container">
      <h1>Avaliações mais recentes</h1>
      <ul>
        {ratings &&
          ratings.map((rating) => (
            <RecentRatingItem key={rating.id} rating={rating} />
          ))}
      </ul>
      s
    </section>
  )
}
