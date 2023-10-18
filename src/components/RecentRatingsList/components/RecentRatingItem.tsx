import { BookCover } from '@/components/BookCover'
import { RatingWithBookAndUser } from '@/services/interfaces/models/RatingWithBookAndUser'
import Link from 'next/link'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { ProfilePicture } from '@/components/ProfilePicture'
import { StarRating } from '@/components/StarRating'

interface RatingItemProps {
  rating: RatingWithBookAndUser
}

export function RecentRatingItem({ rating }: RatingItemProps) {
  return (
    <li className="bg-gray-700 p-6 rounded-lg flex flex-col gap-8 max-h-72">
      <header className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <ProfilePicture user={rating.user} />
          <div className="flex flex-col gap-0">
            <Link
              className="text-gray-100 no-underline"
              href={`/book-wise/profile/${rating.user.id}`}
            >
              {rating.user.name}
            </Link>
            <small className="text-gray-400">
              {calculateDateDistance(new Date(rating.created_at))}
            </small>
          </div>
        </div>
        <StarRating rating={rating.rate} size={16} />
      </header>
      <main className="flex gap-5 overflow-hidden">
        <BookCover book={rating.book} />
        <div className="flex flex-col gap-5">
          <header>
            <h1 className="text-xl">{rating.book.name}</h1>
            <small className="text-gray-400">{rating.book.author}</small>
          </header>
          <main className="text-gray-300">
            <p>{rating.description}</p>
          </main>
        </div>
      </main>
    </li>
  )
}
