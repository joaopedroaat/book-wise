import { z } from 'zod'

const environmentSchema = z.object({
  NODE_ENV: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
})

export const environment = environmentSchema.parse(process.env)
