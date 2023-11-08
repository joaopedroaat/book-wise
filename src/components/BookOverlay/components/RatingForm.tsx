import { Avatar } from '@/components/Avatar'
import { StarRating } from '@/components/StarRating'
import { Book } from '@/services/BookWiseService/types'
import { Check, X } from '@phosphor-icons/react'
import { User } from 'next-auth'

type RatingFormProps = {
  book: Book
  user: User
}

export function RatingForm({ user }: RatingFormProps) {
  return (
    <div className="p-6 rounded-lg bg-gray-700">
      <header className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            user={{ id: user?.id, name: user?.name, avatarUrl: user?.image }}
          />
          <strong>{user.name}</strong>
        </div>
        <StarRating rating={0} />
      </header>
      <main className="mt-6">
        <textarea
          className="w-full h-40 p-3 bg-gray-800 rounded"
          placeholder="Escreva sua avaliação"
          maxLength={450}
        />
      </main>
      <footer className="mt-3 flex justify-end gap-2">
        <button className="bg-gray-600 p-2 rounded">
          <X className="text-purple-100" size={24} />
        </button>
        <button className="bg-gray-600 p-2 rounded">
          <Check className="text-green-100" size={24} />
        </button>
      </footer>
    </div>
  )
}
