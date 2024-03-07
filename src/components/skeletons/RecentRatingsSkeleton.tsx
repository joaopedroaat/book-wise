export function RecentRatingsSkeleton() {
  const Skeleton = () => (
    <div className="bg-gray-700 animate-pulse rounded-lg w-full h-64"></div>
  )

  return (
    <ul className="flex flex-col gap-3">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ul>
  )
}
