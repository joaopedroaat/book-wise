import { prisma } from '@/lib/prisma'
import { BookResponse, bookSchema } from './book.schema'

export async function GET() {
  try {
    const books = bookSchema.array().parse(await prisma.book.findMany())

    return Response.json({ books } as BookResponse)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
