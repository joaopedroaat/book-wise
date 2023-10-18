'use client'

import { GithubIcon } from '@/components/GithubIcon'
import { GoogleIcon } from '@/components/GoogleIcon'
import { SignIn, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { signIn } from 'next-auth/react'

export function LoginDialog() {
  function handleLogin(provider: 'google' | 'github') {
    signIn(provider)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-transparent border-none flex items-center gap-3 text-gray-200 font-bold cursor-pointer text-base">
        Fazer login
        <SignIn className="text-green-100" size={24} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
        <Dialog.Content className="flex flex-col fixed w-[516px] h-[337px] top-1/2 left-1/2 p-4 bg-gray-700 rounded-xl -translate-x-2/4 -translate-y-2/4">
          <Dialog.Close className="self-end mb-4 bg-transparent border-none text-gray-400 cursor-pointer">
            <X size={24} />
          </Dialog.Close>
          <header className="mb-10 w-full text-center font-bold">
            Faça login para deixar sua avaliação
          </header>
          <main>
            <ul className="list-none flex flex-col gap-4 [&>li]:flex [&>li]:gap-3 [&>li]:items-center [&>li]:px-6 [&>li]:py-5 [&>li]:bg-gray-600 [&>li]:rounded-lg [&>li]:cursor-pointer hover:[&>li]:bg-gray-500">
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
