import { Avatar } from '@/components/Avatar'
import { LoginDialog } from '@/components/LoginDialog'
import { StarRating } from '@/components/StarRating'
import { BookWiseService } from '@/services/BookWiseService'
import { Book, RatingWithUser } from '@/services/BookWiseService/types'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { RatingForm } from './RatingForm'

type CommentSectionProps = {
  book: Book
}

export function RatingsSection({ book }: CommentSectionProps) {
  const { data: ratings } = useQuery({
    queryKey: ['ratings_on_book'],
    queryFn: async () => {
      const ratings = await BookWiseService.getRatingsOnBook(book.id, {
        includeUser: true,
      })

      if (!ratings) throw new Error(`Failed to fetch ${book.name} ratings.`)

      return ratings as RatingWithUser[]
    },
  })

  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'

  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false)

  const rateButton = (
    <button
      className="text-purple-100 font-bold text-sm"
      onClick={
        !isRatingFormVisible ? () => setIsRatingFormVisible(true) : undefined
      }
    >
      Avaliar
    </button>
  )

  return (
    <section className="mt-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <small>Avaliações</small>
        {isAuthenticated ? (
          rateButton
        ) : (
          <LoginDialog description="Faça login para deixar sua avaliação">
            {rateButton}
          </LoginDialog>
        )}
      </div>

      <ul className="flex flex-col gap-3">
        {isAuthenticated && isRatingFormVisible && (
          <RatingForm
            user={session.data.user}
            book={book}
            onAbort={() => setIsRatingFormVisible(false)}
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
                  <Avatar
                    user={{
                      id: rating.user.id,
                      name: rating.user.name,
                      avatarUrl: rating.user.avatar_url,
                    }}
                  />
                  <div>
                    <p className="font-bold text-sm">{rating.user.name}</p>
                    <small className="text-gray-400">
                      {calculateDateDistance(new Date(rating.created_at))}
                    </small>
                  </div>
                </div>
                <StarRating rating={rating.rate} size={14} />
              </div>
              <p>{rating.description}</p>
            </li>
          ))}
      </ul>
    </section>
  )
}