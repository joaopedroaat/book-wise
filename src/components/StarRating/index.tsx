import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import { v4 as uuidv4 } from 'uuid'
import './styles.css'

interface StarRatingProps {
  rating: number
  size?: number
}

export function StarRating({ rating, size = 20 }: StarRatingProps) {
  return (
    <ul className="star-rating-container">
      {new Array(5).fill(null).map((_, index) => (
        <li key={uuidv4()}>
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
