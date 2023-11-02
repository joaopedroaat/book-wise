import { BookItem } from './components/BookItem'
import { BookWithRatings } from '@/services/interfaces/models/BookWithRatings'

interface BookListProps {
  books: BookWithRatings[]
}

export function BookList({ books }: BookListProps) {
  return (
    <>
      <ul className="flex flex-wrap gap-5 justify-center">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </ul>
    </>
  )
}
