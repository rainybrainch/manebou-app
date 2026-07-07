import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'マネぼう アプリ',
  description: '学生向け仮想通貨マネージメント',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
