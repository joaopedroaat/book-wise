import { Avatar } from '@/components/Avatar'
import { LoginDialog } from '@/components/LoginDialog'
import { StarRating } from '@/components/StarRating'
import { BookWithRatings } from '@/services/BookWiseService/types'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { useSession } from 'next-auth/react'
import { RatingForm } from './RatingForm'

type CommentSectionProps = {
  book: BookWithRatings
}

export function RatingsSection({ book }: CommentSectionProps) {
  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'

  const rateButton = (
    <button className="text-purple-100 font-bold text-sm">Avaliar</button>
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
        {isAuthenticated && <RatingForm user={session.data.user} book={book} />}
        {book.ratings.map((rating) => (
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
                    {calculateDateDistance(new Date(rating.user.created_at))}
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
