'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  PageHeader,
  StatCard,
  Card,
  LoadingSpinner,
  SectionTitle,
  Button,
} from '../../../components/ui'

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
    return <LoadingSpinner fullscreen text="ダッシュボードを読み込み中..." />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ヘッダー */}
        <PageHeader
          icon="👨‍🏫"
          title={`こんにちは、${user?.fullName}さん`}
          description="クラス管理とマネ配布を一元管理できます"
        />

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon="🏫"
            label="学校"
            value={stats?.schoolName || '-'}
            color="blue"
          />
          <StatCard
            icon="👥"
            label="生徒数"
            value={stats?.studentCount || 0}
            color="green"
          />
          <StatCard
            icon="📚"
            label="クラス数"
            value={stats?.classCount || 0}
            color="purple"
          />
        </div>

        {/* 本日・今週の配布情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon="📈"
            label="今日配布したマネ"
            value="1,500"
            color="blue"
            trend="up"
            trendValue="目標: 2,000"
          />
          <StatCard
            icon="📊"
            label="今週配布量"
            value="8,500"
            color="green"
            trend="up"
            trendValue="先週比 +1,200"
          />
        </div>

        {/* クイックアクション */}
        <Card>
          <SectionTitle icon="🚀" title="クイックアクション" subtitle="生徒管理とマネ操作" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/app/teacher/students">
              <div className="block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition-all duration-200 border border-blue-200 cursor-pointer">
                <div className="text-3xl mb-2">👥</div>
                <p className="font-semibold text-gray-900">生徒一覧</p>
                <p className="text-sm text-gray-600 mt-1">クラスの生徒情報を確認</p>
              </div>
            </Link>
            <Link href="/app/teacher/mane-management">
              <div className="block p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-lg transition-all duration-200 border border-green-200 cursor-pointer">
                <div className="text-3xl mb-2">💸</div>
                <p className="font-semibold text-gray-900">マネ付与・回収</p>
                <p className="text-sm text-gray-600 mt-1">学習成果に応じてマネ操作</p>
              </div>
            </Link>
          </div>
        </Card>

        {/* ガイド */}
        <Card variant="gradient" className="bg-gradient-to-r from-blue-50 to-purple-50">
          <SectionTitle icon="💡" title="ヒント" subtitle="より効果的に生徒を指導するために" />
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ テスト後に高得点の生徒にマネを付与すると、競争意識が高まります</li>
            <li>✅ 毎日マネを付与することで、習慣的な学習支援ができます</li>
            <li>✅ ランキングを見て、生徒のモチベーション状況を把握しましょう</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
