'use client'

import { SignIn, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import './styles.css'
import { GoogleIcon } from '../../../GoogleIcon'
import { GithubIcon } from '../../../GithubIcon'
import { signIn } from 'next-auth/react'

export function LoginDialog() {
  function handleLogin(provider: 'google' | 'github') {
    signIn(provider)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="dialog-trigger">
        Fazer login
        <SignIn size={24} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Close className="dialog-close">
            <X size={24} />
          </Dialog.Close>
          <header>Faça login para deixar sua avaliação</header>
          <main>
            <ul>
              <li onClick={() => handleLogin('google')}>
                <GoogleIcon />
                Entrar com Google
              </li>
              <li onClick={() => handleLogin('github')}>
                <GithubIcon />
                Entrar com Github
              </li>
            </ul>
          </main>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
