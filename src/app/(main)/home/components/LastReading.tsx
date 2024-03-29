import { endpoints } from '@/api/endpoints'
import { GetReadingResponse } from '@/app/api/readings/route'
import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { authOptions } from '@/lib/next-auth/authOptions'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

async function fetchLastReading() {
  const session = await getServerSession(authOptions)

  if (!session) return

  const response = await fetch(
    `${endpoints.bw}/readings?userId=${session.user.id}`,
    {
      next: { tags: ['reading'] },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch latest reading.')
  }

  return (await response.json()) as GetReadingResponse
}

export async function LastReading() {
  const data = await fetchLastReading()

  if (!data || !data.reading) return

  const { reading } = data

  return (
    <section className="flex flex-col gap-4">
      <h2>Sua última leitura</h2>
      <main>
        <div className="bg-gray-600 rounded-lg py-5 px-6 flex flex-col lg:flex-row items-center lg:items-start gap-6">
          <BookOverlay book={reading.book} />
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row lg:justify-between items-center">
              <span className="text-gray-300">
                {calculateDateDistance(new Date(reading.createdAt))}
              </span>
              <StarRating type="book" bookId={reading.bookId} size={16} />
            </div>
            <div className="flex flex-col text-center lg:text-start mt-3">
              <h1 className="font-bold text-lg text-gray-100">
                {reading.book.name}
              </h1>
              <small className="text-gray-400">{reading.book.author}</small>
            </div>
            <p className="mt-4 text-gray-300 text-center lg:text-start">
              {reading.book.summary}
            </p>
          </div>
        </div>
      </main>
    </section>
  )
}
