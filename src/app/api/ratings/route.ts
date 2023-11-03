import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const searchParamsSchema = z.object({
  page: z
    .number()
    .nonnegative()
    .nullable()
    .transform((val) => val || 1),
  includeUser: z
    .enum(['true', 'false'])
    .nullable()
    .transform((val) => val === 'true'),
  includeBook: z
    .enum(['true', 'false'])
    .nullable()
    .transform((val) => val === 'true'),
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const validatedSearchParams = searchParamsSchema.safeParse({
    page: searchParams.get('page'),
    includeUser: searchParams.get('includeUser'),
    includeBook: searchParams.get('includeBook'),
  })

  if (!validatedSearchParams.success)
    return Response.json(
      { error: validatedSearchParams.error },
      { status: 400 },
    )

  const { page, includeBook, includeUser } = validatedSearchParams.data

  const ratingsPerPage = 10

  const ratings = await prisma.rating.findMany({
    skip: (page - 1) * ratingsPerPage,
    take: 10,
    include: {
      user: includeUser,
      book: includeBook && {
        include: {
          ratings: true,
          categories: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return Response.json({ ratings })
}
