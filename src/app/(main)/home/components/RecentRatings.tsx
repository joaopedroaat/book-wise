'use client'

import { Avatar } from '@/components/Avatar'
import { BookOverlay } from '@/components/BookOverlay'
import { InfiniteScroll } from '@/components/InfiniteScroll'
import { StarRating } from '@/components/StarRating'
import { useRecentRatings } from '@/hooks/useRecentRatings'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { Book, Rating, User } from '@prisma/client'
import Link from 'next/link'

export function RecentRatings() {
  const { data, fetchNextPage, hasNextPage } = useRecentRatings()
  const ratings = data?.pages.flatMap((page) => page.data.ratings)

  return (
    <section className="flex flex-col gap-4">
      <InfiniteScroll fetchMore={fetchNextPage} hasMore={!!hasNextPage}>
        <h1 className="text-base font-normal">Avaliações mais recentes</h1>
        <ul className="list-none flex flex-col gap-3">
          {ratings?.map((rating) => (
            <RatingItem key={rating.id} rating={rating} />
          ))}
        </ul>
      </InfiniteScroll>
    </section>
  )
}

function RatingItem({
  rating: { user, book, description, createdAt },
}: {
  rating: Rating & { book: Book; user: User }
}) {
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
        <StarRating type="book" book={book} size={16} />
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
