'use client'

import githubLogo from '@/assets/github-logo.svg'
import googleLogo from '@/assets/google-logo.svg'
import rocketLogo from '@/assets/rocket-logo.svg'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import '@/styles/app/page.css'

export default function Home() {
  return (
    <main>
      <div className="loginMenu">
        <header>
          <h1>Boas vindas!</h1>
          <p>Faça seu login ou acesse como visitante.</p>
        </header>
        <ul>
          <li onClick={() => signIn('google')}>
            <Image
              src={googleLogo}
              width={24}
              height={20}
              alt="Logo da Google"
            />
            Entrar com Google
          </li>
          <li onClick={() => signIn('github')}>
            <Image
              src={githubLogo}
              width={24}
              height={20}
              alt="Logo do GitHub"
            />
            Entrar com GitHub
          </li>
          <li>
            <Image
              src={rocketLogo}
              width={24}
              height={20}
              alt="Logo do visitante"
            />
            Acessar como visitante
          </li>
        </ul>
      </div>
    </main>
  )
}
