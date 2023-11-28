import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { BookWiseService } from '..'
import { Book, PostRating, RatingsResponse } from '../types'

type RatingsHookResult = [
  UseQueryResult<RatingsResponse['ratings'], unknown>,
  UseMutationResult<void, unknown, PostRating['rating']>,
]

export function useRatingsOnBook(book: Book): RatingsHookResult {
  const query = useQuery(['ratings_on_book', book], async () => {
    return await BookWiseService.getBookRatings(book.id)
  })

  const queryClient = useQueryClient()

  const mutation = useMutation(
    async (rating: PostRating['rating']) => {
      BookWiseService.postRating(rating)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['ratings_on_book', 'ratings'])
      },
    },
  )

  return [query, mutation]
}
