'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // デモユーザー用：メールアドレスで認証を判定
      const demoUsers: Record<string, any> = {
        'teacher@school.jp': {
          id: 'user-teacher-001',
          email: 'teacher@school.jp',
          fullName: '先生太郎',
          role: 'teacher',
          schoolId: 'school-001',
          moneyBalance: 5000,
        },
        'admin@school.jp': {
          id: 'user-admin-001',
          email: 'admin@school.jp',
          fullName: '管理者太郎',
          role: 'admin',
          schoolId: 'school-001',
          moneyBalance: 10000,
        },
        'student1@school.jp': {
          id: 'student-001',
          email: 'student1@school.jp',
          fullName: '田中花子',
          role: 'student',
          schoolId: 'school-001',
          classId: 'class-1a',
          moneyBalance: 1000,
        },
      }

      const user = demoUsers[email]
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        router.push('/app/student/dashboard')
      } else {
        setError('認識されたメールアドレスではありません')
      }
    } catch (err) {
      setError('ログインに失敗しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* ロゴ・タイトル */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">💰 マネぼうアプリ</h1>
          <p className="mt-2 text-sm text-gray-600">
            メールアドレスとパスワードでログイン
          </p>
        </div>

        {/* ログインフォーム */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* エラーメッセージ */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {/* メールアドレス */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@example.com"
            />
          </div>

          {/* パスワード */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* ログインボタン */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        {/* フッター */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            アカウントをお持ちでない場合は、先生に申請してください。
          </p>
        </div>

        <div className="text-center mt-4 pt-4 border-t border-gray-200">
          <a
            href="https://manebou-juku.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            🏠 アカデミーに戻る
          </a>
        </div>
      </div>
    </div>
  )
}
