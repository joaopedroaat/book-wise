import Image from 'next/image'
import githubLogo from '@/assets/github-logo.svg'

interface GithubIconProps {
  width?: number
  height?: number
}

export function GithubIcon({ width = 32, height = 32 }: GithubIconProps) {
  return (
    <Image
      src={githubLogo}
      width={width}
      height={height}
      alt="Logo do Github."
    />
  )
}
