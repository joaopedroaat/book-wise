import { Avatar } from '@/components/Avatar'
import { StarRatingInput } from '@/components/StarRatingInput'
import { useRatingsOnBookMutation } from '@/services/BookWiseService/hooks/useRatingsOnBookMutation'
import { Book, PostRating } from '@/services/BookWiseService/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, X } from '@phosphor-icons/react'
import { User } from 'next-auth'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type RatingFormProps = {
  book: Book
  user: User
  onAbort: () => void
}

const ratingFormSchema = z.object({
  rate: z.coerce.number().min(1).max(5),
  description: z.string().min(1, 'A descrição é obrigatória').max(450),
})

export type RatingFormSchema = z.infer<typeof ratingFormSchema>

export function RatingForm({ book, user, onAbort }: RatingFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<RatingFormSchema>({
    resolver: zodResolver(ratingFormSchema),
  })

  const { postMutation } = useRatingsOnBookMutation()

  async function handleFormSubmit(data: RatingFormSchema) {
    postMutation.mutate({ ...data, bookId: book.id, userId: user.id })
    handleAbort()
  }

  function handleAbort() {
    reset()
    onAbort()
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-6 rounded-lg bg-gray-700"
    >
      <header className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar user={user} />
          <strong>{user.name}</strong>
        </div>
        <Controller
          name="rate"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col text-right">
              <StarRatingInput
                onRateChange={(newRate) => field.onChange(newRate)}
                rate={field.value}
              />
              {errors.rate && (
                <small className="block text-red-100">Dê uma nota</small>
              )}
            </div>
          )}
        />
      </header>
      <main className="mt-6">
        <textarea
          {...register('description')}
          className={`w-full h-40 p-3 bg-gray-800 rounded focus:outline outline-1 ${
            errors.description ? 'outline-red-100' : 'outline-purple-100'
          }`}
          placeholder="Escreva sua avaliação"
          maxLength={450}
        />
        {errors.description && (
          <small className="block mt-1 text-right text-red-100">
            {errors.description.message}
          </small>
        )}
      </main>
      <footer className="mt-3 flex justify-end gap-2">
        <button
          className="bg-gray-600 p-2 rounded"
          type="button"
          onClick={handleAbort}
        >
          <X className="text-purple-100" size={24} />
        </button>
        <button
          className="bg-gray-600 p-2 rounded"
          type="submit"
          disabled={isSubmitting}
        >
          <Check className="text-green-100" size={24} />
        </button>
      </footer>
    </form>
  )
}
