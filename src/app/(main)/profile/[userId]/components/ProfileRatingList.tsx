import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { RatingWithBook } from '@/services/BookWiseService/types'

type ProfileRatingListProps = {
  ratings: RatingWithBook[]
}

export function ProfileRatingList({ ratings }: ProfileRatingListProps) {
  return (
    <ul className="flex flex-col gap-6">
      {ratings.map((rating) => (
        <li
          key={rating.id}
          className="bg-gray-700 p-6 rounded-lg flex flex-col gap-6"
        >
          <div className="flex gap-6">
            <BookOverlay book={rating.book} />
            <div className="flex flex-col">
              <strong>{rating.book.name}</strong>
              <small className="text-gray-400">{rating.book.author}</small>
              <div className="mt-auto">
                <StarRating rating={5} size={16} />
              </div>
            </div>
          </div>
          <p>{rating.description}</p>
        </li>
      ))}
    </ul>
  )
}
