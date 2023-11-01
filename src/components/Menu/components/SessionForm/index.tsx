import { useSession } from 'next-auth/react'
import { SignInForm } from './components/SignInForm'
import { SignOutForm } from './components/SignOutForm'
export function SessionForm() {
  const { status } = useSession()

  return status === 'authenticated' ? <SignOutForm /> : <SignInForm />
}
