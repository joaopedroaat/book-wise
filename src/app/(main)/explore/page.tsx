'use client'

import { useState } from 'react'
import { BookList } from './components/BookList'
import { CategoryForm } from './components/CategoryForm'

export default function Explore() {
  const [category, setCategory] = useState<string>('Todos')

  function handleCategoryChange(newCategory: string) {
    newCategory === category ? setCategory('Todos') : setCategory(newCategory)
  }

  return (
    <>
      <CategoryForm
        className="mb-12 flex items-center justify-center gap-3 flex-wrap"
        currentCategory={category}
        onCategoryChange={handleCategoryChange}
      />
      <BookList category={category} />
    </>
  )
}
