import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { prisma } from '@/lib/prisma'
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'
import Link from 'next/link'

async function fetchPopularBooks() {
  const popularBooks = await prisma.book.findMany({
    take: 4,
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
    include: {
      ratings: true,
      categories: true,
    },
  })

  return popularBooks
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
            <li key={book.id} className="flex gap-4 bg-gray-700 p-5 rounded-lg">
              <BookOverlay book={book} width={64} height={94} />
              <main className="flex flex-col justify-between overflow-hidden whitespace-nowrap">
                <div className="flex flex-col">
                  <h1 className="font-bold text-gray-100">{book.name}</h1>
                  <small className="text-gray-400">{book.author}</small>
                </div>
                <StarRating type="book" bookId={book.id} size={14} />
              </main>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}
