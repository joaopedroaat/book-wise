export function calculateDateDistance(date: Date): string {
  const currentDate: Date = new Date()
  const timeDifferenceInMilliseconds: number =
    date.getTime() - currentDate.getTime()
  const differenceInDays: number = Math.floor(
    timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24),
  )

  const rtf = new Intl.RelativeTimeFormat('pt-BR')

  return rtf.format(differenceInDays, 'day')
}
