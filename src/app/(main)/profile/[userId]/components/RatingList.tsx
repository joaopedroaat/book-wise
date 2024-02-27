import { BookOverlay } from '@/components/BookOverlay'
import { StarRating } from '@/components/StarRating'
import { prisma } from '@/lib/prisma'

async function fetchUserRatings(userId: string) {
  const ratings = await prisma.rating.findMany({
    where: {
      userId,
    },
    include: {
      book: true,
    },
  })

  return ratings
}

export async function RatingList({ userId }: { userId: string }) {
  const ratings = await fetchUserRatings(userId)

  return (
    <section>
      <h2 className="mb-4">Avaliações</h2>
      <ul className="flex flex-col gap-6">
        {!ratings.length && (
          <p className="text-gray-400">Você ainda não fez nenhuma avaliação</p>
        )}
        {ratings.map((rating) => (
          <li
            key={rating.id}
            className="bg-gray-700 p-6 rounded-lg flex flex-col gap-6"
          >
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              <BookOverlay book={rating.book} />
              <div className="flex flex-col items-center sm:items-start flex-grow">
                <strong>{rating.book.name}</strong>
                <small className="text-gray-400">{rating.book.author}</small>
                <div className="mt-1">
                  <StarRating type="book" bookId={rating.book.id} size="1rem" />
                </div>
              </div>
            </div>
            <p className="text-gray-300">{rating.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
