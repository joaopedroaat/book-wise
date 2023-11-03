import { localApi } from '@/lib/axios'
import { Category } from '@prisma/client'
import { BookResponse, CategoryResponse, RatingResponse, User } from './types'

export class BookWiseService {
  private static bookwiseApi = localApi

  static async getRatings({
    page = 1,
    includeUser = false,
    includeBook = false,
  } = {}): Promise<RatingResponse> {
    const { data } = await this.bookwiseApi.get<RatingResponse>('ratings', {
      params: { page, includeUser, includeBook },
    })
    return data
  }

  static async getUser(id: string): Promise<User | null> {
    const { data } = await this.bookwiseApi.get(`users/${id}`)
    const user = data.user as User

    return user
  }

  static async getBooks({
    category,
    includeRatings = false,
    includeCategories = false,
    orderBy,
  }: {
    category?: Category['name']
    includeRatings?: boolean
    includeCategories?: boolean
    orderBy?: 'popular'
  } = {}): Promise<BookResponse> {
    const { data } = await this.bookwiseApi.get<BookResponse>('books', {
      params: { category, includeRatings, includeCategories, orderBy },
    })

    return data
  }

  static async getCategories(): Promise<CategoryResponse> {
    const { data } = await this.bookwiseApi.get<CategoryResponse>('categories')

    return data
  }
}
