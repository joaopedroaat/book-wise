import { useInfiniteQuery } from 'react-query'
import { BookWiseService } from '..'
import { Genre } from '../schemas'

export function useBooks(
  options: {
    category?: Genre
    page?: number
    perPage?: number
    orderBy?: 'popular'
  } = {
    page: 1,
    perPage: 10,
  },
) {
  const query = useInfiniteQuery(
    ['books', options],
    async () => {
      return await new BookWiseService().getBooks(options)
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === options.perPage ? ++pages.length : undefined
      },
    },
  )

  return query
}
