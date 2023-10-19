import { BookWiseService } from '@/services/BookWiseService'
import { BookItem } from './components/BookItem'

export async function ExploreList() {
  const books = await BookWiseService.getBooks()

  return (
    <ul className="flex flex-wrap gap-5 justify-start">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  )
}
