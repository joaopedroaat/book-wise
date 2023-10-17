'use client'

import { BookWiseService } from '@/services/BookWiseService'
import { useQuery } from 'react-query'
import { RecentRatingItem } from './components/RecentRatingItem'
import './styles.css'

export function RecentRatingList() {
  const { data: ratings } = useQuery('ratings', () =>
    BookWiseService.getRatings({
      includeBooks: true,
      includeUsers: true,
      page: 1,
    }),
  )

  return (
    <ul className="rating-list-container">
      {ratings &&
        ratings.map((rating) => (
          <RecentRatingItem key={rating.id} rating={rating} />
        ))}
    </ul>
  )
}
