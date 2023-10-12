import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page')) || 1

  const ratings = await prisma.rating.findMany({
    skip: (page - 1) * 10,
    take: 10,
  })

  return Response.json({ ratings })
}
