import { BookCover } from '@/components/BookCover'
import { Rating } from '@/services/BookWiseService'
import Image from 'next/image'
import Link from 'next/link'
import './styles.css'
import { StarRating } from '@/components/StarRating'

interface RatingItemProps {
  rating: Rating
}

export function RecentRatingItem({ rating }: RatingItemProps) {
  return (
    <li className="recent-rating-item-container">
      <header>
        <Link
          href={`/book-wise/${rating.user?.id}/profile`}
          className="profile"
        >
          <Image
            src={rating.user?.image || ''}
            width={40}
            height={40}
            alt={`Foto de perfil do ${rating.user?.name}`}
          />
          <div>
            <p>{rating.user?.name}</p>
            <small>{rating.created_at}</small>
          </div>
        </Link>
        <StarRating rating={rating.rate} />
      </header>
      <main>
        <BookCover
          coverUrl={rating.book?.cover_url || ''}
          alt={`Capa do livro ${rating.book?.name}.`}
        />
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
