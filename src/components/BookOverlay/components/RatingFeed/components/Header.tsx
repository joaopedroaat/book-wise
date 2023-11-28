import { LoginDialog } from '@/components/LoginDialog'
import { useSession } from 'next-auth/react'

type HeaderProps = {
  onRateClick: () => void
}

export function Header({ onRateClick }: HeaderProps) {
  const isAuthenticated = useSession().status === 'authenticated'

  const rateButton = (
    <button className="text-purple-100 font-bold text-sm" onClick={onRateClick}>
      Avaliar
    </button>
  )

  return (
    <div className="flex items-center justify-between">
      <small className="text-gray-200">Avaliações</small>
      {isAuthenticated ? (
        rateButton
      ) : (
        <LoginDialog description="Faça login para deixar sua avaliação">
          {rateButton}
        </LoginDialog>
      )}
    </div>
  )
}
