import Image from 'next/image'
import bookWiseLogo from '@/assets/book-wise-logo.svg'

interface BookWiseIconsProps {
  width?: number
  height?: number
}

export function BookWiseIcon({ width = 128, height = 32 }: BookWiseIconsProps) {
  return (
    <Image
      src={bookWiseLogo}
      width={width}
      height={height}
      alt="Logo da BookWise."
    />
  )
}
