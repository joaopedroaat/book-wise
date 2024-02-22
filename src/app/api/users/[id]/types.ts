import { Rating, User } from '@prisma/client'
import { Category } from '../../categories/category.schema'

export type UserResponse = {
  user: User & { ratings?: Rating[] }
  stats: {
    totalReviewedBooks: number
    totalReviewedAuthors: number
    mostReviewedCategory: Category['name']
  }
}
