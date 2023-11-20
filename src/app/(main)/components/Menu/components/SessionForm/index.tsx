import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { SignInForm } from './components/SignInForm'
import { SignOutForm } from './components/SignOutForm'
export async function SessionForm() {
  const session = await getServerSession(authOptions)

  return session ? <SignOutForm user={session.user} /> : <SignInForm />
}
