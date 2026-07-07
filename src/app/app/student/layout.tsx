import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user?.role || session.user.role !== 'student') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">💰 マネぼう</h1>
            <span className="text-sm text-gray-500">生徒</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{session.user.email}</span>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/login' })
              }}
            >
              <button
                type="submit"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ログアウト
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* ボトムナビゲーション（モバイル） */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
        <div className="flex justify-around">
          <Link
            href="/app/student/dashboard"
            className="flex-1 py-2 px-1 text-center text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            🏠 ホーム
          </Link>
          <Link
            href="/app/student/mane"
            className="flex-1 py-2 px-1 text-center text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            💰 履歴
          </Link>
        </div>
      </nav>

      {/* モバイル用パディング */}
      <div className="h-16 sm:hidden" />
    </div>
  )
}
