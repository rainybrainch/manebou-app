'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TeacherDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)

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
      }
    }

    fetchStats()
  }, [router])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">🏠 ダッシュボード</h1>
        <p className="text-gray-600">{user?.fullName} さん、こんにちは</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">学校</p>
          <p className="text-2xl font-bold">{stats?.schoolName || '-'}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">生徒数</p>
          <p className="text-2xl font-bold">{stats?.studentCount || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">クラス数</p>
          <p className="text-2xl font-bold">{stats?.classCount || 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">クイックアクション</h2>
        <div className="space-y-2">
          <a href="/app/teacher/students" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
            👥 生徒一覧を表示
          </a>
          <a href="/app/teacher/mane-management" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100">
            💸 マネを付与・回収
          </a>
        </div>
      </div>
    </div>
  )
}
