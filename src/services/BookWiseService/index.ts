import { localApi } from '@/lib/axios'
import { Category } from '@prisma/client'
import {
  BookResponse,
  CategoryResponse,
  RatingResponse,
  SingleUserResponse,
} from './types'

export class BookWiseService {
  private static bookwiseApi = localApi

  static async getRatings({
    page = 1,
    includeUser = false,
    includeBook = false,
  } = {}): Promise<RatingResponse | null> {
    try {
      const { data } = await this.bookwiseApi.get<RatingResponse>('ratings', {
        params: { page, includeUser, includeBook },
      })
      return data
    } catch (error) {
      console.error(error)

      return null
    }
  }

  static async getUser(id: string): Promise<SingleUserResponse | null> {
    try {
      const { data } = await this.bookwiseApi.get<SingleUserResponse>(
        `users/${id}`,
      )

      return data
    } catch (error) {
      console.error(error)

      return null
    }
  }

  static async getBooks({
    page,
    perPage,
    category,
    includeRatings = false,
    includeCategories = false,
    orderBy,
  }: {
    page?: number
    perPage?: number
    category?: Category['name']
    includeRatings?: boolean
    includeCategories?: boolean
    orderBy?: 'popular'
  } = {}): Promise<BookResponse | null> {
    try {
      const { data } = await this.bookwiseApi.get<BookResponse>('books', {
        params: {
          page,
          perPage,
          category,
          includeRatings,
          includeCategories,
          orderBy,
        },
      })

      return data
    } catch (error) {
      console.error(error)

      return null
    }
  }

  static async getCategories(): Promise<CategoryResponse | null> {
    try {
      const { data } =
        await this.bookwiseApi.get<CategoryResponse>('categories')

      return data
    } catch (error) {
      console.error(error)

      return null
    }
  }
}
