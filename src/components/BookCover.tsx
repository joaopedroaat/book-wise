import { Book } from '@/services/BookWiseService/types'
import Image from 'next/image'

type BookCoverProps = {
  book: Book
  width?: number
  height?: number
}

export function BookCover({ book, width = 108, height = 152 }: BookCoverProps) {
  return (
    <Image
      className="shrink-0 w-auto h-auto"
      src={book.cover_url}
      width={width}
      height={height}
      title={book.name}
      alt={`Capa do livro ${book.name}`}
    />
  )
}
