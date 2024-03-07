import { GetBooksResponse } from '@/app/api/books/route'
import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { ExploreSkeleton } from '@/components/skeletons/ExploreSkeleton'
import { appApi } from '@/lib/axios'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'

export function BookList({ category }: { category?: string }) {
  const {
    data: books,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['books', category],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await appApi.get<GetBooksResponse>('/books', {
        params: {
          page: pageParam,
          category,
        },
      })

      return response.data
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.books.length) return allPages.length + 1
    },
  })

  const { ref: intersection, inView } = useInView()
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  })

  if (isLoading) return <ExploreSkeleton />

  if (!books) return

  return (
    <ul className="flex flex-wrap gap-5 justify-center">
      {books.pages.flatMap((page, i, arr1) =>
        page.books.map((book, j, arr2) => (
          <div
            key={book.id}
            ref={
              arr1.length - 1 === i && arr2.length - 1 === j
                ? intersection
                : undefined
            }
            className="bg-gray-700 px-5 py-4 w-36 flex flex-col items-center sm:items-end gap-2 sm:flex sm:flex-row sm:gap-5 sm:w-80 rounded-lg"
          >
            <BookOverlay book={book} />
            <div className="flex flex-col items-center gap-2 sm:items-start sm:justify-between h-full">
              <div className="flex flex-col gap-0 text-center sm:text-left">
                <h1 className="font-bold text-gray-100">{book.name}</h1>
                <small className="text-gray-400">{book.author}</small>
              </div>
              <StarRating type="book" bookId={book.id} size={16} />
            </div>
          </div>
        )),
      )}
    </ul>
  )
}
