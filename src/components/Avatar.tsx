import { User } from '@/services/BookWiseService/types'
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User'
import { User as NextAuthUser } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

type AvatarProps = {
  user: User | NextAuthUser
  size?: number
}

export function Avatar({ user, size = 40 }: AvatarProps) {
  const altText = `Foto de perfil de ${user.name}.`
  const avatarUrl = (user as User).avatarUrl
    ? (user as User).avatarUrl
    : (user as NextAuthUser).image

  return (
    <Link href={`profile/${user.id}`}>
      {avatarUrl ? (
        <div className="relative" style={{ width: size, height: size }}>
          <Image
            className="rounded-full"
            fill={true}
            sizes={`${size}px`}
            src={avatarUrl}
            alt={altText}
          />
        </div>
      ) : (
        <UserIcon
          className="bg-gray-800 p-1 rounded-full text-green-100"
          size={size}
        />
      )}
    </Link>
  )
}
