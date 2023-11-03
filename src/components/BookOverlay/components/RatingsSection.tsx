import { Avatar } from '@/components/Avatar'
import { StarRating } from '@/components/StarRating'
import { RatingWithUser } from '@/services/BookWiseService/types'
import { calculateDateDistance } from '@/utils/calculateDateDistance'

type CommentSectionProps = {
  ratings: RatingWithUser[]
}

export function RatingsSection({ ratings }: CommentSectionProps) {
  return (
    <section className="mt-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <small>Avaliações</small>
        <button className="text-purple-100 font-bold text-sm">Avaliar</button>
      </div>

      <ul className="flex flex-col gap-3">
        {ratings.map((rating) => (
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
