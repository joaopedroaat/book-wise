import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { BookWiseService } from '..'
import { Book, RatingPostRequestBody, RatingWithUser } from '../types'

type RatingsHookResult = [
  UseQueryResult<RatingWithUser[], unknown>,
  UseMutationResult<void, unknown, RatingPostRequestBody['rating']>,
]

export function useRatingsOnBook(book: Book): RatingsHookResult {
  const query = useQuery(['ratings_on_book', book], async () => {
    return (await BookWiseService.getRatingsOnBook(book.id, {
      includeUser: true,
    })) as RatingWithUser[]
  })

  const queryClient = useQueryClient()

  const mutation = useMutation(
    async (rating: RatingPostRequestBody['rating']) => {
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
