import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import { v4 as uuidv4 } from 'uuid'
import './styles.css'

interface StarRatingProps {
  rating: number
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <ul className="star-rating-container">
      {new Array(5).fill(null).map((_, index) => (
        <li key={uuidv4()}>
          {index + 1 <= Math.floor(rating) ? (
            <Star size={20} weight="fill" />
          ) : (
            <Star size={20} />
          )}
        </li>
      ))}
    </ul>
  )
}
