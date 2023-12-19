import { useQuery } from 'react-query'
import { BookWiseService } from '..'
import { BookWithRatingsAndCategories } from '../types'

export function usePopularBooks() {
  const query = useQuery('popular_books', async () => {
    const books = await new BookWiseService().getBooks({
      perPage: 4,
      orderBy: 'popular',
    })

    return books as BookWithRatingsAndCategories[]
  })

  return query
}
