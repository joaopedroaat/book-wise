import { BookOverlay } from '@/components/BookOverlay'
import { InfiniteScroll } from '@/components/InfiniteScroll'
import { StarRating } from '@/components/StarRating'
import { useBooks } from '@/services/BookWiseService/hooks/useBooks'
import { Genre } from '@/services/BookWiseService/schemas'
import { BookWithRatingsAndCategories } from '@/services/BookWiseService/types'

type BookListProps = {
  category?: Genre
}

export function BookList({ category }: BookListProps) {
  const { data, fetchNextPage, hasNextPage } = useBooks({
    category,
  })

  const books = data?.pages.flatMap((page) => page)

  return (
    <>
      <InfiniteScroll fetchMore={fetchNextPage} hasMore={!!hasNextPage}>
        <ul className="flex flex-wrap gap-5 justify-center">
          {books?.map((book) => <BookItem key={book.id} book={book} />)}
        </ul>
      </InfiniteScroll>
    </>
  )
}

type BookItemProps = {
  book: BookWithRatingsAndCategories
}

export function BookItem({ book }: BookItemProps) {
  return (
    <div className="bg-gray-700 px-5 py-4 w-36 flex flex-col items-center sm:items-end gap-2 sm:flex sm:flex-row sm:gap-5 sm:w-80 rounded-lg">
      <BookOverlay book={book} />
      <div className="flex flex-col items-center gap-2 sm:items-start sm:justify-between h-full">
        <div className="flex flex-col gap-0 text-center sm:text-left">
          <h1 className="font-bold text-gray-100">{book.name}</h1>
          <small className="text-gray-400">{book.author}</small>
        </div>
        <StarRating rate={book} size={16} />
      </div>
    </div>
  )
}
