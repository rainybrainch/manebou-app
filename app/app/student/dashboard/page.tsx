'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  PageHeader,
  Card,
  StatCard,
  LoadingSpinner,
  Alert,
  Button,
  EmptyState,
  SectionTitle,
} from '../../../components/ui'

interface DashboardData {
  fullName?: string
  schoolName?: string
  className?: string
  moneyBalance: number
  recentLogs: Array<{
    id: string
    amount: number
    reason: string
    createdAt: string
  }>
}

export default function StudentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsed = JSON.parse(userData)
    setUser(parsed)

    const fetchData = async () => {
      try {
        const res = await fetch('/api/student/dashboard')
        const result = await res.json()
        if (result.success && result.data) {
          setData({
            ...result.data,
            fullName: parsed.fullName,
            schoolName: 'サンプル小学校',
            className: '1年A組',
          })
        } else {
          setError('データの読み込みに失敗しました')
        }
      } catch (err) {
        console.error('Failed to fetch dashboard:', err)
        setError('データを取得できません')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) {
    return <LoadingSpinner fullscreen text="ダッシュボードを読み込み中..." />
  }

  if (!data || !user) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Alert variant="error" title="エラー">
          データの読み込みに失敗しました。ページをリロードしてください。
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ヘッダー */}
        <PageHeader
          icon="🎓"
          title={`こんにちは、${user.fullName}さん`}
          description={`${data.schoolName} ${data.className}`}
        />

        {error && <Alert variant="error">{error}</Alert>}

        {/* マネ残高 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon="💰"
            label="現在のマネ"
            value={data.moneyBalance.toLocaleString()}
            color="blue"
          />
          <StatCard
            icon="📈"
            label="今週の増減"
            value="+500"
            color="green"
            trend="up"
            trendValue="好調です！"
          />
        </div>

        {/* クイックアクション */}
        <Card>
          <SectionTitle icon="🚀" title="クイックアクション" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link href="/app/student/mane">
              <Button variant="primary" size="md" className="w-full">
                📜 マネ履歴を見る
              </Button>
            </Link>
            <Link href="/ranking">
              <Button variant="secondary" size="md" className="w-full">
                🏆 ランキングを確認
              </Button>
            </Link>
          </div>
        </Card>

        {/* 最近のアクティビティ */}
        <Card>
          <SectionTitle icon="📋" title="最近の取引" subtitle="過去の取引を確認できます" />

          {data.recentLogs.length === 0 ? (
            <EmptyState icon="📭" title="取引がまだありません" description="マネを獲得するとここに表示されます" />
          ) : (
            <div className="space-y-3">
              {data.recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                  <div>
                    <p className="font-medium text-gray-900">{log.reason}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(log.createdAt).toLocaleString('ja-JP', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      log.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {log.amount > 0 ? '+' : ''}{log.amount.toLocaleString()}
                  </div>
                </div>
              ))}

              <div className="text-center pt-4 border-t border-gray-200">
                <Link href="/app/student/mane" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  すべての履歴を見る →
                </Link>
              </div>
            </div>
          )}
        </Card>

        {/* 応援メッセージ */}
        <Card variant="gradient" className="bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="text-center">
            <p className="text-2xl mb-2">🌟</p>
            <p className="font-bold text-gray-900 mb-2">頑張ってます！</p>
            <p className="text-sm text-gray-600">
              先生からのマネをもらうと、ランキングが上がります。
              <br />
              引き続き頑張ってください！
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
