export function ExploreSkeleton() {
  const Skeleton = () => (
    <span className="w-72 h-36 bg-gray-700 animate-pulse rounded-lg" />
  )
  return (
    <ul className="flex justify-center gap-3 flex-wrap">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ul>
  )
}
