'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { GithubIcon } from '../../../components/GithubIcon'
import { GoogleIcon } from '../../../components/GoogleIcon'
import { GuestIcon } from '../../../components/GuestIcon'
import { useState } from 'react'

enum Providers {
  GITHUB = 'github',
  GOOGLE = 'google',
  GUEST = 'guest',
}

export function LoginForm() {
  const [selectedProvider, setSelectedProvider] = useState<Providers | null>(
    null,
  )

  const router = useRouter()

  function handleSignIn(account: Providers) {
    setSelectedProvider(account)

    if (account !== Providers.GUEST) signIn(account, { callbackUrl: '/home' })

    router.push('/home')
  }

  const LoginProvider = ({ provider }: { provider: Providers }) => (
    <li
      className={`bg-gray-600 flex items-center gap-5 py-5 px-6 rounded-lg cursor-pointer font-bold hover:bg-gray-500 ${
        provider === selectedProvider && 'animate-pulse'
      }`}
      onClick={() => handleSignIn(provider)}
    >
      {provider === Providers.GITHUB && (
        <>
          <GithubIcon width={24} height={20} />
          Entrar com GitHub
        </>
      )}

      {provider === Providers.GOOGLE && (
        <>
          <GoogleIcon width={24} height={20} />
          Entrar com Google
        </>
      )}

      {provider === Providers.GUEST && (
        <>
          <GuestIcon width={24} height={20} />
          Acessar como visitante
        </>
      )}
    </li>
  )

  return (
    <div className="w-96">
      <header className="mb-10">
        <h1>Boas vindas!</h1>
        <p>Faça seu login ou acesse como visitante.</p>
      </header>
      <main>
        <ul className="list-none flex flex-col gap-5 p-0 [&>li]:bg-gray-600 [&>li]:flex [&>li]:items-center [&>li]:gap-5 [&>li]:py-5 [&>li]:px-6 [&>li]:rounded-lg [&>li]:cursor-pointer hover:[&>li]:bg-gray-500 [&>li]:font-bold">
          <LoginProvider provider={Providers.GOOGLE} />
          <LoginProvider provider={Providers.GITHUB} />
          <LoginProvider provider={Providers.GUEST} />
        </ul>
      </main>
    </div>
  )
}
