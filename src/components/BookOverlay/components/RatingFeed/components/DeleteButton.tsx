import { useRatingsOnBookMutation } from '@/services/BookWiseService/hooks/useRatingsOnBookMutation'
import { Trash } from '@phosphor-icons/react'

type DeleteButtonProps = {
  ratingId: string
}

export function DeleteButton({ ratingId }: DeleteButtonProps) {
  const { deleteMutation } = useRatingsOnBookMutation()

  return (
    <Trash
      className="text-red-100 cursor-pointer"
      weight="bold"
      onClick={() => deleteMutation.mutate(ratingId)}
    />
  )
}
