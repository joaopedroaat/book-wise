import axios, { AxiosInstance } from 'axios'
import { Genre } from './schemas'
import {
  AverageRatingResponse,
  BookRatingsResponse,
  BooksResponse,
  CategoriesOnBookResponse,
  CategoriesResponse,
  PostRating,
  PostReading,
  RatingsResponse,
  ReadingsResponse,
  SingleRatingResponse,
  SingleReadingResponse,
  SingleUserResponse,
  UserProfileResponse,
  UserRatingsResponse,
} from './types'

export class BookWiseService {
  private http: AxiosInstance
  private baseUrl = new URL('api', process.env.NEXT_PUBLIC_BASE_URL).toString()

  constructor() {
    this.http = axios.create({
      baseURL: this.baseUrl,
    })
  }

  // GET - User
  async getUser(userId: string) {
    const { data } = await this.http.get<SingleUserResponse>(`/users/${userId}`)

    return data.user
  }

  async getUserProfile(userId: string) {
    const { data } = await this.http.get<UserProfileResponse>(
      `/users/${userId}/profile`,
    )

    return data.profile
  }

  async getUserReadings(userId: string) {
    const { data } = await this.http.get<ReadingsResponse>(
      `/users/${userId}/readings`,
    )

    return data.readings
  }

  // GET - Ratings
  async getRatings(params: { page?: number } = { page: 1 }) {
    const { data } = await this.http.get<RatingsResponse>('ratings', {
      params,
    })

    return data.ratings
  }

  async getBookRatings(bookId: string, params: { page: number } = { page: 1 }) {
    const { data } = await this.http.get<BookRatingsResponse>(
      `books/${bookId}/ratings`,
      {
        params,
      },
    )

    return data.ratings
  }

  async getUserRatings(id: string) {
    const { data } = await this.http.get<UserRatingsResponse>(
      `users/${id}/ratings`,
    )

    return data.ratings
  }

  async getAverageRating(bookId: string) {
    const { data } = await this.http.get<AverageRatingResponse>(
      `books/${bookId}/ratings/average`,
    )

    return data.average
  }

  // GET - Categories
  async getCategories(bookId?: string) {
    const { data } = bookId
      ? await this.http.get<CategoriesOnBookResponse>(
          `/books/${bookId}/categories`,
        )
      : await this.http.get<CategoriesResponse>('categories')

    return data.categories
  }

  // GET - Books
  async getBooks(
    params: {
      page?: number
      perPage?: number
      category?: Genre
      orderBy?: 'popular'
    } = {},
  ) {
    const { data } = await this.http.get<BooksResponse>('books', {
      params,
    })

    return data.books
  }

  // POST - Rating
  async postRating(rating: PostRating['rating']) {
    const { data } = await this.http.post<SingleRatingResponse>('ratings', {
      rating,
    } as PostRating)

    return data.rating
  }

  // POST - Reading
  async postReading({ userId, bookId }: { userId: string; bookId: string }) {
    const { data } = await this.http.post<SingleReadingResponse>(
      `/users/${userId}/readings`,
      { bookId } as PostReading,
    )

    return data.reading
  }

  // DELETE - Rating
  async deleteRating({ ratingId }: { ratingId: string }) {
    const { data } = await this.http.delete<SingleRatingResponse>(
      `/ratings/${ratingId}`,
    )

    return data.rating
  }
}
