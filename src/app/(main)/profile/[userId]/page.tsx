'use client'

import { useQuery } from 'react-query'
import { PageTitle } from '../../components/PageTitle'

type ProfileProps = {
  params: {
    userId: string
  }
}

export default function Profile({ params: { userId } }: ProfileProps) {
  const { data: userData } = useQuery('profile', async () => {
    console.log('Fetching user data')
  })

  return (
    <>
      <PageTitle />
      <main className="grid grid-cols-1">
        <section>Ratings Section</section>
        <aside>
          <div></div>
        </aside>
      </main>
    </>
  )
}
