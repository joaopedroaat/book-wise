'use client'

import { BookRateResponse } from '@/app/api/books/[id]/rate/route'
import { appApi } from '@/lib/axios'
import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import { useQuery } from 'react-query'
import { v4 as uuidv4 } from 'uuid'

type BookRating = {
  type: 'book'
  bookId: string
}

type ValueRating = {
  type: 'value'
  rate: number
}

type StarRatingProps = (BookRating | ValueRating) & {
  size?: number | string
}

export function StarRating({ size = 20, ...rating }: StarRatingProps) {
  const { data: averageRating } = useQuery(['ratings', rating], async () => {
    if (rating.type === 'value') return rating.rate

    const { status, data } = await appApi.get<BookRateResponse>(
      `/books/${rating.bookId}/rate`,
    )

    if (status !== 200) return

    return data.rate
  })

  return (
    <ul className="flex gap-1">
      {new Array(5).fill(null).map((_, index) => (
        <li
          key={uuidv4()}
          className="flex items-center list-none gap-1 text-purple-100"
        >
          {index + 1 <= Math.floor(averageRating || 0) ? (
            <Star size={size} weight="fill" />
          ) : (
            <Star size={size} />
          )}
        </li>
      ))}
    </ul>
  )
}
