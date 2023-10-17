import { localApi } from '@/lib/axios'
import { Rating } from './interfaces/models/Rating'
import { RatingWithBook } from './interfaces/models/RatingWithBook'
import { RatingWithBookAndUser } from './interfaces/models/RatingWithBookAndUser'
import { RatingWithUser } from './interfaces/models/RatingWithUser'
import { User } from './interfaces/models/User'
import { RatingResponse } from './interfaces/responses/RatingResponse'

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
}
