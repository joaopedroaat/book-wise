import { LoginDialog } from '@/components/LoginDialog'

type HeaderProps = {
  isAuthenticated: boolean
  setRatingFormVisibility: (isVisible: boolean) => void
}

export function Header({
  isAuthenticated,
  setRatingFormVisibility,
}: HeaderProps) {
  const rateButton = (
    <button
      className="text-purple-100 font-bold text-sm"
      onClick={() => setRatingFormVisibility(true)}
    >
      Avaliar
    </button>
  )

  return (
    <div className="flex items-center justify-between">
      <small>Avaliações</small>
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
