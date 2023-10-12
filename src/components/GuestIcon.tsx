import Image from 'next/image'
import rocketLogo from '@/assets/rocket-logo.svg'

interface GuestIconProps {
  width?: number
  height?: number
}

export function GuestIcon({ width = 32, height = 32 }: GuestIconProps) {
  return (
    <Image
      src={rocketLogo}
      width={width}
      height={height}
      alt="Logo do visitante."
    />
  )
}
