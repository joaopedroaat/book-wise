import { Category } from './Category'
import { Rating } from './Rating'

export interface Book {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: string
}

export interface BookWithRatings extends Book {
  ratings: Rating[]
}

export interface BookWithCategories extends Book {
  categories: Category[]
}

export interface BookWithRatingsAndCategories
  extends BookWithCategories,
    BookWithRatings {}
