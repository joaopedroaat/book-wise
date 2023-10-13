import { BookCover } from '@/components/BookCover'
import { Rating } from '@/services/BookWiseService'

interface RatingItemProps {
  rating: Rating
}

export function RatingItem({ rating }: RatingItemProps) {
  return (
    <li className="rating-card-container">
      <header>
        <div className="profile"></div>
        <div className="rating"></div>
      </header>
      <main>
        <BookCover
          coverUrl={rating.book?.cover_url || ''}
          alt={`Capa do livro ${rating.book?.name}.`}
        />
      </main>
    </li>
  )
}
