import NextAuth, { AuthOptions } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

const githubClientId = process.env.GITHUB_CLIENT_ID
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET

const nextauthSecret = process.env.NEXTAUTH_SECRET

if (!googleClientId)
  throw new Error('GOOGLE_CLIENT_ID environment variable not provided.')
else if (!googleClientSecret)
  throw new Error('GOOGLE_CLIENT_SECRET environment variable not provided.')
else if (!githubClientId)
  throw new Error('GITHUB_CLIENT_ID environment variable not provided.')
else if (!githubClientSecret)
  throw new Error('GITHUB_CLIENT_SECRET environment variable not provided.')
else if (!nextauthSecret)
  throw new Error('NEXTAUTH_SECRET environment variable not provided.')

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  ],

  secret: nextauthSecret,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
