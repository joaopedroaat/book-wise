'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { BookCover } from './components/BookCover'
import { BookInfo } from './components/BookInfo'
import { Book } from '@prisma/client'
import { X } from '@phosphor-icons/react'
import { upsertReading } from '@/actions/upsertReading'
import { RatingFeed } from './components/RatingFeed'

type BookOverlayProps = {
  book: Book
  width?: number
  height?: number
}

export function BookOverlay({ book, width, height }: BookOverlayProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="shrink-0" onClick={() => upsertReading(book.id)}>
          <BookCover book={book} width={width} height={height} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
        <Dialog.Content className="overflow-auto fixed top-0 right-0 bottom-0 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 bg-gray-800 flex flex-col gap-4 p-3 sm:py-6 sm:px-12">
          <Dialog.Close className="self-end text-gray-400">
            <X size={24} />
          </Dialog.Close>
          <BookInfo book={book} />
          <RatingFeed bookId={book.id} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
