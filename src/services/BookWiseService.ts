import { getApplicationUrl } from '@/utils/getApplicationUrl'
import axios from 'axios'

export interface User {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  created_at: string
}

export interface Book {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: string
}

export interface Rating {
  id: string
  rate: number
  description: string
  created_at: string
  book?: Book
  user?: User
}

export class BookWiseService {
  private static bookwiseApi = axios.create({
    baseURL: getApplicationUrl() + '/api',
  })

  static async getRatings({
    page = 1,
    includeUsers = false,
    includeBooks = false,
  } = {}): Promise<Rating[]> {
    const { data } = await this.bookwiseApi.get('ratings', {
      params: { page, includeUsers, includeBooks },
    })
    const ratings = data.ratings as Rating[]

    return ratings
  }
}
