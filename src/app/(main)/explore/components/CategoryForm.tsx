import { GetCategoriesResponse } from '@/app/api/categories/route'
import { appApi } from '@/lib/axios'
import { HTMLProps } from 'react'
import { useQuery } from 'react-query'

type CategoryFormProps = HTMLProps<HTMLUListElement> & {
  currentCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export function CategoryForm({
  currentCategory,
  onCategoryChange,
  ...props
}: CategoryFormProps) {
  const { data: categories } = useQuery('categories', async () => {
    const { data } = await appApi.get<GetCategoriesResponse>('/categories')
    return data.categories
  })

  function handleCategoryChange(category: string | null) {
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
