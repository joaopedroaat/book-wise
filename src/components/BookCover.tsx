'use client'

import { Book } from '@/services/interfaces/models/Book'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react/dist/ssr/X'

interface BookCoverProps {
  book: Book
  width?: number
  height?: number
}

export function BookCover({ book, width = 108, height = 152 }: BookCoverProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Image
          className="cursor-pointer"
          src={book.cover_url}
          width={width}
          height={height}
          title={book.name}
          alt={`Capa do livro ${book.name}`}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
        <Dialog.Content className="fixed top-0 right-0 bottom-0 w-full md:w-1/2 lg:w-1/3 bg-gray-800 flex flex-col gap-4 p-3 md:py-6 md:px-12">
          <Dialog.Close className="self-end text-gray-400">
            <X size={24} />
          </Dialog.Close>
          <div>Book Info Here</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
