import { ReactNode, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type InfiniteScroll = {
  fetchMore: () => void
  hasMore: boolean
  children: ReactNode
  endMessage?: ReactNode
}

type InfiniteScrollWithLoading = InfiniteScroll & {
  loader: ReactNode
  isLoading: boolean
}

type InfiniteScrollProps = InfiniteScroll | InfiniteScrollWithLoading

export function InfiniteScroll({
  children,
  fetchMore,
  hasMore,
  endMessage,
  ...props
}: InfiniteScrollProps): JSX.Element {
  const { loader, isLoading } = props as InfiniteScrollWithLoading

  const { ref, entry } = useInView()

  useEffect(() => {
    if (entry?.isIntersecting && hasMore) {
      fetchMore()
    }
  })

  return (
    <>
      {children}
      <span ref={ref} />
      {isLoading && loader}
      {!hasMore && endMessage}
    </>
  )
}
