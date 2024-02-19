import { prisma } from '@/lib/prisma'
import { UserResponse, userSchema } from './users.schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const user = userSchema.parse(
      await prisma.user.findUnique({ where: { id } }),
    )

    return Response.json({ user } as UserResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
