import { useQuery } from 'react-query'
import { BookWiseService } from '..'

export function useCategories() {
  const query = useQuery('categories', async () => {
    return await BookWiseService.getCategories()
  })

  return query
}
