export function RatingFeedSkeleton() {
  const Skeleton = () => (
    <span className="w-full h-40 bg-gray-700 animate-pulse rounded-lg" />
  )
  return <Skeleton />
}
