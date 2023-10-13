import { getApplicationUrl } from '@/utils/getApplicationUrl'
import axios from 'axios'

export interface Rating {
  id: string
  rate: number
  description: string
  created_at: Date
  book_id: string
  user_id: string
}

export class BookWiseService {
  private static bookwiseApi = axios.create({
    baseURL: getApplicationUrl() + '/api',
  })

  static async getRatings(page: number): Promise<Rating[]> {
    const { data } = await this.bookwiseApi.get('ratings', { params: { page } })
    const ratings = data.ratings as Rating[]

    return ratings
  }
}
