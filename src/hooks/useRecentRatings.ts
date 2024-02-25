import { GetRatingsResponse } from '@/app/api/ratings/route'
import { appApi } from '@/lib/axios'
import { Book, Rating, User } from '@prisma/client'
import { useInfiniteQuery } from 'react-query'

export function useRecentRatings() {
  const query = useInfiniteQuery(
    ['recent_ratings'],
    async ({ pageParam = 1 }) => {
      return await appApi.get<
        GetRatingsResponse & {
          ratings: (Rating & { user: User; book: Book })[]
        }
      >('/ratings', {
        params: {
          page: pageParam,
          orderBy: 'date',
          book: true,
          user: true,
        },
      })
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.data.ratings.length === 10
          ? pages.length + 1
          : undefined
      },
    },
  )

  return query
}
