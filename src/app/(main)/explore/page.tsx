'use client'

import { useState } from 'react'
import { BookList } from './components/BookList'
import { CategoryForm } from './components/CategoryForm'

export default function Explore() {
  const [category, setCategory] = useState<string | undefined>(undefined)

  function handleCategoryChange(newCategory: string | null) {
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
