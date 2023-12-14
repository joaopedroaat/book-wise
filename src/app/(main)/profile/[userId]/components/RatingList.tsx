'use client'

import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { RatingWithBook } from '@/services/BookWiseService/types'

type RatingList = {
  ratings: RatingWithBook[]
}

export function RatingList({ ratings }: RatingList) {
  return (
    <section>
      <h2 className="mb-4">Avaliações</h2>
      <ul className="flex flex-col gap-6">
        {!ratings.length && (
          <p className="text-gray-400">Você ainda não fez nenhuma avaliação</p>
        )}
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
                  <StarRating rate={rating.book} size="1rem" />
                </div>
              </div>
            </div>
            <p className="text-gray-300">{rating.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
