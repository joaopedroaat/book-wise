// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    image: string | null
  }

  interface Session {
    user: User
  }
}
