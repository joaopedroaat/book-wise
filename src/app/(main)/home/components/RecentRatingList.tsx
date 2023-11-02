import { Avatar } from '@/components/Avatar'
import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { BookWiseService } from '@/services/BookWiseService'
import { RatingWithBookAndUser } from '@/services/interfaces/models/RatingWithBookAndUser'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import Link from 'next/link'

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

interface RatingItemProps {
  rating: RatingWithBookAndUser
}

function RecentRatingItem({
  rating: { user, book, rate, description, created_at },
}: RatingItemProps) {
  return (
    <li className="bg-gray-700 p-6 rounded-lg flex flex-col gap-8">
      <header className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:items-start">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <Avatar
            user={{ id: user.id, name: user.name, avatarUrl: user.avatar_url }}
          />
          <div className="flex flex-col items-center md:items-start">
            <Link
              className="text-gray-100 no-underline"
              href={`profile/${user.id}`}
            >
              {user.name}
            </Link>
            <small className="text-gray-400">
              {calculateDateDistance(new Date(created_at))}
            </small>
          </div>
        </div>
        <StarRating rating={rate} size={16} />
      </header>
      <main className="flex flex-col items-center gap-3 lg:flex-row lg:gap-5 lg:items-start">
        <BookOverlay book={book} />

        <div className="text-center lg:text-start">
          <h1 className="text-xl">{book.name}</h1>
          <small className="text-gray-400">{book.author}</small>
          <p className="mt-5 text-gray-300">{description}</p>
        </div>
      </main>
    </li>
  )
}