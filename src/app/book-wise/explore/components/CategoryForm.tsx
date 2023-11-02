import { BookWiseService } from '@/services/BookWiseService'
import { Category } from '@/services/interfaces/models/Category'
import { HTMLProps, useEffect, useState } from 'react'

interface FormCategory {
  id: string
  name: 'Todos' | Category['name']
}

interface CategoryFormProps extends HTMLProps<HTMLUListElement> {
  handleCategoryChange: (category: Category['name'] | null) => void
}

export function CategoryForm({
  handleCategoryChange,
  ...props
}: CategoryFormProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<FormCategory['name']>('Todos')
  const [categories, setCategories] = useState<FormCategory[]>([])

  useEffect(() => {
    async function fetchCategories() {
      setCategories([
        { id: 'Todos', name: 'Todos' },
        ...(await BookWiseService.getCategories()),
      ])
    }

    fetchCategories()
  }, [])

  function handleCategoryClick(category: FormCategory['name']) {
    const newCategory = category !== selectedCategory ? category : 'Todos'
    setSelectedCategory(newCategory)
    handleCategoryChange(newCategory !== 'Todos' ? newCategory : null)
  }

  return (
    <ul className="flex items-center gap-3" {...props}>
      {categories.map((category) => {
        if (category.name === selectedCategory)
          return (
            <li
              className="py-1 px-4 flex items-center justify-center border border-purple-200 bg-purple-200 rounded-full hover:bg-purple-100 hover:border-purple-100 hover:text-gray-100 cursor-pointer"
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </li>
          )

        return (
          <li
            className={`py-1 px-4 flex items-center justify-center text-purple-100 border border-purple-100 rounded-full hover:bg-purple-200 hover:border-purple-200 hover:text-gray-100 cursor-pointer`}
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </li>
        )
      })}
    </ul>
  )
}