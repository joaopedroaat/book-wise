import { User } from '@/services/BookWiseService'
import Image from 'next/image'
import Link from 'next/link'
import defaultProfilePicture from '@/assets/user.svg'
import './styles.css'

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
    <Link
      className="profile-picture-container"
      href={`/boolwise/profile/${user.id}`}
    >
      <Image
        src={user?.image || defaultProfilePicture}
        width={width}
        height={height}
        alt={`Foto de perfil de ${user.name}`}
      />
    </Link>
  )
}
