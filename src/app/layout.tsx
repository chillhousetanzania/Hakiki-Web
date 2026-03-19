import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hakiki - Vehicle History Reports for Tanzania',
  description: 'Check any used car history before you buy. Mileage verification, accident records, theft checks for Japanese and European imports in Tanzania.',
  keywords: ['vehicle history', 'car check', 'Tanzania', 'VIN check', 'used car', 'mileage verification'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
