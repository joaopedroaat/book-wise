import { UserStats } from '@/services/BookWiseService/types'
import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr/BookmarkSimple'
import { Books } from '@phosphor-icons/react/dist/ssr/Books'
import { UserList } from '@phosphor-icons/react/dist/ssr/UserList'
import { HTMLProps, ReactNode } from 'react'

type StatsListProps = {
  stats: UserStats
} & HTMLProps<HTMLUListElement>

export function StatsList({ stats, ...props }: StatsListProps) {
  const Stat = ({ children }: { children: ReactNode }) => {
    return (
      <li className="flex gap-5 items-center [&>svg]:text-green-100 [&>div]:flex [&>div]:flex-col">
        {children}
      </li>
    )
  }

  return (
    <ul className={`${props.className} flex flex-col gap-10`} {...props}>
      <Stat>
        <Books size={32} />
        <div>
          <strong>{stats.totalBooksReviewed}</strong>
          <small>Livros avaliados</small>
        </div>
      </Stat>
      <Stat>
        <UserList size={32} />
        <div>
          <strong>{stats.totalAuthorsReviewed}</strong>
          <small>Autores avaliados</small>
        </div>
      </Stat>
      <Stat>
        <BookmarkSimple size={32} />
        <div>
          <strong>{stats.mostReviewedCategories.join(', ') + '.'}</strong>
          <small>Categorias mais lidas</small>
        </div>
      </Stat>
    </ul>
  )
}
