import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import { v4 as uuidv4 } from 'uuid'

interface StarRatingProps {
  rating: number
  size?: number
}

export function StarRating({ rating, size = 20 }: StarRatingProps) {
  return (
    <ul className="flex gap-1">
      {new Array(5).fill(null).map((_, index) => (
        <li
          key={uuidv4()}
          className="flex items-center list-none gap-1 text-purple-100"
        >
          {index + 1 <= Math.floor(rating) ? (
            <Star size={size} weight="fill" />
          ) : (
            <Star size={size} />
          )}
        </li>
      ))}
    </ul>
  )
}
