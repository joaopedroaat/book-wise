// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    avatarUrl: string | null
  }

  interface Session {
    user: User
  }
}
