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
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <BookOverlay book={rating.book} />
            <div className="flex flex-col items-center sm:items-start flex-grow">
              <strong>{rating.book.name}</strong>
              <small className="text-gray-400">{rating.book.author}</small>
              <div className="mt-1">
                <StarRating book={rating.book} size={16} />
              </div>
            </div>
          </div>
          <p className="text-gray-300">{rating.description}</p>
        </li>
      ))}
    </ul>
  )
}
