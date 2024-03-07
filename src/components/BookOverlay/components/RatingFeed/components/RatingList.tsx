import { Avatar } from '@/components/Avatar'
import { StarRating } from '@/components/StarRating'
import { calculateDateDistance } from '@/utils/calculateDateDistance'
import { useSession } from 'next-auth/react'
import { DeleteButton } from './DeleteButton'
import { RatingForm } from './RatingForm'
import { useInfiniteQuery } from 'react-query'
import { appApi } from '@/lib/axios'
import { Rating, User } from '@prisma/client'
import { GetRatingsResponse } from '@/app/api/ratings/route'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type RatingListProps = {
  bookId: string
  isRatingFormVisible: boolean
  onAbort: () => void
}

type RatingWithUser = Rating & { user: User }

export function RatingList({
  bookId,
  isRatingFormVisible,
  onAbort,
}: RatingListProps) {
  const {
    data: ratings,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['ratings', bookId],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await appApi.get<GetRatingsResponse>('/ratings', {
        params: {
          bookId,
          user: true,
          orderBy: 'date',
          page: pageParam,
          perPage: 5,
        },
      })

      return data.ratings as RatingWithUser[]
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length) return allPages.length + 1
    },
  })

  const { ref: intersection, entry } = useInView()

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  })

  const user = useSession().data?.user

  if (!ratings) return <p>No ratings</p>

  return (
    <ul className="flex flex-col gap-3">
      {user && isRatingFormVisible && (
        <RatingForm user={user} bookId={bookId} onAbort={onAbort} />
      )}
      {ratings.pages.flatMap((page, i, arr1) =>
        page.map((rating, j, arr2) => (
          <li
            className="bg-gray-700 p-6 rounded-lg flex flex-col gap-5"
            key={rating.id}
            ref={
              i === arr1.length - 1 && j === arr2.length - 1
                ? intersection
                : undefined
            }
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <Avatar user={rating.user} />
                <div>
                  <p className="font-bold text-sm">{rating.user.name}</p>
                  <small className="text-gray-400">
                    {calculateDateDistance(new Date(rating.createdAt))}
                  </small>
                </div>
              </div>

              <div className="flex gap-4">
                <StarRating type="value" rate={rating.rate} size={14} />
                {user && user.id === rating.user.id && (
                  <DeleteButton ratingId={rating.id} />
                )}
              </div>
            </div>
            <p>{rating.description}</p>
          </li>
        )),
      )}
    </ul>
  )
}
