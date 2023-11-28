'use client'

import { Avatar } from '@/components/Avatar'
import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { useRecentRatings } from '@/services/BookWiseService/hooks/useRecentRatings'
import { RatingWithBookAndUser } from '@/services/BookWiseService/types'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import Link from 'next/link'

export function RecentRatings() {
  const [{ data: ratings }] = useRecentRatings()

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-base font-normal">Avaliações mais recentes</h1>
      <ul className="list-none flex flex-col gap-3">
        {ratings &&
          ratings.map((rating) => (
            <RatingItem key={rating.id} rating={rating} />
          ))}
      </ul>
    </section>
  )
}

type RatingItemProps = {
  rating: RatingWithBookAndUser
}

export function RatingItem({
  rating: { user, book, rate, description, createdAt },
}: RatingItemProps) {
  return (
    <li className="bg-gray-700 p-6 rounded-lg flex flex-col gap-8">
      <header className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:items-start">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <Avatar user={user} />
          <div className="flex flex-col items-center md:items-start">
            <Link
              className="text-gray-100 no-underline"
              href={`profile/${user.id}`}
            >
              {user.name}
            </Link>
            <small className="text-gray-400">
              {calculateDateDistance(new Date(createdAt))}
            </small>
          </div>
        </div>
        <StarRating rate={rate} size={16} />
      </header>
      <main className="flex flex-col items-center gap-3 lg:flex-row lg:gap-5 lg:items-start">
        <BookOverlay book={book} />

        <div className="text-center lg:text-start">
          <h1 className="text-xl font-bold">{book.name}</h1>
          <small className="text-gray-400">{book.author}</small>
          <p className="mt-5 text-gray-300">{description}</p>
        </div>
      </main>
    </li>
  )
}
