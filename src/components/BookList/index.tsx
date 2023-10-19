'use client'

import { BookWiseService } from '@/services/BookWiseService'
import { Book } from '@/services/interfaces/models/Book'
import { Category } from '@/services/interfaces/models/Category'
import { useEffect, useState } from 'react'
import { BookItem } from './components/BookItem'
import { CategoryForm } from './components/CategoryForm'

export function BookList() {
  const [category, setCategory] = useState<Category['name'] | null>(null)
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    async function fetchBooks() {
      setBooks(
        await BookWiseService.getBooks({ category: category || undefined }),
      )
    }

    fetchBooks()
  }, [category])

  function handleCategoryChange(category: Category['name'] | null) {
    setCategory(category)
  }

  return (
    <>
      <CategoryForm
        className="mb-12 flex items-center gap-3"
        handleCategoryChange={handleCategoryChange}
      />
      <ul className="flex flex-wrap gap-5 justify-start">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </ul>
    </>
  )
}
