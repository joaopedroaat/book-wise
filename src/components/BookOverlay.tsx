'use client'

import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { BookCover } from './BookCover'
import { Book } from '@/services/interfaces/models/Book'
import { StarRating } from './StarRating'

interface BookOverlayProps {
  book: Book
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
        <Dialog.Content className="fixed top-0 right-0 bottom-0 w-full md:w-1/2 lg:w-1/3 bg-gray-800 flex flex-col gap-4 p-3 md:py-6 md:px-12">
          <Dialog.Close className="self-end text-gray-400">
            <X size={24} />
          </Dialog.Close>
          <BookInfo book={book} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface BookInfoProps {
  book: Book
}

function BookInfo({ book }: BookInfoProps) {
  return (
    <div className="bg-gray-700 rounded-lg w-full px-8 py-6">
      <div className="flex gap-8">
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
      </div>
    </div>
  )
}
