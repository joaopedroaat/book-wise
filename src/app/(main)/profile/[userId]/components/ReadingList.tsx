'use client'

import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { ReadingWithBook } from '@/services/BookWiseService/types'

type ReadingListProps = {
  readings: ReadingWithBook[]
}

export function ReadingList({ readings }: ReadingListProps) {
  return (
    <section>
      <h2 className="mb-4">Últimas leituras</h2>
      <ul className="flex gap-6">
        {readings.map((reading) => (
          <li
            key={reading.id}
            className="bg-gray-700 p-4 rounded-lg flex flex-col items-center gap-2"
          >
            <BookOverlay book={reading.book} />
            <strong className="text-center">{reading.book.name}</strong>
            <StarRating type="book" book={reading.book} size={16} />
          </li>
        ))}
      </ul>
    </section>
  )
}
