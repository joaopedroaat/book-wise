import { Rating } from '@/services/BookWiseService'

interface RatingItemProps {
  rating: Rating
}

export function RatingItem({ rating }: RatingItemProps) {
  return <li className="rating-card-container">{JSON.stringify(rating)}</li>
}
