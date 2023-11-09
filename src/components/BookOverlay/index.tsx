'use client'

import { BookWithRatingsAndCategories } from '@/services/BookWiseService/types'
import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { BookCover } from '../BookCover'
import { BookInfo } from './components/BookInfo'
import { RatingsSection } from './components/RatingsSection'

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
        <Dialog.Content className="overflow-scroll fixed top-0 right-0 bottom-0 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 bg-gray-800 flex flex-col gap-4 p-3 sm:py-6 sm:px-12">
          <Dialog.Close className="self-end text-gray-400">
            <X size={24} />
          </Dialog.Close>
          <BookInfo book={book} />
          <RatingsSection book={book} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
