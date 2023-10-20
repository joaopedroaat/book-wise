'use client'

import { BookList } from '@/components/BookList'
import { CategoryForm } from '@/components/CategoryForm'
import { BookWiseService } from '@/services/BookWiseService'
import { BookWithRatings } from '@/services/interfaces/models/BookWithRatings'
import { Category } from '@/services/interfaces/models/Category'
import { Binoculars } from '@phosphor-icons/react/dist/ssr/index'
import { useEffect, useState } from 'react'

export default function Explore() {
  const [category, setCategory] = useState<Category['name'] | null>(null)
  const [books, setBooks] = useState<BookWithRatings[]>([])

  useEffect(() => {
    async function fetchBooks() {
      setBooks(
        (await BookWiseService.getBooks({
          category: category || undefined,
          includeRatings: true,
        })) as BookWithRatings[],
      )
    }

    fetchBooks()
  }, [category])

  function handleCategoryChange(category: Category['name'] | null) {
    setCategory(category)
  }

  return (
    <>
      <h1 className="flex gap-3 text-2xl font-bold mb-14">
        <Binoculars className="text-green-100" size={32} />
        Explorar
      </h1>
      <CategoryForm
        className="mb-12 flex items-center justify-center gap-3 flex-wrap"
        handleCategoryChange={handleCategoryChange}
      />
      <BookList books={books} />
    </>
  )
}
