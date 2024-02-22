import { useState } from 'react'
import { Header } from './components/Header'
import { RatingList } from './components/RatingList'
import { Book } from '@prisma/client'

type RatingFeed = {
  book: Book
}

export function RatingFeed({ book }: RatingFeed) {
  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false)

  return (
    <section className="mt-4 flex flex-col gap-4">
      <Header onRateClick={() => setIsRatingFormVisible(true)} />

      <RatingList
        book={book}
        isRatingFormVisible={isRatingFormVisible}
        onAbort={() => setIsRatingFormVisible(false)}
      />
    </section>
  )
}
