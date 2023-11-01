import { SignOut } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'

export function SignOutForm() {
  return (
    <button
      className="flex items-center justify-center gap-3"
      onClick={() => signOut()}
    >
      Sair
      <SignOut className="text-red-100" size={20} />
    </button>
  )
}
