import bookWiseLogo from '@/assets/book-wise-logo.svg'
import Image from 'next/image'
import { LoginForm } from './components/LoginForm'

export default function Login() {
  return (
    <div className="w-full h-screen p-5 grid grid-cols-5">
      <aside className="w-full hidden col-span-2 md:flex items-center justify-center rounded-lg h-full bg-cover bg-bookwise-cover">
        <Image
          src={bookWiseLogo}
          width={183}
          height={419}
          alt="BookWise logo."
        />
      </aside>
      <main className="col-span-full md:col-span-3 flex flex-col justify-center items-center">
        <LoginForm />
      </main>
    </div>
  )
}
