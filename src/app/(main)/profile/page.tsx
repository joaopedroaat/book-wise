import { PageTitle } from '../components/PageTitle'
import { RatedBookList } from './components/RatedBookList'

export default function Profile() {
  return (
    <>
      <PageTitle />
      <main className="grid grid-cols-4 gap-16">
        <RatedBookList />
      </main>
    </>
  )
}
