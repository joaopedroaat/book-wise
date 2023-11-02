import { useSession } from 'next-auth/react'
import { SignInForm } from './components/SignInForm'
import { SignOutForm } from './components/SignOutForm'
export function SessionForm() {
  const { status, data } = useSession()

  return status === 'authenticated' && data ? (
    <SignOutForm user={data.user} />
  ) : (
    <SignInForm />
  )
}
