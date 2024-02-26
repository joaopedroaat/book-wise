import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const environment = z
  .object({
    NODE_ENV: z.string().optional(),
  })
  .parse(process.env)

let prisma: PrismaClient

if (environment.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export { prisma }
