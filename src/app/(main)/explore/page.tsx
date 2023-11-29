'use client'

import { useBooks } from '@/services/BookWiseService/hooks/useBooks'
import { Genre } from '@/services/BookWiseService/schemas'
import { CircleNotch } from '@phosphor-icons/react'
import { useState } from 'react'
import { BookList } from './components/BookList'
import { CategoryForm } from './components/CategoryForm'

export default function Explore() {
  const [category, setCategory] = useState<Genre | undefined>(undefined)

  const { data: books, isLoading } = useBooks(category)

  function handleCategoryChange(newCategory: Genre | null) {
    setCategory(newCategory || undefined)
  }

  return (
    <>
      <CategoryForm
        className="mb-12 flex items-center justify-center gap-3 flex-wrap"
        currentCategory={category || null}
        onCategoryChange={handleCategoryChange}
      />
      {isLoading && (
        <div className="flex justify-center">
          <CircleNotch className="animate-spin" size={32} />
        </div>
      )}
      {books && <BookList books={books} />}
    </>
  )
}
