import { Star } from '@phosphor-icons/react'

type StarRatingInputProps = {
  onRateChange: (newRate: number) => void
  rate: number
  size?: number
}

export function StarRatingInput({
  rate,
  onRateChange,
  size = 20,
}: StarRatingInputProps) {
  function handleRateChange(newRate: number) {
    onRateChange(newRate)
  }

  return (
    <div className="text-purple-100">
      <button type="button" onClick={() => handleRateChange(1)}>
        <Star size={size} weight={rate >= 1 ? 'fill' : undefined} />
      </button>
      <button type="button" onClick={() => handleRateChange(2)}>
        <Star size={size} weight={rate >= 2 ? 'fill' : undefined} />
      </button>
      <button type="button" onClick={() => handleRateChange(3)}>
        <Star size={size} weight={rate >= 3 ? 'fill' : undefined} />
      </button>
      <button type="button" onClick={() => handleRateChange(4)}>
        <Star size={size} weight={rate >= 4 ? 'fill' : undefined} />
      </button>
      <button type="button" onClick={() => handleRateChange(5)}>
        <Star size={size} weight={rate === 5 ? 'fill' : undefined} />
      </button>
    </div>
  )
}
