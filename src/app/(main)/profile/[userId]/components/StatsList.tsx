import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr/BookmarkSimple'
import { Books } from '@phosphor-icons/react/dist/ssr/Books'
import { UserList } from '@phosphor-icons/react/dist/ssr/UserList'
import { ReactNode } from 'react'

export function StatsList({
  stats,
}: {
  stats: {
    totalReviewedBooks: number
    totalReviewedAuthors: number
    mostReviewedCategory: string
  }
}) {
  const Stat = ({ children }: { children: ReactNode }) => {
    return (
      <li className="flex gap-5 items-center [&>svg]:text-green-100 [&>div]:flex [&>div]:flex-col [&>div>strong]:text-gray-200 [&>div>small]:text-gray-400">
        {children}
      </li>
    )
  }

  return (
    <ul className={'flex flex-col gap-10'}>
      <Stat>
        <Books size="2rem" />
        <div>
          <strong>{stats?.totalReviewedBooks}</strong>
          <small>Livros avaliados</small>
        </div>
      </Stat>
      <Stat>
        <UserList size="2rem" />
        <div>
          <strong>{stats?.totalReviewedAuthors}</strong>
          <small>Autores avaliados</small>
        </div>
      </Stat>
      <Stat>
        <BookmarkSimple className="shrink-0" size="2rem" />
        <div>
          <strong>{stats?.mostReviewedCategory || 'Nenhuma'}</strong>
          <small>Categoria mais lida</small>
        </div>
      </Stat>
    </ul>
  )
}
