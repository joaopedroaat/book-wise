import { localApi } from '@/lib/axios'
import { Book, Category } from '@prisma/client'
import {
  AverageRatingResponse,
  BookResponse,
  BookWithCategories,
  BookWithRatings,
  BookWithRatingsAndCategories,
  CategoriesOnBookResponse,
  CategoryResponse,
  Rating,
  RatingPostRequestBody,
  RatingResponse,
  RatingWithBook,
  RatingWithBookAndUser,
  RatingWithUser,
  RatingsResponse,
  Reading,
  ReadingPostRequestBody,
  ReadingResponse,
  ReadingWithBook,
  ReadingsResponse,
  SingleBookResponse,
  UserRatingsResponse,
} from './types'

export class BookWiseService {
  private static bookwiseApi = localApi

  static async getRatings({
    page = 1,
    includeUser = false,
    includeBook = false,
  } = {}): Promise<
    Rating[] | RatingWithBook[] | RatingWithUser[] | RatingWithBookAndUser[]
  > {
    const { data } = await this.bookwiseApi.get<RatingsResponse>('ratings', {
      params: { page, includeUser, includeBook },
    })
    return data.ratings
  }

  static async getRatingsOnBook(
    bookId: string,
    { includeUser = false } = {},
  ): Promise<
    Rating[] | RatingWithUser[] | RatingWithBook[] | RatingWithBookAndUser[]
  > {
    const { data } = await this.bookwiseApi.get<RatingsResponse>(
      `books/${bookId}/ratings`,
      {
        params: {
          includeUser,
        },
      },
    )

    return data.ratings
  }

  static async getAverageRating(bookId: string): Promise<number> {
    const { data } = await this.bookwiseApi.get<AverageRatingResponse>(
      `books/${bookId}/ratings/average`,
    )

    return data.average
  }

  static async getCategoriesOnBOok(bookId: string) {
    const { data } = await this.bookwiseApi.get<CategoriesOnBookResponse>(
      `/books/${bookId}/categories`,
    )

    return data.categories
  }

  static async postRating(
    rating: RatingPostRequestBody['rating'],
  ): Promise<Rating> {
    const { data } = await this.bookwiseApi.post<RatingResponse>('ratings', {
      rating,
    } as RatingPostRequestBody)

    return data.rating
  }

  static async getUserReadings(
    id: string,
    { includeBooks = false },
  ): Promise<Reading[] | ReadingWithBook[]> {
    const { data } = await this.bookwiseApi.get<ReadingsResponse>(
      `/users/${id}/readings`,
      {
        params: {
          includeBooks,
        },
      },
    )

    return data.readings as ReadingWithBook[]
  }

  static async getUserRatings(id: string): Promise<RatingWithBook[]> {
    const { data } = await this.bookwiseApi.get<UserRatingsResponse>(
      `users/${id}/ratings`,
    )

    return data.ratings as RatingWithBook[]
  }

  static async postUserReading({
    userId,
    bookId,
  }: {
    userId: string
    bookId: string
  }): Promise<Reading> {
    const { data } = await this.bookwiseApi.post<ReadingResponse>(
      `/users/${userId}/readings`,
      { bookId } as ReadingPostRequestBody,
    )

    return data.reading
  }

  static async getBook(
    id: string,
    { includeRatings = false, includeCategories = false } = {},
  ): Promise<
    Book | BookWithRatings | BookWithCategories | BookWithRatingsAndCategories
  > {
    const { data } = await this.bookwiseApi.get<SingleBookResponse>(
      `books/${id}`,
      { params: { includeRatings, includeCategories } },
    )

    return data.book as
      | Book
      | BookWithRatings
      | BookWithCategories
      | BookWithRatingsAndCategories
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
  > {
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

    return data.books as
      | Book[]
      | BookWithRatings[]
      | BookWithCategories[]
      | BookWithRatingsAndCategories[]
  }

  static async getCategories(): Promise<Category[]> {
    const { data } = await this.bookwiseApi.get<CategoryResponse>('categories')

    return data.categories
  }
}
