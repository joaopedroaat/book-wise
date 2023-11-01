import { signIn } from 'next-auth/react'

export enum Providers {
  GOOGLE = 'google',
  GITHUB = 'github',
}

export function login(
  provider: Providers,
  { callbackUrl }: { callbackUrl?: string } = {},
) {
  if (provider) signIn(provider, { callbackUrl })
}
