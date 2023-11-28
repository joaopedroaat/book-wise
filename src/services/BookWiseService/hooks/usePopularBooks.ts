import { useQuery } from 'react-query'
import { BookWiseService } from '..'
import { BookWithRatingsAndCategories } from '../types'

export function usePopularBooks() {
  const query = useQuery('popular_books', async () => {
    const books = await BookWiseService.getBooks({
      perPage: 4,
      includeRatings: true,
      includeCategories: true,
      orderBy: 'popular',
    })

    return books as BookWithRatingsAndCategories[]
  })

  return [query]
}
