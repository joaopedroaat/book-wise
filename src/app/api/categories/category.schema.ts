import { z } from 'zod'

export enum Genre {
  GEEK = 'Geek',
  ROMANCE = 'Romance',
  SUSPENSE = 'Suspense',
  FICTION = 'Ficção',
  FABLE = 'Fábula',
  HORROR = 'Terror',
  ALLEGORY = 'Alegoria',
  ARCHITECTURE = 'Arquitetura',
  SELF_HELP = 'Autoajuda',
  PROGRAMMING = 'Programação',
  ADVENTURE = 'Aventura',
  EDUCATION = 'Educação',
}

export const categorySchema = z.object({
  id: z.string(),
  name: z.nativeEnum(Genre),
})
export type Category = z.infer<typeof categorySchema>

const categoryResponseSchema = z.object({
  categories: categorySchema.array(),
})
export type CategoryResponse = z.infer<typeof categoryResponseSchema>
