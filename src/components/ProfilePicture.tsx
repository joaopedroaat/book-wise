import Image from 'next/image'
import Link from 'next/link'
import defaultProfilePicture from '@/assets/user.svg'
import { User } from '@/services/interfaces/models/User'

interface ProfilePictureProps {
  user: User
  width?: number
  height?: number
}

export function ProfilePicture({
  user,
  width = 40,
  height = 40,
}: ProfilePictureProps) {
  return (
    <Link href={`/book-wise/profile/${user.id}`}>
      <Image
        className="rounded-full"
        src={user?.image || defaultProfilePicture}
        width={width}
        height={height}
        alt={`Foto de perfil de ${user.name}`}
      />
    </Link>
  )
}
