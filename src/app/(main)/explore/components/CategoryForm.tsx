import { GetCategoriesResponse } from '@/app/api/categories/route'
import { appApi } from '@/lib/axios'
import { HTMLProps } from 'react'
import { useQuery } from 'react-query'

type CategoryFormProps = HTMLProps<HTMLUListElement> & {
  currentCategory: string
  onCategoryChange: (category: string) => void
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

  function handleCategoryChange(category: string) {
    onCategoryChange(category)
  }

  const Category = ({ name }: { name: string }) => (
    <li
      className={`px-4 py-1 border rounded-full cursor-pointer ${
        currentCategory === name
          ? 'text-gray-100 border-transparent bg-purple-200'
          : 'text-purple-100 border-purple-100'
      }`}
      onClick={() => handleCategoryChange(name)}
    >
      {name}
    </li>
  )

  return (
    <ul className="flex items-center gap-3" {...props}>
      {categories &&
        categories.map((category, index) => (
          <>
            {index === 0 && <Category key="Todos" name="Todos" />}
            <Category key={category} name={category} />
          </>
        ))}
    </ul>
  )
}
