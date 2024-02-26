import { useRatingMutation } from '@/hooks/useRatingMutation'
import { Check, Trash, X } from '@phosphor-icons/react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

type DeleteButtonProps = {
  ratingId: string
}

export function DeleteButton({ ratingId }: DeleteButtonProps) {
  const { deleteMutation } = useRatingMutation()
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="text-purple-200 cursor-pointer">
          <Trash weight="bold" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-60" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 p-4 rounded-md">
          <AlertDialog.Title>Deseja excluir sua avaliação?</AlertDialog.Title>
          <div className="flex justify-end mt-4 gap-4">
            <AlertDialog.Cancel asChild>
              <button className="bg-gray-600 p-2 rounded" type="button">
                <X className="text-purple-100" size={24} />
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="bg-gray-600 p-2 rounded" type="submit">
                <Check
                  className="text-green-100"
                  size={24}
                  onClick={() => deleteMutation.mutate(ratingId)}
                />
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
