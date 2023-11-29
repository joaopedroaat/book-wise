import { localApi } from '@/lib/axios'
import {
  AverageRatingResponse,
  BookRatingsResponse,
  BooksResponse,
  CategoriesOnBookResponse,
  CategoriesResponse,
  Category,
  PostRating,
  PostReading,
  RatingsResponse,
  ReadingsResponse,
  SingleRatingResponse,
  SingleReadingResponse,
  SingleUserResponse,
  UserRatingsResponse,
  UserStatsResponse,
} from './types'

export class BookWiseService {
  private static bookwiseApi = localApi

  // GET - User
  static async getUser(userId: string) {
    const { data } = await this.bookwiseApi.get<SingleUserResponse>(
      `/users/${userId}`,
    )

    return data.user
  }

  static async getUserStats(userId: string) {
    const { data } = await this.bookwiseApi.get<UserStatsResponse>(
      `/users/${userId}/stats`,
    )

    return data.stats
  }

  static async getUserReadings(userId: string) {
    const { data } = await this.bookwiseApi.get<ReadingsResponse>(
      `/users/${userId}/readings`,
    )

    return data.readings
  }

  // GET - Ratings
  static async getRatings(params: { page?: number } = { page: 1 }) {
    const { data } = await this.bookwiseApi.get<RatingsResponse>('ratings', {
      params,
    })

    return data.ratings
  }

  static async getBookRatings(
    bookId: string,
    params: { page: number } = { page: 1 },
  ) {
    const { data } = await this.bookwiseApi.get<BookRatingsResponse>(
      `books/${bookId}/ratings`,
      {
        params,
      },
    )

    return data.ratings
  }

  static async getUserRatings(id: string) {
    const { data } = await this.bookwiseApi.get<UserRatingsResponse>(
      `users/${id}/ratings`,
    )

    return data.ratings
  }

  static async getAverageRating(bookId: string) {
    const { data } = await this.bookwiseApi.get<AverageRatingResponse>(
      `books/${bookId}/ratings/average`,
    )

    return data.average
  }

  // GET - Categories
  static async getCategories(bookId?: string) {
    const { data } = bookId
      ? await this.bookwiseApi.get<CategoriesOnBookResponse>(
          `/books/${bookId}/categories`,
        )
      : await this.bookwiseApi.get<CategoriesResponse>('categories')

    return data.categories
  }

  // GET - Books
  static async getBooks(
    params: {
      page?: number
      perPage?: number
      category?: Category['name']
      orderBy?: 'popular'
    } = {},
  ) {
    const { data } = await this.bookwiseApi.get<BooksResponse>('books', {
      params,
    })

    return data.books
  }

  // POST - Rating

  static async postRating(rating: PostRating['rating']) {
    const { data } = await this.bookwiseApi.post<SingleRatingResponse>(
      'ratings',
      {
        rating,
      } as PostRating,
    )

    return data.rating
  }

  // POST - Reading

  static async postReading({
    userId,
    bookId,
  }: {
    userId: string
    bookId: string
  }) {
    const { data } = await this.bookwiseApi.post<SingleReadingResponse>(
      `/users/${userId}/readings`,
      { bookId } as PostReading,
    )

    return data.reading
  }
}
