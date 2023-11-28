'use client'

import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { usePopularBooks } from '@/services/BookWiseService/hooks/usePopularBooks'
import { BookWithRatingsAndCategories } from '@/services/BookWiseService/types'
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'
import Link from 'next/link'

export function PopularBooks() {
  const [{ data: books }] = usePopularBooks()

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
          {books && books.map((book) => <BookItem key={book.id} book={book} />)}
        </ul>
      </main>
    </section>
  )
}

type BookItemProps = {
  book: BookWithRatingsAndCategories
}

export function BookItem({ book }: BookItemProps) {
  return (
    <li className="flex gap-4 bg-gray-700 p-5 rounded-lg">
      <BookOverlay book={book} width={64} height={94} />
      <main className="flex flex-col justify-between overflow-hidden whitespace-nowrap">
        <div className="flex flex-col">
          <h1 className="font-bold text-gray-100">{book.name}</h1>
          <small className="text-gray-400">{book.author}</small>
        </div>
        <StarRating rate={book} size={14} />
      </main>
    </li>
  )
}
