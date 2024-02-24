import { GetBooksResponse } from '@/app/api/books/route'
import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { appApi } from '@/lib/axios'
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'
import { Book, Category, Rating } from '@prisma/client'
import Link from 'next/link'

async function fetchPopularBooks() {
  const { status, data } = await appApi.get<GetBooksResponse>('/books', {
    params: {
      perPage: 4,
      orderBy: 'popular',
      ratings: true,
      categories: true,
    },
  })

  if (status !== 200) return

  return data.books as (Book & { ratings: Rating[]; categories: Category[] })[]
}

export async function PopularBooks() {
  const popularBooks = await fetchPopularBooks()

  if (!popularBooks) return <p>Failed to fetch popular books</p>

  return (
    <section className="w-full">
      <header className="flex items-center justify-between mb-4">
        <h1 className="font-normal text-base">Livros populares</h1>
        <Link
          className="text-purple-100 font-bold flex items-center gap-2"
          href="explore"
        >
          Ver todos
          <CaretRight size={16} weight="bold" />
        </Link>
      </header>
      <main>
        <ul className="flex flex-col gap-3">
          {popularBooks.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </ul>
      </main>
    </section>
  )
}

export function BookItem({
  book,
}: {
  book: Book & { ratings: Rating[]; categories: Category[] }
}) {
  return (
    <li className="flex gap-4 bg-gray-700 p-5 rounded-lg">
      <BookOverlay book={book} width={64} height={94} />
      <main className="flex flex-col justify-between overflow-hidden whitespace-nowrap">
        <div className="flex flex-col">
          <h1 className="font-bold text-gray-100">{book.name}</h1>
          <small className="text-gray-400">{book.author}</small>
        </div>
        <StarRating type="book" book={book} size={14} />
      </main>
    </li>
  )
}
