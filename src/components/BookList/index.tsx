import { BookWiseService } from '@/services/BookWiseService'
import { BookItem } from './components/BookItem'
import { Category } from '@/services/interfaces/models/Category'

interface ExploreListProps {
  category?: Category['name']
}

export async function ExploreList({ category }: ExploreListProps) {
  const books = await BookWiseService.getBooks({ category })

  return (
    <ul className="flex flex-wrap gap-5 justify-start">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  )
}
