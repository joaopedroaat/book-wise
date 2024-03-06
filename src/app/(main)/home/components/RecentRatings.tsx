'use client'

import { appUrl } from '@/api/appApi'
import { GetRatingsResponse } from '@/app/api/ratings/route'
import { Avatar } from '@/components/Avatar'
import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { Book, Rating, User } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type RatingWithBookAndUser = Rating & {
  book: Book
  user: User
}

export function RecentRatings() {
  const [ratings, setRatings] = useState<RatingWithBookAndUser[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  async function fetchRatings() {
    const response = await fetch(
      `${appUrl}/ratings?page=${page}&perPage=${10}&book=true&user=true`,
      {
        next: { tags: ['ratings'] },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch ratings.')
    }

    return (await response.json()) as GetRatingsResponse & {
      ratings: RatingWithBookAndUser[]
    }
  }

  const { ref: intersection, entry } = useInView()
  useEffect(() => {
    if (!ratings.length || (entry?.isIntersecting && hasMore)) {
      fetchRatings().then((data) => {
        if (data.ratings.length) {
          setRatings([...ratings, ...data.ratings])
          setPage(page + 1)
          setHasMore(true)
        } else {
          setHasMore(false)
        }
      })
    }
  })

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-base font-normal">Avaliações mais recentes</h1>
      <ul className="list-none flex flex-col gap-3">
        {ratings.map((rating, index) => (
          <li
            key={rating.id}
            ref={index === ratings.length - 1 ? intersection : undefined}
            className="bg-gray-700 p-6 rounded-lg flex flex-col gap-8"
          >
            <header className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:items-start">
              <div className="flex flex-col items-center gap-3 md:flex-row">
                <Avatar user={rating.user} />
                <div className="flex flex-col items-center md:items-start">
                  <Link
                    className="text-gray-100 no-underline"
                    href={`profile/${rating.user.id}`}
                  >
                    {rating.user.name}
                  </Link>
                  <small className="text-gray-400">
                    {calculateDateDistance(new Date(rating.createdAt))}
                  </small>
                </div>
              </div>
              <StarRating type="book" bookId={rating.bookId} size={16} />
            </header>
            <main className="flex flex-col items-center gap-3 lg:flex-row lg:gap-5 lg:items-start">
              <BookOverlay book={rating.book} />

              <div className="text-center lg:text-start">
                <h1 className="text-xl font-bold">{rating.book.name}</h1>
                <small className="text-gray-400">{rating.book.author}</small>
                <p className="mt-5 text-gray-300">{rating.description}</p>
              </div>
            </main>
          </li>
        ))}
      </ul>
    </section>
  )
}
