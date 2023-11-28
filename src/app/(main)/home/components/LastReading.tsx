'use client'

import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { useUserReadings } from '@/services/BookWiseService/hooks/useUserReadings'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { CaretRight } from '@phosphor-icons/react'
import Link from 'next/link'

export function LastReading() {
  const [{ data: readings }] = useUserReadings()

  const lastReading = readings && readings[0]

  return (
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
          <div className="bg-gray-600 rounded-lg py-5 px-6 flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <BookOverlay book={lastReading.book} />
            <div className="flex flex-col">
              <div className="flex flex-col lg:flex-row lg:justify-between items-center">
                <span className="text-gray-300">
                  {calculateDateDistance(new Date(lastReading.createdAt))}
                </span>
                <StarRating rate={lastReading.book} size={16} />
              </div>
              <div className="flex flex-col text-center lg:text-start mt-3">
                <h1 className="font-bold text-lg text-gray-100">
                  {lastReading.book.name}
                </h1>
                <small className="text-gray-400">
                  {lastReading.book.author}
                </small>
              </div>
              <p className="mt-4 text-gray-300 text-center lg:text-start">
                {lastReading.book.summary}
              </p>
            </div>
          </div>
        </main>
      </section>
    )
  )
}
