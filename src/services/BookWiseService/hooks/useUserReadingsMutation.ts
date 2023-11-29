import { BookWiseService } from '@/services/BookWiseService'
import { useMutation } from 'react-query'

export function useUserReadingsMutation() {
  const mutation = useMutation(
    async ({ bookId, userId }: { bookId: string; userId: string }) => {
      BookWiseService.postReading({ userId, bookId })
    },
  )

  return mutation
}
