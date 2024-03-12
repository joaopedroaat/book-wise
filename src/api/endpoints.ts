import { z } from 'zod'

const basePath = z.string().url().parse(process.env.NEXT_PUBLIC_BASE_URL)

export const endpoints = {
  bw: new URL('/api', basePath).toString(),
}
