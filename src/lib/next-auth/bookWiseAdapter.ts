import { PrismaClient } from '@prisma/client'
import { Adapter, AdapterUser } from 'next-auth/adapters'

export function BookWiseAdapter(prisma: PrismaClient): Adapter {
  return {
    async createUser(user): Promise<AdapterUser> {
      const prismaUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          avatar_url: user.image,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        emailVerified: prismaUser.emailVerified,
        image: prismaUser.avatar_url,
      }
    },
    async getUser(id) {
      const prismaUser = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      return prismaUser
        ? {
            id: prismaUser.id,
            name: prismaUser.name,
            email: prismaUser.email,
            emailVerified: prismaUser.emailVerified,
            image: prismaUser.avatar_url,
          }
        : null
    },
    async getUserByEmail(email) {
      const prismaUser = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      return prismaUser
        ? {
            id: prismaUser.id,
            name: prismaUser.name,
            email: prismaUser.email,
            emailVerified: prismaUser.emailVerified,
            image: prismaUser.avatar_url,
          }
        : null
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const prismaAccount = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      return prismaAccount
        ? {
            id: prismaAccount.user.id,
            name: prismaAccount.user.name,
            email: prismaAccount.user.email,
            emailVerified: prismaAccount.user.emailVerified,
            image: prismaAccount.user.avatar_url,
          }
        : null
    },
    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.image,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        emailVerified: prismaUser.emailVerified,
        image: prismaUser.avatar_url,
      }
    },
    async createSession({ sessionToken, userId, expires }) {
      const session = await prisma.session.create({
        data: {
          userId,
          expires,
          sessionToken,
        },
      })

      return {
        userId: session.userId,
        expires: session.expires,
        sessionToken: session.sessionToken,
      }
    },
    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!prismaSession) return null

      const { user, ...session } = prismaSession

      return {
        session: {
          userId: session.userId,
          expires: session.expires,
          sessionToken: session.sessionToken,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.avatar_url,
        },
      }
    },
    async updateSession({ sessionToken, expires, userId }) {
      const prismaSession = await prisma.session.update({
        where: {
          sessionToken,
        },
        data: {
          expires,
          userId,
        },
      })

      return {
        sessionToken: prismaSession.sessionToken,
        userId: prismaSession.userId,
        expires: prismaSession.expires,
      }
    },
    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          sessionToken,
        },
      })
    },
    async linkAccount(account) {
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },
  }
}
