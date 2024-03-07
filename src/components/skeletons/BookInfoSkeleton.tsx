export function BookInfoSkeleton() {
  const Skeleton = () => (
    <span className="w-full h-80 bg-gray-700 animate-pulse rounded-lg" />
  )
  return <Skeleton />
}
