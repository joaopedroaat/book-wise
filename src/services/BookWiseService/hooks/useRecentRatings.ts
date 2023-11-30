import { useInfiniteQuery } from 'react-query'
import { BookWiseService } from '..'
import { RatingWithBookAndUser } from '../types'

export function useRecentRatings() {
  const query = useInfiniteQuery(
    ['recent_ratings'],
    async ({ pageParam = 1 }) => {
      return (await BookWiseService.getRatings({
        page: pageParam,
      })) as RatingWithBookAndUser[]
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === 10 ? pages.length + 1 : undefined
      },
    },
  )

  return query
}
