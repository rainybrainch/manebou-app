'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">💰 マネぼう</h1>
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
            ログアウト
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
        <div className="flex justify-around">
          <Link href="/app/student/dashboard" className="flex-1 py-2 px-1 text-center text-xs font-medium">🏠 ホーム</Link>
          <Link href="/app/student/mane" className="flex-1 py-2 px-1 text-center text-xs font-medium">💰 履歴</Link>
        </div>
      </nav>
      <div className="h-16 sm:hidden" />
    </div>
  )
}
