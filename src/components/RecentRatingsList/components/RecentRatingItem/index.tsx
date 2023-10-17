import { BookCover } from '@/components/BookCover'
import { Rating } from '@/services/BookWiseService'
import './styles.css'
import { StarRating } from '@/components/StarRating'
import { ProfilePicture } from '@/components/ProfilePicture'
import Link from 'next/link'

interface RatingItemProps {
  rating: Rating
}

export function RecentRatingItem({ rating }: RatingItemProps) {
  return (
    <li className="recent-rating-item-container">
      <header>
        <div className="rating-info">
          <ProfilePicture user={rating.user!} />
          <div>
            <Link href={`/book-wise/profile/${rating.user?.id}`}>
              {rating.user?.name}
            </Link>
            <small>{rating.created_at}</small>
          </div>
        </div>
        <StarRating rating={rating.rate} size={16} />
      </header>
      <main>
        <BookCover book={rating.book!} />
        <div className="book-details">
          <header>
            <h1>{rating.book?.name}</h1>
            <small>{rating.book?.author}</small>
          </header>
          <main>
            <p>{rating.description}</p>
          </main>
        </div>
      </main>
    </li>
  )
}
