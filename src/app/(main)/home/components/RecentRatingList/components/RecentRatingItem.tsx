import { Avatar } from '@/components/Avatar'
import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { BookWiseService } from '@/services/BookWiseService'
import {
  BookWithRatingsAndCategories,
  RatingWithBookAndUser,
} from '@/services/BookWiseService/types'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import Link from 'next/link'

type RatingItemProps = {
  rating: RatingWithBookAndUser
}

export async function RecentRatingItem({
  rating: { user, book, rate, description, created_at },
}: RatingItemProps) {
  const bookData = await BookWiseService.getBook(book.id, {
    includeRatings: true,
    includeCategories: true,
  })

  const bookWithRatingAndCategories =
    (bookData?.book as BookWithRatingsAndCategories) || null

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
        <BookOverlay book={bookWithRatingAndCategories} />

        <div className="text-center lg:text-start">
          <h1 className="text-xl">{book.name}</h1>
          <small className="text-gray-400">{book.author}</small>
          <p className="mt-5 text-gray-300">{description}</p>
        </div>
      </main>
    </li>
  )
}
