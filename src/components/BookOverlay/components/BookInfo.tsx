import { BookCover } from '@/components/BookCover'
import { StarRating } from '@/components/StarRating'
import { BookWiseService } from '@/services/BookWiseService'
import { Book } from '@/services/BookWiseService/types'
import { BookmarkSimple } from '@phosphor-icons/react'
import { useQuery } from 'react-query'

type BookInfoProps = {
  book: Book
}

export function BookInfo({ book }: BookInfoProps) {
  const { data: categories } = useQuery(
    ['categories_on_book', book],
    async () => await BookWiseService.getCategoriesOnBOok(book.id),
  )

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
            <StarRating rating={3} size={16} />
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
              {categories &&
                categories.map(
                  (category, index) =>
                    `${category.name}${
                      index !== categories.length - 1 ? ', ' : ''
                    }`,
                )}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BookmarkSimple className="text-green-100" size={24} />
          <div className="flex flex-col">
            <small className="text-gray-300">Páginas</small>
            <span className="text-sm font-bold">{book.total_pages}</span>
          </div>
        </div>
      </section>
    </section>
  )
}
