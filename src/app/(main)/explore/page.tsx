'use client'

import { Genre } from '@/services/BookWiseService/schemas'
import { useState } from 'react'
import { BookList } from './components/BookList'
import { CategoryForm } from './components/CategoryForm'

export default function Explore() {
  const [category, setCategory] = useState<Genre | undefined>(undefined)

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
      <BookList category={category} />
    </>
  )
}
