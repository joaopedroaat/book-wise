import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User'
import { User } from '@prisma/client'
import { User as NextAuthUser } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

type AvatarProps = {
  user: User | NextAuthUser
  size?: number
  border?: boolean
}

export function Avatar({ user, size = 40, border }: AvatarProps) {
  const altText = `Foto de perfil de ${user.name}.`
  const avatarUrl = (user as User).avatarUrl
    ? (user as User).avatarUrl
    : (user as NextAuthUser).image

  return (
    <Link href={`/profile/${user.id}`}>
      {avatarUrl ? (
        <Image
          className={`rounded-full border-2 ${
            border ? 'border-green-100' : 'border-transparent'
          }`}
          width={size}
          height={size}
          src={avatarUrl}
          alt={altText}
        />
      ) : (
        <UserIcon
          className="bg-gray-800 p-1 rounded-full text-green-100"
          size={size}
        />
      )}
    </Link>
  )
}
