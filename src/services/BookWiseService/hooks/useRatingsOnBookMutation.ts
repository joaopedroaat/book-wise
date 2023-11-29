import { useMutation, useQueryClient } from 'react-query'
import { BookWiseService } from '..'
import { PostRating } from '../types'

export function useRatingsOnBookMutation() {
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

  return mutation
}
