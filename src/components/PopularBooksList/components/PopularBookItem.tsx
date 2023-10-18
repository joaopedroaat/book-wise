import { BookCover } from '@/components/BookCover'
import { StarRating } from '@/components/StarRating'
import { Book } from '@/services/interfaces/models/Book'

interface PopularBookItemProps {
  book: Book
}

export function PopularBookItem({ book }: PopularBookItemProps) {
  return (
    <li className="flex gap-4 bg-gray-700 p-5 rounded-lg">
      <aside>
        <BookCover book={book} width={64} height={94} />
      </aside>
      <main className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold text-gray-100">{book.name}</h1>
          <small className="text-gray-400">{book.author}</small>
        </div>
        <StarRating rating={3} size={14} />
      </main>
    </li>
  )
}
