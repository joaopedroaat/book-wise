import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import { BookWiseService } from '..'

export function useUserReadings() {
  const session = useSession()

  const user = session && session.data?.user

  const query = useQuery(['readings', user], async () => {
    if (!user) return

    return await BookWiseService.getUserReadings(user.id)
  })

  return [query]
}
