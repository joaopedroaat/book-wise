import { BookCover } from '@/components/BookCover'
import { StarRating } from '@/components/StarRating'
import { BookWithRatings } from '@/services/interfaces/models/BookWithRatings'
import { X } from '@phosphor-icons/react/dist/ssr/X'
import * as Dialog from '@radix-ui/react-dialog'
import { BookOverlay } from './BookOverlay'

interface BookItemProps {
  book: BookWithRatings
}

export function BookItem({ book }: BookItemProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-gray-700 px-5 py-4 flex flex-col items-center sm:items-end gap-2 sm:flex sm:flex-row sm:gap-5 sm:w-80 rounded-lg">
        <BookCover book={book} />
        <div className="flex flex-col items-center gap-2 sm:items-start sm:justify-between h-full">
          <div className="flex flex-col gap-0 text-center sm:text-left">
            <h1 className="font-bold text-gray-100">{book.name}</h1>
            <small className="text-gray-400">{book.author}</small>
          </div>
          <StarRating
            rating={
              book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
              book.ratings.length
            }
            size={16}
          />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 opacity-60 bg-black" />
        <Dialog.Content className="fixed right-0 top-0 bottom-0 w-full md:w-3/4 lg:w-5/12 bg-gray-800 px-12 pt-16">
          <BookOverlay />
          <Dialog.Close className="absolute top-6 right-12">
            <X className="text-gray-400" size={24} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
