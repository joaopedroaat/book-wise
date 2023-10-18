import { BookWiseService } from '@/services/BookWiseService'
import { Binoculars } from '@phosphor-icons/react/dist/ssr/index'

export default async function Explore() {
  const books = await BookWiseService.getBooks()

  return (
    <>
      <h1 className="flex items-center gap-3 text-2xl font-bold">
        <Binoculars className="text-green-100" size={32} />
        Explorar
      </h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </>
  )
}
