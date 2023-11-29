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
      onSettled: async () => {
        await queryClient.invalidateQueries('ratings_on_book')
        await queryClient.invalidateQueries('recent_ratings')
        await queryClient.invalidateQueries('popular_books')
      },
    },
  )

  return mutation
}
