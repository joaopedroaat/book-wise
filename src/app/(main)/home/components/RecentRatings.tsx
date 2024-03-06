'use client'

import { GetRatingsResponse } from '@/app/api/ratings/route'
import { Avatar } from '@/components/Avatar'
import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { appApi } from '@/lib/axios'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { Book, Rating, User } from '@prisma/client'
import Link from 'next/link'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'

type RatingWithBookAndUser = Rating & {
  book: Book
  user: User
}

export function RecentRatings() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['ratings'],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await appApi.get<GetRatingsResponse>('/ratings', {
        params: {
          page: pageParam,
          perPage: 10,
          user: true,
          book: true,
          orderBy: 'date',
        },
      })

      return data.ratings as RatingWithBookAndUser[]
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length) return pages.length + 1
    },
  })

  const { ref: intersection, entry } = useInView()

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  })

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-base font-normal">Avaliações mais recentes</h1>
      <ul className="list-none flex flex-col gap-3">
        {data?.pages.flatMap((page, i, arr1) =>
          page.map((rating, j, arr2) => (
            <li
              key={rating.id}
              ref={
                i === arr1.length - 1 && j === arr2.length - 1
                  ? intersection
                  : undefined
              }
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
          )),
        )}
      </ul>
    </section>
  )
}
