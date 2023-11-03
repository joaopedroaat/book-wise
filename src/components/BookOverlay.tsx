'use client'

import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { BookCover } from './BookCover'
import { StarRating } from './StarRating'
import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr/BookmarkSimple'
import {
  BookWithRatingsAndCategories,
  RatingWithUser,
} from '@/services/BookWiseService/types'

type BookOverlayProps = {
  book: BookWithRatingsAndCategories
  width?: number
  height?: number
}

export function BookOverlay({ book, width, height }: BookOverlayProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="shrink-0">
        <BookCover book={book} width={width} height={height} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
        <Dialog.Content className="fixed top-0 right-0 bottom-0 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 bg-gray-800 flex flex-col gap-4 p-3 sm:py-6 sm:px-12">
          <Dialog.Close className="self-end text-gray-400">
            <X size={24} />
          </Dialog.Close>
          <BookInfo book={book} />
          <CommentSection ratings={book.ratings} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type BookInfoProps = {
  book: BookWithRatingsAndCategories
}

function BookInfo({ book }: BookInfoProps) {
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

type CommentSectionProps = {
  ratings: RatingWithUser[]
}

export function CommentSection({ ratings }: CommentSectionProps) {
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <small>Avaliações</small>
        <button className="text-purple-100 font-bold text-sm">Avaliar</button>
      </div>

      <ul>
        {ratings.map((rating) => (
          <li key={rating.id}>{rating.description}</li>
        ))}
      </ul>
    </section>
  )
}
