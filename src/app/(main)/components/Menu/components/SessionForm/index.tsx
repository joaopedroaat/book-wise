import { getServerSession } from 'next-auth'
import { SignInForm } from './components/SignInForm'
import { SignOutForm } from './components/SignOutForm'
import { authOptions } from '@/lib/next-auth/authOptions'
export async function SessionForm() {
  const session = await getServerSession(authOptions)

  return session ? <SignOutForm user={session.user} /> : <SignInForm />
}
