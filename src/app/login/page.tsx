import bookWiseLogo from '@/assets/book-wise-logo.svg'
import Image from 'next/image'
import './page.css'
import { LoginForm } from '@/components/LoginForm'

export default function Login() {
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
        <LoginForm />
      </main>
    </div>
  )
}
