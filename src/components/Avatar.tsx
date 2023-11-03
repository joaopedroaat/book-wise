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
    <Link
      className={`relative w-[${size}px] h-[${size}px]`}
      href={`profile/${id}`}
    >
      {avatarUrl ? (
        <Image
          className="rounded-full"
          src={avatarUrl}
          alt={altText}
          fill={true}
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
