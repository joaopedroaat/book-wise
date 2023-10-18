import { Book } from '@/services/interfaces/models/Book'
import Image from 'next/image'

interface BookCoverProps {
  book: Book
  className?: string
  width?: number
  height?: number
}

export function BookCover({
  book,
  className,
  width = 108,
  height = 152,
}: BookCoverProps) {
  return (
    <Image
      className={className}
      src={book.cover_url}
      width={width}
      height={height}
      alt={`Capa do livro ${book.name}`}
    />
  )
}
