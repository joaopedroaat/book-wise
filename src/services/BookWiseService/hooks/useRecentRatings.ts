import { useQuery } from 'react-query'
import { BookWiseService } from '..'
import { RatingWithBookAndUser } from '../types'

export function useRecentRatings() {
  const query = useQuery('recent_ratings', async () => {
    return (await BookWiseService.getRatings({
      page: 1,
    })) as RatingWithBookAndUser[]
  })

  return query
}
