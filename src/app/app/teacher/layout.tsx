'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">💰 マネぼう 先生</h1>
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
            ログアウト
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden sm:block w-64 bg-white border-r border-gray-200">
          <nav className="space-y-1 p-4">
            <Link href="/app/teacher/dashboard" className="block px-4 py-2 rounded-md hover:bg-gray-100">🏠 ダッシュボード</Link>
            <Link href="/app/teacher/students" className="block px-4 py-2 rounded-md hover:bg-gray-100">👥 生徒一覧</Link>
            <Link href="/app/teacher/mane-management" className="block px-4 py-2 rounded-md hover:bg-gray-100">💸 マネ管理</Link>
            <Link href="/app/ranking" className="block px-4 py-2 rounded-md hover:bg-gray-100">🏆 ランキング</Link>
          </nav>
        </aside>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
        <div className="flex justify-around text-xs">
          <Link href="/app/teacher/students" className="flex-1 py-2 px-1 text-center">👥 生徒</Link>
          <Link href="/app/teacher/mane-management" className="flex-1 py-2 px-1 text-center">💸 管理</Link>
        </div>
      </nav>
      <div className="h-16 sm:hidden" />
    </div>
  )
}
