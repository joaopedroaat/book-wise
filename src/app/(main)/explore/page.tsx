'use client'

import { BookWiseService } from '@/services/BookWiseService'
import { Binoculars } from '@phosphor-icons/react/dist/ssr/index'
import { useEffect, useState } from 'react'
import { CategoryForm } from './components/CategoryForm'
import { BookList } from './components/BookList'
import { BookWithRatingsAndCategories } from '@/services/BookWiseService/types'
import { Category } from '@prisma/client'

export default function Explore() {
  const [category, setCategory] = useState<Category['name'] | null>(null)
  const [books, setBooks] = useState<BookWithRatingsAndCategories[]>([])

  useEffect(() => {
    async function fetchBooks() {
      const booksData = await BookWiseService.getBooks({
        category: category || undefined,
        includeRatings: true,
        includeCategories: true,
      })

      setBooks(
        booksData ? (booksData.books as BookWithRatingsAndCategories[]) : [],
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
