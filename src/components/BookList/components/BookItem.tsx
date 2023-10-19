import { BookCover } from '@/components/BookCover'
import { StarRating } from '@/components/StarRating'
import { Book } from '@/services/interfaces/models/Book'

interface BookItemProps {
  book: Book
}

export function BookItem({ book }: BookItemProps) {
  return (
    <li className="bg-gray-700 px-5 py-4 flex flex-col items-center sm:items-end gap-2 sm:flex sm:flex-row sm:gap-5 rounded-lg w-80">
      <BookCover book={book} />
      <div className="flex flex-col items-center gap-2 sm:items-start sm:justify-between h-full">
        <div className="flex flex-col gap-0 text-center sm:text-left">
          <h1 className="font-bold text-gray-100">{book.name}</h1>
          <small className="text-gray-400">{book.author}</small>
        </div>
        <StarRating rating={4} size={16} />
      </div>
    </li>
  )
}
