'use client'

import { useRouter } from 'next/navigation'
import { GithubIcon } from '../GithubIcon'
import { GoogleIcon } from '../GoogleIcon'
import { signIn } from 'next-auth/react'
import { GuestIcon } from '../GuestIcon'
import './styles.css'

export function LoginForm() {
  const router = useRouter()

  function handleSignIn(provider?: 'google' | 'github') {
    if (provider) signIn(provider, { callbackUrl: '/book-wise/home' })

    router.push('/book-wise/home')
  }

  return (
    <div className="login-form-container">
      <header>
        <h1>Boas vindas!</h1>
        <p>Faça seu login ou acesse como visitante.</p>
      </header>
      <main>
        <ul>
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
