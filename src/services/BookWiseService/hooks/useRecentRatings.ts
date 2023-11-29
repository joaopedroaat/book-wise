import { useQuery } from 'react-query'
import { BookWiseService } from '..'
import { RatingWithBookAndUser } from '../types'

export function useRecentRatings({ page } = { page: 1 }) {
  const query = useQuery('recent_ratings', async () => {
    return (await BookWiseService.getRatings({
      page,
    })) as RatingWithBookAndUser[]
  })

  return query
}
