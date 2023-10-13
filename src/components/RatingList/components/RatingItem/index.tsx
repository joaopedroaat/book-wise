import { Rating } from '@/services/BookWiseService'

interface RatingItemProps {
  rating: Rating
}

export function RatingItem({ rating }: RatingItemProps) {
  return (
    <li className="rating-card-container">
      <header>{rating.user_id}</header>
      <main>{rating.description}</main>
    </li>
  )
}
