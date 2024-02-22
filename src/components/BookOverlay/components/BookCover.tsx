import { Book } from '@prisma/client'
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
      src={book.coverUrl}
      width={width}
      height={height}
      title={book.name}
      alt={`Capa do livro ${book.name}`}
    />
  )
}
