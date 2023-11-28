import { Avatar } from '@/components/Avatar'
import { StarRating } from '@/components/StarRating'
import { useRatingsOnBook } from '@/services/BookWiseService/hooks/useRatingsOnBook'
import { Book } from '@/services/BookWiseService/types'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { CircleNotch } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { RatingForm } from '../RatingForm'
import { Header } from './components/Header'

type RatingFeed = {
  book: Book
}

export function RatingFeed({ book }: RatingFeed) {
  const [{ data: ratings, isLoading }, { mutateAsync }] = useRatingsOnBook(book)

  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'

  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false)

  return (
    <section className="mt-4 flex flex-col gap-4">
      <Header
        isAuthenticated={isAuthenticated}
        setRatingFormVisibility={setIsRatingFormVisible}
      />

      <ul className="flex flex-col gap-3">
        {isAuthenticated && isRatingFormVisible && (
          <RatingForm
            user={session.data.user}
            book={book}
            mutation={mutateAsync}
            onAbort={() => setIsRatingFormVisible(false)}
          />
        )}
        {isLoading && (
          <div className="w-full flex justify-center">
            <CircleNotch className="animate-spin" size={32} />
          </div>
        )}
        {!isLoading &&
          ratings &&
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
    </section>
  )
}
