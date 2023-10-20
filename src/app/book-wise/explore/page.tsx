import { BookList } from '@/components/BookList'
import { Binoculars } from '@phosphor-icons/react/dist/ssr/index'

export default function Explore() {
  return (
    <>
      <h1 className="flex gap-3 text-2xl font-bold mb-14">
        <Binoculars className="text-green-100" size={32} />
        Explorar
      </h1>
      <BookList />
    </>
  )
}
