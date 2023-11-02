import { localApi } from '@/lib/axios'
import { Rating } from './interfaces/models/Rating'
import { RatingWithBook } from './interfaces/models/RatingWithBook'
import { RatingWithBookAndUser } from './interfaces/models/RatingWithBookAndUser'
import { RatingWithUser } from './interfaces/models/RatingWithUser'
import { User } from './interfaces/models/User'
import { RatingResponse } from './interfaces/responses/RatingResponse'
import {
  Book,
  BookWithCategories,
  BookWithRatings,
  BookWithRatingsAndCategories,
} from './interfaces/models/Book'
import { BookResponse } from './interfaces/responses/BookResponse'
import { Category } from './interfaces/models/Category'
import { CategoryResponse } from './interfaces/responses/CategoryResponse'

export class BookWiseService {
  private static bookwiseApi = localApi

  static async getRatings({
    page = 1,
    includeUsers = false,
    includeBooks = false,
  } = {}): Promise<
    Rating[] | RatingWithBook[] | RatingWithUser[] | RatingWithBookAndUser[]
  > {
    const { data } = await this.bookwiseApi.get<RatingResponse>('ratings', {
      params: { page, includeUsers, includeBooks },
    })
    const ratings = data.ratings

    return ratings
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
  }: {
    category?: Category['name']
    includeRatings?: boolean
    includeCategories?: boolean
  } = {}): Promise<
    | Book[]
    | BookWithRatings[]
    | BookWithCategories[]
    | BookWithRatingsAndCategories[]
  > {
    const { data } = await this.bookwiseApi.get<BookResponse>(
      `books?includeRatings=${includeRatings}&includeCategories=${includeCategories}${
        category ? `&category=${category}` : ''
      }`,
    )

    const books = data.books
    return books
  }

  static async getPopularBooks(): Promise<Book[]> {
    const { data } = await this.bookwiseApi.get<BookResponse>(`books/popular`)
    const popularBooks = data.books

    return popularBooks
  }

  static async getCategories(): Promise<Category[]> {
    const { data } = await this.bookwiseApi.get<CategoryResponse>('categories')
    const categories = data.categories

    return categories
  }
}
