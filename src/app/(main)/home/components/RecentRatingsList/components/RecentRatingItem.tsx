import { BookCover } from '@/components/BookCover'
import { RatingWithBookAndUser } from '@/services/interfaces/models/RatingWithBookAndUser'
import Link from 'next/link'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { ProfilePicture } from '@/components/ProfilePicture'
import { StarRating } from '@/components/StarRating'

interface RatingItemProps {
  rating: RatingWithBookAndUser
}

export function RecentRatingItem({
  rating: { user, book, rate, description, created_at },
}: RatingItemProps) {
  return (
    <li className="bg-gray-700 p-6 rounded-lg flex flex-col gap-8">
      <header className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:items-start">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <ProfilePicture user={user} />
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
        <BookCover book={book} />
        <div className="text-center lg:text-start">
          <h1 className="text-xl">{book.name}</h1>
          <small className="text-gray-400">{book.author}</small>
          <p className="mt-5 text-gray-300">{description}</p>
        </div>
      </main>
    </li>
  )
}
