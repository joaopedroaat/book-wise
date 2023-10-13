import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Math.abs(Number(searchParams.get('page'))) || 1
  const includeUsers = searchParams.get('includeUsers') === 'true'
  const includeBooks = searchParams.get('includeBooks') === 'true'

  const ratings = await prisma.rating.findMany({
    skip: (page - 1) * 10,
    take: 10,
    include: {
      user: includeUsers,
      book: includeBooks,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return Response.json({ ratings })
}
