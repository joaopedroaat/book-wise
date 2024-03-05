import { BookCover } from '@/components/BookOverlay/components/BookCover'
import { StarRating } from '@/components/StarRating'
import { Book } from '@prisma/client'
import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr/BookmarkSimple'
import { useQuery } from 'react-query'
import { appApi } from '@/lib/axios'
import { GetCategoriesResponse } from '@/app/api/categories/route'

export function BookInfo({ book }: { book: Book }) {
  const { data: categories } = useQuery(['book_categories', book], async () => {
    const { data } = await appApi.get<GetCategoriesResponse>('/categories', {
      params: {
        bookId: book.id,
      },
    })

    const categories = data.categories.map((category) => category.name)

    return categories
  })

  if (!categories) return <p>Failed to load categories</p>

  return (
    <section className="bg-gray-700 rounded-lg w-full px-8 py-6">
      <section className="flex gap-8">
        <BookCover book={book} />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="font-bold">{book.name}</h1>
            <small className="text-gray-300 text-xs">{book.author}</small>
          </div>
          <div>
            <StarRating type="book" bookId={book.id} size={16} />
            <small className="text-gray-400">3 avaliações</small>
          </div>
        </div>
      </section>
      <section className="border-t border-gray-600 py-6 mt-10 flex justify-between [&>div]:flex-grow">
        <div className="flex items-center gap-4">
          <BookmarkSimple className="text-green-100" size={24} />
          <div className="flex flex-col">
            <small className="text-gray-300">Categoria</small>
            <span className="text-sm font-bold">
              {categories.map(
                (category, index) =>
                  `${category}${index !== categories.length - 1 ? ', ' : ''}`,
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BookmarkSimple className="text-green-100" size={24} />
          <div className="flex flex-col">
            <small className="text-gray-300">Páginas</small>
            <span className="text-sm font-bold">{book.totalPages}</span>
          </div>
        </div>
      </section>
    </section>
  )
}
