import { Rating } from '../models/Rating'
import { RatingWithBook } from '../models/RatingWithBook'
import { RatingWithBookAndUser } from '../models/RatingWithBookAndUser'
import { RatingWithUser } from '../models/RatingWithUser'

export interface RatingResponse {
  ratings:
    | Rating[]
    | RatingWithBook[]
    | RatingWithUser[]
    | RatingWithBookAndUser[]
}
