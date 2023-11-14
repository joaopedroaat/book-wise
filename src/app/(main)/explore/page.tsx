'use client'

import { BookWiseService } from '@/services/BookWiseService'
import { BookWithRatingsAndCategories } from '@/services/BookWiseService/types'
import { Category } from '@prisma/client'
import { useEffect, useState } from 'react'
import { PageTitle } from '../components/PageTitle'
import { BookList } from './components/BookList'
import { CategoryForm } from './components/CategoryForm'

export default function Explore() {
  const [category, setCategory] = useState<Category['name'] | null>(null)
  const [books, setBooks] = useState<BookWithRatingsAndCategories[]>([])

  useEffect(() => {
    async function fetchBooks() {
      setBooks(
        (await BookWiseService.getBooks({
          category: category || undefined,
          includeRatings: true,
          includeCategories: true,
        })) as BookWithRatingsAndCategories[],
      )
    }

    fetchBooks()
  }, [category])

  function handleCategoryChange(category: Category['name'] | null) {
    setCategory(category)
  }

  return (
    <>
      <PageTitle />
      <CategoryForm
        className="mb-12 flex items-center justify-center gap-3 flex-wrap"
        handleCategoryChange={handleCategoryChange}
      />
      <BookList books={books} />
    </>
  )
}
