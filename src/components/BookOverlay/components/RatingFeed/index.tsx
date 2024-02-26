import { useState } from 'react'
import { Header } from './components/Header'
import { RatingList } from './components/RatingList'

type RatingFeedProps = {
  bookId: string
}

export function RatingFeed({ bookId }: RatingFeedProps) {
  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false)

  return (
    <section className="mt-4 flex flex-col gap-4">
      <Header onRateClick={() => setIsRatingFormVisible(true)} />

      <RatingList
        bookId={bookId}
        isRatingFormVisible={isRatingFormVisible}
        onAbort={() => setIsRatingFormVisible(false)}
      />
    </section>
  )
}
