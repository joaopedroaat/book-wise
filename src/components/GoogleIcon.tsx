import Image from 'next/image'
import googleLogo from '@/assets/google-logo.svg'

interface GoogleIconProps {
  width?: number
  height?: number
}

export function GoogleIcon({ width = 32, height = 32 }: GoogleIconProps) {
  return (
    <Image
      src={googleLogo}
      width={width}
      height={height}
      alt="Logo do Google."
    />
  )
}
