import { BookWiseService } from '@/services/BookWiseService'
import { useMutation, useQueryClient } from 'react-query'

export function useUserReadingsMutation() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async ({ bookId, userId }: { bookId: string; userId: string }) => {
      BookWiseService.postReading({ userId, bookId })
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('user_readings')
      },
    },
  )

  return mutation
}
