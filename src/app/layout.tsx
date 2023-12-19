import { Providers } from '@/providers/Providers'
import '@/styles/global.css'
import type { Metadata } from 'next'
import { Nunito_Sans as NunitoSans } from 'next/font/google'

const nunito = NunitoSans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book Wise',
  description: 'Descubra e avalie livros.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
