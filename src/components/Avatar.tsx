import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User'
import Image from 'next/image'
import Link from 'next/link'

type AvatarProps = {
  user: { id: string; name: string; avatarUrl: string | null }
  size?: number
}

export function Avatar({
  user: { id, name, avatarUrl },
  size = 40,
}: AvatarProps) {
  const altText = `Foto de perfil de ${name}.`

  return (
    <Link href={`profile/${id}`}>
      {avatarUrl ? (
        <Image
          className="rounded-full"
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
