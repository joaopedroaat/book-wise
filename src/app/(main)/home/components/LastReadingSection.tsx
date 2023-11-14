'use client'

import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { BookWiseService } from '@/services/BookWiseService'
import { ReadingWithBook } from '@/services/BookWiseService/types'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { CaretRight } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useQuery } from 'react-query'

export function LastReadingSection() {
  const session = useSession()

  const user = session.status === 'authenticated' && session.data.user

  const { data: readings } = useQuery('readings', async () => {
    if (!user) return

    return (await BookWiseService.getUserReadings(user.id, {
      includeBooks: true,
    })) as ReadingWithBook[]
  })

  const lastReading = readings && readings[0]

  return (
    user &&
    lastReading && (
      <section className="flex flex-col gap-4">
        <header className="flex justify-between">
          <h2>Sua última leitura</h2>
          <Link
            href="profile"
            className="flex items-center gap-2 text-purple-100 font-bold"
          >
            Ver todas <CaretRight size={16} weight="bold" />
          </Link>
        </header>
        <main>
          <div className="bg-gray-600 rounded-lg py-5 px-6 flex gap-6">
            <BookOverlay book={lastReading.book} />
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <span className="text-gray-300">
                  {calculateDateDistance(new Date(lastReading.createdAt))}
                </span>
                <StarRating rating={4} size={16} />
              </div>
              <div className="flex flex-col mt-3">
                <h1 className="font-bold text-lg text-gray-100">
                  {lastReading.book.name}
                </h1>
                <small className="text-gray-400">
                  {lastReading.book.author}
                </small>
              </div>
              <p className="mt-auto text-gray-300">
                {lastReading.book.summary}
              </p>
            </div>
          </div>
        </main>
      </section>
    )
  )
}
