import { BookCover } from '@/components/BookCover'
import MarqueeText from '@/components/MarqueeText'
import { StarRating } from '@/components/StarRating'
import { Book } from '@/services/interfaces/models/Book'

interface PopularBookItemProps {
  book: Book
}

export function PopularBookItem({ book }: PopularBookItemProps) {
  return (
    <li className="flex gap-4 bg-gray-700 p-5 rounded-lg">
      <BookCover book={book} width={64} height={94} />
      <main className="flex flex-col justify-between overflow-hidden whitespace-nowrap">
        <div className="flex flex-col">
          <MarqueeText className="font-bold text-gray-100">
            {book.name}
          </MarqueeText>
          <small className="text-gray-400">{book.author}</small>
        </div>
        <StarRating rating={3} size={14} />
      </main>
    </li>
  )
}
