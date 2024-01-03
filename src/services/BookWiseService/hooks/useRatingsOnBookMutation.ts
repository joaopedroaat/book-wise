import { useMutation, useQueryClient } from 'react-query'
import { BookWiseService } from '..'
import { PostRating } from '../types'
import { useState } from 'react'

export function useRatingsOnBookMutation() {
  const queryClient = useQueryClient()
  const [bookWiseService] = useState(new BookWiseService())

  const onSuccess = () => {
    queryClient.invalidateQueries('ratings_on_book')
    queryClient.invalidateQueries('recent_ratings')
    queryClient.invalidateQueries('popular_books')
  }

  const postMutation = useMutation(
    async (rating: PostRating['rating']) => {
      await bookWiseService.postRating(rating)
    },
    { onSuccess },
  )

  const deleteMutation = useMutation(
    async (ratingId: string) => {
      await bookWiseService.deleteRating({ ratingId })
    },
    { onSuccess },
  )

  return { postMutation, deleteMutation }
}
