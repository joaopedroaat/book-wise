import { LoginDialog } from '@/components/LoginDialog'
import { SignIn } from '@phosphor-icons/react/dist/ssr/SignIn'

export function SignInForm() {
  return (
    <LoginDialog>
      <button
        className="flex items-center justify-center gap-3 font-bold text-sm"
        title="Login"
      >
        <span className="hidden md:inline-block">Fazer login</span>
        <SignIn className="text-green-100 text-xl" />
      </button>
    </LoginDialog>
  )
}
