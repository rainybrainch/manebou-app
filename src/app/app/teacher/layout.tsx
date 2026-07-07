import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user?.role || session.user.role !== 'teacher') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">💰 マネぼう</h1>
            <span className="text-sm text-gray-500">先生</span>
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

      <div className="flex">
        {/* サイドバー（デスクトップ） */}
        <aside className="hidden sm:block w-64 bg-white border-r border-gray-200">
          <nav className="space-y-1 p-4">
            <Link
              href="/app/teacher/students"
              className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              👥 生徒一覧
            </Link>
            <Link
              href="/app/teacher/mane-management"
              className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              💸 マネ管理
            </Link>
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>

      {/* ボトムナビゲーション（モバイル） */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
        <div className="flex justify-around">
          <Link
            href="/app/teacher/students"
            className="flex-1 py-2 px-1 text-center text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            👥 一覧
          </Link>
          <Link
            href="/app/teacher/mane-management"
            className="flex-1 py-2 px-1 text-center text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            💸 管理
          </Link>
        </div>
      </nav>

      {/* モバイル用パディング */}
      <div className="h-16 sm:hidden" />
    </div>
  )
}
