'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TeacherDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsed = JSON.parse(userData)
    setUser(parsed)

    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/schools?schoolId=${parsed.schoolId}`)
        const data = await res.json()
        if (data.success && data.data.length > 0) {
          setStats(data.data[0].stats)
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* ヘッダー */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">🏠 ダッシュボード</h1>
        <p className="text-gray-600 mt-2">{user?.fullName} さん、こんにちは</p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">学校</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.schoolName || '-'}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">生徒数</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.studentCount || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-medium">クラス数</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.classCount || 0}</p>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 クイックアクション</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/app/teacher/students"
            className="block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition-all duration-200 border border-blue-200"
          >
            <div className="text-3xl mb-2">👥</div>
            <p className="font-semibold text-gray-900">生徒一覧を表示</p>
            <p className="text-sm text-gray-600 mt-1">クラスの生徒情報を確認</p>
          </a>
          <a
            href="/app/teacher/mane-management"
            className="block p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-lg transition-all duration-200 border border-green-200"
          >
            <div className="text-3xl mb-2">💸</div>
            <p className="font-semibold text-gray-900">マネを付与・回収</p>
            <p className="text-sm text-gray-600 mt-1">学習成果に応じてマネ操作</p>
          </a>
        </div>
      </div>
    </div>
  )
}
