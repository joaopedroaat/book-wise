// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
  }

  interface Session {
    user: User
  }
}
