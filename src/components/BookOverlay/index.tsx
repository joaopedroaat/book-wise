'use client'

import { BookWiseService } from '@/services/BookWiseService'
import { Book } from '@/services/BookWiseService/types'
import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { BookCover } from './components/BookCover'
import { BookInfo } from './components/BookInfo'
import { RatingFeed } from './components/RatingFeed'

type BookOverlayProps = {
  book: Book
  width?: number
  height?: number
}

export function BookOverlay({ book, width, height }: BookOverlayProps) {
  const { mutateAsync: readingMutation } = useMutation(
    async ({ bookId, userId }: { bookId: string; userId: string }) => {
      BookWiseService.postUserReading({ bookId, userId })
    },
  )

  const session = useSession()

  const user = session.status === 'authenticated' && session.data.user

  async function handleUserReading() {
    if (!user) return

    readingMutation({
      userId: user.id,
      bookId: book.id,
    })
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="shrink-0" onClick={handleUserReading}>
          <BookCover book={book} width={width} height={height} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
        <Dialog.Content className="overflow-scroll fixed top-0 right-0 bottom-0 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 bg-gray-800 flex flex-col gap-4 p-3 sm:py-6 sm:px-12">
          <Dialog.Close className="self-end text-gray-400">
            <X size={24} />
          </Dialog.Close>
          <BookInfo book={book} />
          <RatingFeed book={book} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
