'use client'

import { BookWiseService } from '@/services/BookWiseService'
import { useQuery } from 'react-query'
import { PageTitle } from '../../components/PageTitle'

type ProfileProps = {
  params: {
    userId: string
  }
}

export default function Profile({ params: { userId } }: ProfileProps) {
  const { data: userData } = useQuery('profile', async () => {
    console.log('fetching user data')
    const user = await BookWiseService.getUser(userId)
    const stats = await BookWiseService.getUserStats(userId)

    return { user, stats }
  })

  return (
    <>
      <PageTitle />
      <main className="grid grid-cols-1">
        <section>{JSON.stringify(userData)}</section>
        <aside>
          <div></div>
        </aside>
      </main>
    </>
  )
}
