import { GithubIcon } from '@/components/GithubIcon'
import { GoogleIcon } from '@/components/GoogleIcon'
import { Providers, login } from '@/utils/login'
import { SignIn, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'

export function SignInForm() {
  function handleSignIn(provider: Providers) {
    login(provider)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="flex items-center justify-center gap-3 font-bold text-sm"
          title="Login"
        >
          <span className="hidden md:inline-block">Fazer login</span>
          <SignIn className="text-green-100 text-xl" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black opacity-70" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-96 p-4 rounded-xl flex flex-col items-center">
          <Dialog.Close className="self-end" asChild>
            <button>
              <X size={24} />
            </button>
          </Dialog.Close>
          <Dialog.DialogDescription className="mb-10 font-bold">
            Faça login
          </Dialog.DialogDescription>
          <ul className="flex flex-col gap-4 w-full">
            <li>
              <button
                className="w-full flex gap-3 items-center px-6 py-5 bg-gray-600 rounded-lg hover:bg-gray-500 cursor-pointer"
                onClick={() => handleSignIn(Providers.GOOGLE)}
              >
                <GoogleIcon />
                Entrar com Google
              </button>
            </li>
            <li>
              <button
                className="w-full flex gap-3 items-center px-6 py-5 bg-gray-600 rounded-lg hover:bg-gray-500 cursor-pointer"
                onClick={() => handleSignIn(Providers.GITHUB)}
              >
                <GithubIcon />
                Entrar com Github
              </button>
            </li>
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
