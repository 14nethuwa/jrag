import './globals.css'
import type { ReactNode } from 'react'
import { Lato, Quicksand, Roboto_Condensed } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['500', '600', '700'],
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
})

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
  weight: ['400', '500', '700'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${lato.variable} ${robotoCondensed.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
