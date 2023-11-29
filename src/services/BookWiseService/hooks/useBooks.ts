import { useQuery } from 'react-query'
import { BookWiseService } from '..'
import { Genre } from '../schemas'

export function useBooks(category?: Genre) {
  const query = useQuery(['books', category], async () => {
    return await BookWiseService.getBooks({ category })
  })

  return query
}
