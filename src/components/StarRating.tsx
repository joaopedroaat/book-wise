'use client'

import { BookWiseService } from '@/services/BookWiseService'
import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import { Book } from '@prisma/client'
import { useQuery } from 'react-query'
import { v4 as uuidv4 } from 'uuid'

type BookRating = {
  type: 'book'
  book: Book
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
    return rating.type === 'book'
      ? await new BookWiseService().getAverageRating(rating.book.id)
      : rating.rate
  })

  return (
    averageRating && (
      <ul className="flex gap-1">
        {new Array(5).fill(null).map((_, index) => (
          <li
            key={uuidv4()}
            className="flex items-center list-none gap-1 text-purple-100"
          >
            {index + 1 <= Math.floor(averageRating) ? (
              <Star size={size} weight="fill" />
            ) : (
              <Star size={size} />
            )}
          </li>
        ))}
      </ul>
    )
  )
}
