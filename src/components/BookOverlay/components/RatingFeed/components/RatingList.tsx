import { Avatar } from '@/components/Avatar'
import { StarRating } from '@/components/StarRating'
import { useRatingsOnBook } from '@/services/BookWiseService/hooks/useRatingsOnBook'
import { Book } from '@/services/BookWiseService/types'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { CircleNotch } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { RatingForm } from '../../RatingForm'

type RatingListProps = {
  book: Book
  isRatingFormVisible: boolean
  onAbort: () => void
}

export function RatingList({
  book,
  isRatingFormVisible,
  onAbort,
}: RatingListProps) {
  const [{ data: ratings, isLoading }, { mutateAsync }] = useRatingsOnBook(book)

  const user = useSession().data?.user

  if (isLoading)
    return (
      <div className="mt-12 flex justify-center">
        <CircleNotch className="animate-spin" size={32} />
      </div>
    )

  return (
    <ul className="flex flex-col gap-3">
      {user && isRatingFormVisible && (
        <RatingForm
          user={user}
          book={book}
          mutation={mutateAsync}
          onAbort={onAbort}
        />
      )}
      {ratings &&
        ratings.map((rating) => (
          <li
            className="bg-gray-700 p-6 rounded-lg flex flex-col gap-5"
            key={rating.id}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <Avatar user={rating.user} />
                <div>
                  <p className="font-bold text-sm">{rating.user.name}</p>
                  <small className="text-gray-400">
                    {calculateDateDistance(new Date(rating.createdAt))}
                  </small>
                </div>
              </div>
              <StarRating rate={rating.rate} size={14} />
            </div>
            <p>{rating.description}</p>
          </li>
        ))}
    </ul>
  )
}