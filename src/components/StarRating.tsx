'use_client'

import { BookWiseService } from '@/services/BookWiseService'
import { Book } from '@/services/BookWiseService/types'
import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import { useQuery } from 'react-query'
import { v4 as uuidv4 } from 'uuid'

type StarRatingProps = {
  rate: number | Book
  size?: number | string
}

export function StarRating({ rate, size = 20 }: StarRatingProps) {
  const { data: averageRating } = useQuery(['ratings', rate], async () => {
    if (typeof rate === 'object') {
      return await new BookWiseService().getAverageRating(rate.id)
    }

    return rate
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
