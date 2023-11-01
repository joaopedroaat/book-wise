'use client'

import { useRouter } from 'next/navigation'
import { GithubIcon } from '../../../components/GithubIcon'
import { GoogleIcon } from '../../../components/GoogleIcon'
import { signIn } from 'next-auth/react'
import { GuestIcon } from '../../../components/GuestIcon'

export function LoginForm() {
  const router = useRouter()

  function handleSignIn(provider?: 'google' | 'github') {
    if (provider) signIn(provider, { callbackUrl: '/book-wise/home' })

    router.push('/book-wise/home')
  }

  return (
    <div className="w-96">
      <header className="mb-10">
        <h1>Boas vindas!</h1>
        <p>Faça seu login ou acesse como visitante.</p>
      </header>
      <main>
        <ul className="list-none flex flex-col gap-5 p-0 [&>li]:bg-gray-600 [&>li]:flex [&>li]:items-center [&>li]:gap-5 [&>li]:py-5 [&>li]:px-6 [&>li]:rounded-lg [&>li]:cursor-pointer hover:[&>li]:bg-gray-500 [&>li]:font-bold">
          <li onClick={() => handleSignIn('google')}>
            <GoogleIcon width={24} height={20} />
            Entrar com Google
          </li>
          <li onClick={() => handleSignIn('github')}>
            <GithubIcon width={24} height={20} />
            Entrar com GitHub
          </li>
          <li onClick={() => handleSignIn()}>
            <GuestIcon width={24} height={20} />
            Acessar como visitante
          </li>
        </ul>
      </main>
    </div>
  )
}
