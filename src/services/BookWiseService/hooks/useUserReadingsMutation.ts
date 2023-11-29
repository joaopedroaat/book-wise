import { useSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { BookWiseService } from '..'

export function useUserReadingsMutation() {
  const session = useSession()
  const user = session.status === 'authenticated' && session.data.user

  const mutation = useMutation(async (bookId: string) => {
    if (!user) return

    BookWiseService.postReading(bookId, user.id)
  })

  return mutation
}
