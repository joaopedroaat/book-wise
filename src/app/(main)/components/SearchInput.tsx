import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const querySchema = z.object({
  query: z.string(),
})

type QueryForm = z.infer<typeof querySchema>

export function SearchInput() {
  const { register, handleSubmit } = useForm<QueryForm>({
    resolver: zodResolver(querySchema),
  })

  const onSubmit = (data: QueryForm) => {
    console.log(data.query)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 border border-gray-500 text-gray-300 placeholder:text-gray-400 px-4 py-2 rounded-md focus-within:outline focus-within:outline-gray-500"
    >
      <input
        type="text"
        placeholder="Buscar livro ou autor"
        className="bg-gray-800 outline-none"
        {...register('query')}
      />
      <MagnifyingGlass className="text-gray-500" size={20} />
    </form>
  )
}
