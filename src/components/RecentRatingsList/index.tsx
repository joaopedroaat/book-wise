import { BookWiseService } from '@/services/BookWiseService'
import { RecentRatingItem } from './components/RecentRatingItem'
import { RatingWithBookAndUser } from '@/services/interfaces/models/RatingWithBookAndUser'

export async function RecentRatingList() {
  const ratings = await BookWiseService.getRatings({
    includeBooks: true,
    includeUsers: true,
    page: 1,
  })

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-base font-normal">Avaliações mais recentes</h1>
      <ul className="list-none flex flex-col gap-3">
        {ratings &&
          ratings.map((rating) => (
            <RecentRatingItem
              key={rating.id}
              rating={rating as RatingWithBookAndUser}
            />
          ))}
      </ul>
    </section>
  )
}
