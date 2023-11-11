import { PrismaClient } from '@prisma/client'
import { Adapter, AdapterUser } from 'next-auth/adapters'

export function BookWiseAdapter(prisma: PrismaClient): Adapter {
  return {
    async createUser(user): Promise<AdapterUser> {
      const prismaUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          avatarUrl: user.image,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        emailVerified: prismaUser.emailVerified,
        image: prismaUser.avatarUrl,
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
            image: prismaUser.avatarUrl,
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
            image: prismaUser.avatarUrl,
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
            image: prismaAccount.user.avatarUrl,
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
          avatarUrl: user.image,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        emailVerified: prismaUser.emailVerified,
        image: prismaUser.avatarUrl,
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
          image: user.avatarUrl,
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
          refreshToken: account.refresh_token,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          tokenType: account.token_type,
          scope: account.scope,
          idToken: account.id_token,
          sessionState: account.session_state,
        },
      })
    },
  }
}
