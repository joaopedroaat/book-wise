'use client'

import githubLogo from '@/assets/github-logo.svg'
import googleLogo from '@/assets/google-logo.svg'
import rocketLogo from '@/assets/rocket-logo.svg'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import './page.css'
import { useRouter } from 'next/navigation'
import bookWiseLogo from '@/assets/book-wise-logo.svg'

export default function Login() {
  const router = useRouter()

  function handleSignIn(provider?: 'google' | 'github') {
    if (provider) signIn(provider, { callbackUrl: '/book-wise/home' })

    router.push('/book-wise/home')
  }

  return (
    <div className="login-page-container">
      <aside>
        <Image
          src={bookWiseLogo}
          width={183}
          height={419}
          alt="BookWise logo."
        />
      </aside>
      <main>
        <section>
          <header>
            <h1>Boas vindas!</h1>
            <p>Faça seu login ou acesse como visitante.</p>
          </header>
          <main>
            <ul>
              <li onClick={() => handleSignIn('google')}>
                <Image
                  src={googleLogo}
                  width={24}
                  height={20}
                  alt="Logo da Google"
                />
                Entrar com Google
              </li>
              <li onClick={() => handleSignIn('github')}>
                <Image
                  src={githubLogo}
                  width={24}
                  height={20}
                  alt="Logo do GitHub"
                />
                Entrar com GitHub
              </li>
              <li onClick={() => handleSignIn()}>
                <Image
                  src={rocketLogo}
                  width={24}
                  height={20}
                  alt="Logo do visitante"
                />
                Acessar como visitante
              </li>
            </ul>
          </main>
        </section>
      </main>
    </div>
  )
}
