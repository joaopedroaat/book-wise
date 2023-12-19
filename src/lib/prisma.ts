import { PrismaClient } from '@prisma/client'

export const prisma =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient({
        datasources: {
          db: {
            url: process.env.POSTGRES_PRISMA_URL,
          },
        },
      })
    : new PrismaClient()
