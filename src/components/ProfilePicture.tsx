import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User'
import { User } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

interface ProfilePictureProps {
  user: User
  width?: number
  height?: number
}

export function ProfilePicture({
  user: { id, name, image: avatarUrl },
  width = 40,
  height = 40,
}: ProfilePictureProps) {
  const altText = `Foto de perfil de ${name}.`

  return (
    <Link href={`profile/${id}`}>
      {avatarUrl ? (
        <Image
          className="rounded-full"
          src={avatarUrl}
          width={width}
          height={height}
          alt={altText}
        />
      ) : (
        <UserIcon
          className="bg-gray-800 p-1 rounded-full text-green-100"
          size={width}
        />
      )}
    </Link>
  )
}
