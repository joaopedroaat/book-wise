import NextAuth, { AuthOptions } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { BookWiseAdapter } from '@/lib/next-auth/bookWiseAdapter'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { z } from 'zod'

const environment = z
  .object({
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
  })
  .parse(process.env)

export const authOptions: AuthOptions = {
  adapter: BookWiseAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: environment.GOOGLE_CLIENT_ID,
      clientSecret: environment.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: environment.GITHUB_CLIENT_ID,
      clientSecret: environment.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    session({ session, user }) {
      return { ...session, user }
    },
  },

  secret: environment.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
