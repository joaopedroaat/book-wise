import { BookWiseService } from '@/services/BookWiseService'
import { useQuery } from 'react-query'
import { RatingItem } from './components/RatingItem'

export function RatingList() {
  const { data: ratings } = useQuery({
    queryKey: ['ratings'],
    queryFn: async () =>
      await BookWiseService.getRatings({
        includeUsers: true,
        includeBooks: true,
      }),
  })

  return (
    <ul className="rating-list-container">
      {ratings &&
        ratings.map((rating) => <RatingItem key={rating.id} rating={rating} />)}
    </ul>
  )
}
