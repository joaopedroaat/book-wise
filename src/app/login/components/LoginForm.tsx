'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GithubIcon } from '../../../components/GithubIcon'
import { GoogleIcon } from '../../../components/GoogleIcon'
import { GuestIcon } from '../../../components/GuestIcon'

export function LoginForm() {
  const [provider, setProvider] = useState<'google' | 'github' | null>(null)

  const router = useRouter()

  function handleSignIn(account?: 'google' | 'github') {
    setProvider(account || null)

    if (account) signIn(account, { callbackUrl: '/home' })

    router.push('/home')
  }

  return (
    <div className="w-96">
      <header className="mb-10">
        <h1>Boas vindas!</h1>
        <p>Faça seu login ou acesse como visitante.</p>
      </header>
      <main>
        <ul className="list-none flex flex-col gap-5 p-0 [&>li]:bg-gray-600 [&>li]:flex [&>li]:items-center [&>li]:gap-5 [&>li]:py-5 [&>li]:px-6 [&>li]:rounded-lg [&>li]:cursor-pointer hover:[&>li]:bg-gray-500 [&>li]:font-bold">
          <li
            className={`${provider === 'google' && 'animate-pulse'}`}
            onClick={() => handleSignIn('google')}
          >
            <GoogleIcon width={24} height={20} />
            Entrar com Google
          </li>
          <li
            className={`${provider === 'github' && 'animate-pulse'}`}
            onClick={() => handleSignIn('github')}
          >
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
