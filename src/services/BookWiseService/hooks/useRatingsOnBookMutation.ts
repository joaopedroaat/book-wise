import { useMutation, useQueryClient } from 'react-query'
import { BookWiseService } from '..'
import { PostRating } from '../types'

export function useRatingsOnBookMutation() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async (rating: PostRating['rating']) => {
      await BookWiseService.postRating(rating)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ratings_on_book')
        queryClient.invalidateQueries('recent_ratings')
        queryClient.invalidateQueries('popular_books')
      },
    },
  )

  return mutation
}
