import { BookCover } from '@/components/BookCover'
import { StarRating } from '@/components/StarRating'
import { BookWithRatingsAndCategories } from '@/services/BookWiseService/types'
import { BookmarkSimple } from '@phosphor-icons/react'

type BookInfoProps = {
  book: BookWithRatingsAndCategories
}

export function BookInfo({ book }: BookInfoProps) {
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
            <span className="text-sm font-bold">Lorem ipsum dolor</span>
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
