import { PutRating } from '@/app/api/ratings/[id]/route'
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
  User,
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

  static async postRating(rating: PostRating): Promise<Rating> {
    const { data } = await this.bookwiseApi.post<RatingResponse>(
      'ratings',
      rating,
    )

    return data.rating
  }

  static async putRating(
    ratingId: string,
    newRating: PutRating,
  ): Promise<Rating> {
    const { data } = await this.bookwiseApi.put<RatingResponse>(
      `ratings/${ratingId}`,
      newRating,
    )

    return data.rating
  }

  static async getUser(id: string): Promise<User> {
    const { data } = await this.bookwiseApi.get<SingleUserResponse>(
      `users/${id}`,
    )

    return data.user
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

    return data.book
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

    return data.books
  }

  static async getCategories(): Promise<Category[]> {
    const { data } = await this.bookwiseApi.get<CategoryResponse>('categories')

    return data.categories
  }
}
