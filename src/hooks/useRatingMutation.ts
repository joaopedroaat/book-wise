import { useMutation, useQueryClient } from 'react-query'
import { upsertRating } from '@/actions/upsertRating'
import { appApi } from '@/lib/axios'
import { DeleteRatingResponse } from '@/app/api/ratings/[id]/route'

export function useRatingMutation() {
  const queryClient = useQueryClient()

  const onSuccess = () => {
    queryClient.invalidateQueries('ratings_on_book')
    queryClient.invalidateQueries('recent_ratings')
    queryClient.invalidateQueries('popular_books')
  }

  const postMutation = useMutation(upsertRating, { onSuccess })

  const deleteMutation = useMutation(
    async (id: string) => {
      const { data, status } = await appApi.delete<DeleteRatingResponse>(
        `/ratings/${id}`,
      )

      if (status !== 200) return

      return data.rating
    },
    { onSuccess },
  )

  return { postMutation, deleteMutation }
}
