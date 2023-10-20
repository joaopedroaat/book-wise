import { Book } from './Book'
import { Rating } from './Rating'

export interface BookWithRatings extends Book {
  ratings: Rating[]
}
