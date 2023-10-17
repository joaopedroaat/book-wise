import { Book } from './Book'
import { Rating } from './Rating'
import { User } from './User'

export interface RatingWithBookAndUser
  extends Omit<Rating, 'book_id' | 'user_id'> {
  book: Book
  user: User
}
