import Image from 'next/image'

interface BookCoverProps {
  coverUrl: string
  width?: number
  height?: number
  alt: string
}

export function BookCover({
  coverUrl,
  width = 108,
  height = 152,
  alt,
}: BookCoverProps) {
  return <Image src={coverUrl} width={width} height={height} alt={alt} />
}
