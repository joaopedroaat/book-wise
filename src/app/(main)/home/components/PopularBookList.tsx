import { BookWiseService } from '@/services/BookWiseService'
import Link from 'next/link'
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'
import MarqueeText from '@/components/MarqueeText'
import { StarRating } from '@/components/StarRating'
import { Book } from '@/services/interfaces/models/Book'
import { BookOverlay } from '@/components/BookOverlay'

export async function PopularBooksList() {
  const popularBooks = await BookWiseService.getPopularBooks()

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

      <ul className="flex flex-col gap-3">
        {popularBooks.map((book) => (
          <PopularBookItem key={book.id} book={book} />
        ))}
      </ul>
    </section>
  )
}

interface PopularBookItemProps {
  book: Book
}

export function PopularBookItem({ book }: PopularBookItemProps) {
  return (
    <li className="flex gap-4 bg-gray-700 p-5 rounded-lg">
      <BookOverlay book={book} width={64} height={94} />
      <main className="flex flex-col justify-between overflow-hidden whitespace-nowrap">
        <div className="flex flex-col">
          <MarqueeText className="font-bold text-gray-100">
            {book.name}
          </MarqueeText>
          <small className="text-gray-400">{book.author}</small>
        </div>
        <StarRating rating={3} size={14} />
      </main>
    </li>
  )
}
