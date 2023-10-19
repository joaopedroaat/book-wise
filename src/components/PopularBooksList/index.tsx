import { BookWiseService } from '@/services/BookWiseService'
import Link from 'next/link'
import { PopularBookItem } from './components/PopularBookItem'
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'

export async function PopularBooksList() {
  const popularBooks = await BookWiseService.getPopularBooks()

  return (
    <section className="w-full">
      <header className="flex items-center justify-between mb-4">
        <h1 className="font-normal text-base">Livros populares</h1>
        <Link
          className="text-purple-100 font-bold flex items-center gap-2"
          href={'/book-wise/explore'}
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
