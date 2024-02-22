import { useQuery } from 'react-query'
import { BookWiseService } from '..'
import { Book } from '@prisma/client'

export function useRatingsOnBook(book: Book) {
  const query = useQuery(['ratings_on_book', book], async () => {
    return await new BookWiseService().getBookRatings(book.id)
  })

  return query
}
