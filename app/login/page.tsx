'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input, Button, Card, Alert } from '../components/ui'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const demoUsers = [
    {
      email: 'student1@school.jp',
      name: '学生用',
      description: '田中花子（学生）',
      icon: '🎓',
    },
    {
      email: 'teacher@school.jp',
      name: '先生用',
      description: '先生太郎（先生）',
      icon: '👨‍🏫',
    },
    {
      email: 'admin@school.jp',
      name: '管理者用',
      description: '管理者太郎（管理者）',
      icon: '🔐',
    },
  ]

  const demoUsersMap: Record<string, any> = {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = demoUsersMap[email]
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

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setError('')
    setLoading(true)

    setTimeout(() => {
      const user = demoUsersMap[demoEmail]
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        router.push('/app/student/dashboard')
      }
      setLoading(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* ヘッダー */}
      <div className="w-full max-w-md mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg mb-4">
            <span className="text-3xl">💰</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">マネぼう</h1>
          <p className="text-gray-600 text-lg">学生向け仮想通貨管理アプリ</p>
        </div>
      </div>

      {/* メインカード */}
      <Card className="w-full max-w-md shadow-2xl">
        {/* ログインフォーム */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* エラーメッセージ */}
          {error && <Alert variant="error">{error}</Alert>}

          {/* メールアドレス入力 */}
          <Input
            id="email"
            label="メールアドレス"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@school.jp"
            icon="📧"
          />

          {/* パスワード入力 */}
          <Input
            id="password"
            label="パスワード"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon="🔐"
          />

          {/* ログインボタン */}
          <Button type="submit" size="lg" disabled={loading} loading={loading}>
            ログイン
          </Button>
        </form>

        {/* または区切り線 */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-600 font-medium">デモユーザーでクイックログイン</span>
          </div>
        </div>

        {/* デモユーザーボタン */}
        <div className="grid grid-cols-1 gap-3">
          {demoUsers.map((demoUser) => (
            <button
              key={demoUser.email}
              type="button"
              onClick={() => quickLogin(demoUser.email)}
              disabled={loading}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-left disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`${demoUser.name}でログイン`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl mb-1">{demoUser.icon}</div>
                  <p className="font-semibold text-gray-900 text-sm">{demoUser.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{demoUser.email}</p>
                </div>
                <span className="text-lg">→</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* フッター情報 */}
      <div className="mt-6 text-center text-xs text-gray-600 max-w-md">
        <p className="mb-2">💡 デモユーザーで全機能をお試しできます</p>
        <p>パスワードは不要です。メールアドレスだけでログインできます。</p>
      </div>

      {/* アカデミーへのリンク */}
      <div className="mt-6 text-center">
        <a
          href="https://manebou-juku.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          <span className="mr-1">🏠</span> マネぼう塾に戻る
        </a>
      </div>

      {/* 背景装飾 */}
      <div className="fixed top-0 left-0 -z-10 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
    </div>
  )
}
