import { ExploreList } from '@/components/BookList'
import { Binoculars } from '@phosphor-icons/react/dist/ssr/index'

export default async function Explore() {
  return (
    <>
      <h1 className="flex gap-3 text-2xl font-bold">
        <Binoculars className="text-green-100" size={32} />
        Explorar
      </h1>
      <ExploreList />
    </>
  )
}
