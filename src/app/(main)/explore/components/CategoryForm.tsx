import { useCategories } from '@/services/BookWiseService/hooks/useCategories'
import { Genre } from '@/services/BookWiseService/schemas'
import { HTMLProps } from 'react'

type CategoryFormProps = HTMLProps<HTMLUListElement> & {
  currentCategory: Genre | null
  onCategoryChange: (category: Genre | null) => void
}

export function CategoryForm({
  currentCategory,
  onCategoryChange,
  ...props
}: CategoryFormProps) {
  const [{ data: categories }] = useCategories()

  function handleCategoryChange(category: Genre | null) {
    onCategoryChange(category)
  }

  return (
    <ul className="flex items-center gap-3" {...props}>
      {categories &&
        categories.map((category) => {
          if (!category || category.name === currentCategory)
            return (
              <li
                className="py-1 px-4 flex items-center justify-center border border-purple-200 bg-purple-200 rounded-full hover:bg-purple-100 hover:border-purple-100 hover:text-gray-100 cursor-pointer"
                key={category.id}
                onClick={() => handleCategoryChange(category.name || null)}
              >
                {category.name || 'Todos'}
              </li>
            )

          return (
            <li
              className={`py-1 px-4 flex items-center justify-center text-purple-100 border border-purple-100 rounded-full hover:bg-purple-200 hover:border-purple-200 hover:text-gray-100 cursor-pointer`}
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
            >
              {category.name}
            </li>
          )
        })}
    </ul>
  )
}
