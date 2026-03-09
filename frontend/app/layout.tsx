import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Mono, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const dmMono = DM_Mono({ 
  subsets: ["latin"],
  weight: ['400', '500'],
  variable: '--font-mono',
})

const syne = Syne({ 
  subsets: ["latin"],
  weight: ['600', '700', '800'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'RESQ — Emergency Animal Rescue Coordination',
  description: "India's first real-time AI animal emergency coordination grid. When seconds decide fate — RESQ acts.",
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#070A10',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable} ${syne.variable}`}>
      <body className="font-sans antialiased grain-overlay scanline-overlay">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
