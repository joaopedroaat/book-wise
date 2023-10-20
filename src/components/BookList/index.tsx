import { Book } from '@/services/interfaces/models/Book'
import { BookItem } from './components/BookItem'

interface BookListProps {
  books: Book[]
}

export function BookList({ books }: BookListProps) {
  return (
    <>
      <ul className="flex flex-wrap gap-5 justify-start">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </ul>
    </>
  )
}
