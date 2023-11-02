import {
  Book,
  BookWithCategories,
  BookWithRatings,
  BookWithRatingsAndCategories,
} from '../models/Book'

export interface BookResponse {
  books:
    | Book[]
    | BookWithRatings[]
    | BookWithCategories[]
    | BookWithRatingsAndCategories[]
}
