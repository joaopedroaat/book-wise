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
  const { data: categories } = useCategories()

  function handleCategoryChange(category: Genre | null) {
    onCategoryChange(currentCategory !== category ? category : null)
  }

  return (
    <ul className="flex items-center gap-3" {...props}>
      {categories &&
        [null, ...categories.map((category) => category.name)].map(
          (category) => (
            <li key={category || 'todos'}>
              <button
                className={`px-4 py-1 border rounded-full ${
                  currentCategory === category
                    ? 'text-gray-100 border-transparent bg-purple-200'
                    : 'text-purple-100 border-purple-100'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category || 'Todos'}
              </button>
            </li>
          ),
        )}
    </ul>
  )
}
