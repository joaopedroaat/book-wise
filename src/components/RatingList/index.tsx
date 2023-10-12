import { localApi } from '@/lib/axios'
import { useQuery } from 'react-query'

interface Rating {
  id: string
  rate: number
  description: string
  created_at: Date
  book_id: string
  user_id: string
}

export function RatingList() {
  const { data: ratings } = useQuery({
    queryKey: ['ratings'],
    queryFn: async () => {
      const { data } = await localApi.get('/ratings')
      console.log(data)
      return data.ratings as Rating[]
    },
  })

  return (
    <ul className="rating-list-container">
      {ratings &&
        ratings.map((rating) => <li key={rating.id}>{rating.description}</li>)}
    </ul>
  )
}
