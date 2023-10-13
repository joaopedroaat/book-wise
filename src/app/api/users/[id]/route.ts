import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id

  const user = await prisma.user.findUnique({ where: { id } })

  return Response.json({ user })
}
