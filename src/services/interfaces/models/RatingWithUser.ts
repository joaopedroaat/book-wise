import { Rating } from './Rating'
import { User } from './User'

export interface RatingWithUser extends Omit<Rating, 'user_id'> {
  user: User
}
