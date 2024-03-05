import { GetBooksResponse } from '@/app/api/books/route'
import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { appApi } from '@/lib/axios'
import { useQuery } from 'react-query'

export function BookList({ category }: { category?: string }) {
  const { data: books } = useQuery(['books', category], async () => {
    const { status, data } = await appApi.get<GetBooksResponse>('/books', {
      params: {
        category,
      },
    })

    if (status !== 200) return

    return data.books
  })

  if (!books) return <p>Failed to fetch books.</p>

  return (
    <ul className="flex flex-wrap gap-5 justify-center">
      {books?.map((book) => (
        <div
          key={book.id}
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
      ))}
    </ul>
  )
}
