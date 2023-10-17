import { Book } from './Book'
import { Rating } from './Rating'

export interface RatingWithBook extends Omit<Rating, 'book_id'> {
  book: Book
}
