import { prisma } from '@/lib/prisma'
import { userSchema } from '@/services/BookWiseService/schemas'
import { SingleUserResponse } from '@/services/BookWiseService/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    const user = await prisma.user.findUnique({ where: { id } })
    const parsedUser = userSchema.parse(user)

    return Response.json({ user: parsedUser } as SingleUserResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
