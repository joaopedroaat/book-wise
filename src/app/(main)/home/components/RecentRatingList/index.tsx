import { BookWiseService } from '@/services/BookWiseService'
import { RatingWithBookAndUser } from '@/services/BookWiseService/types'
import { RecentRatingItem } from './components/RecentRatingItem'
export async function RecentRatingList() {
  const ratingsData = await BookWiseService.getRatings({
    includeBook: true,
    includeUser: true,
    page: 1,
  })

  const ratings = ratingsData
    ? (ratingsData.ratings as RatingWithBookAndUser[])
    : null

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-base font-normal">Avaliações mais recentes</h1>
      <ul className="list-none flex flex-col gap-3">
        {ratings &&
          ratings.map((rating) => (
            <RecentRatingItem key={rating.id} rating={rating} />
          ))}
      </ul>
    </section>
  )
}
