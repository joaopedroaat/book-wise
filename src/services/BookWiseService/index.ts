import { PostRating } from '@/app/api/ratings/route'
import { localApi } from '@/lib/axios'
import { Book, Category } from '@prisma/client'
import {
  BookResponse,
  BookWithCategories,
  BookWithRatings,
  BookWithRatingsAndCategories,
  CategoryResponse,
  Rating,
  RatingResponse,
  RatingWithBook,
  RatingWithBookAndUser,
  RatingWithUser,
  RatingsResponse,
  SingleBookResponse,
  SingleUserResponse,
} from './types'

export class BookWiseService {
  private static bookwiseApi = localApi

  static async getRatings({
    page = 1,
    includeUser = false,
    includeBook = false,
  } = {}): Promise<
    | Rating[]
    | RatingWithBook[]
    | RatingWithUser[]
    | RatingWithBookAndUser[]
    | null
  > {
    try {
      const { data } = await this.bookwiseApi.get<RatingsResponse>('ratings', {
        params: { page, includeUser, includeBook },
      })
      return data.ratings
    } catch (error) {
      console.error(error)

      return null
    }
  }

  static async getRatingsOnBook(
    bookId: string,
    { includeUser = false } = {},
  ): Promise<Rating[] | RatingWithUser[] | null> {
    try {
      const { data } = await this.bookwiseApi.get<RatingsResponse>(
        `ratings/${bookId}`,
        {
          params: {
            includeUser,
          },
        },
      )

      return data.ratings as Rating[]
    } catch (error) {
      console.log(error)

      return null
    }
  }

  static async postRating(rating: PostRating): Promise<RatingResponse | null> {
    try {
      const { data } = await this.bookwiseApi.post<RatingResponse>(
        'ratings',
        rating,
      )

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

  static async getBook(
    id: string,
    { includeRatings = false, includeCategories = false } = {},
  ): Promise<SingleBookResponse | null> {
    try {
      const { data } = await this.bookwiseApi.get<SingleBookResponse | null>(
        `books/${id}`,
        { params: { includeRatings, includeCategories } },
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
  } = {}): Promise<
    | Book[]
    | BookWithRatings[]
    | BookWithCategories[]
    | BookWithRatingsAndCategories[]
    | null
  > {
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

      return data.books
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
