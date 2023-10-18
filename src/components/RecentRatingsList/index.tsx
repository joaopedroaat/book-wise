'use client'

import { BookWiseService } from '@/services/BookWiseService'
import { RatingWithBookAndUser } from '@/services/interfaces/models/RatingWithBookAndUser'
import { useQuery } from 'react-query'
import { RecentRatingItem } from './components/RecentRatingItem'

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
    <section className="flex flex-col gap-4">
      <h1 className="text-base font-normal">Avaliações mais recentes</h1>
      <ul className="list-none flex flex-col gap-3">
        {ratings &&
          ratings.map((rating) => (
            <RecentRatingItem key={rating.id} rating={rating} />
          ))}
      </ul>
      s
    </section>
  )
}
