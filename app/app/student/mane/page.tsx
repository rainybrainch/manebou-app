'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  PageHeader,
  Card,
  SectionTitle,
  LoadingSpinner,
  EmptyState,
  StatCard,
  Badge,
  Button,
  Table,
} from '../../../components/ui'

interface Transaction {
  id: string
  userId: string
  amount: number
  reason: string
  type: 'grant' | 'deduct'
  teacherId?: string
  timestamp: string
}

interface ManeStats {
  balance: number
  totalGrants: number
  totalDeducts: number
  todayChange: number
}

export default function StudentManePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [logs, setLogs] = useState<Transaction[]>([])
  const [stats, setStats] = useState<ManeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')

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
        const res = await fetch(`/api/student/dashboard?userId=${parsed.id}`)
        const data = await res.json()
        if (data.success) {
          const allLogs = data.data.logs || []
          setLogs(allLogs)

          // 統計計算
          const totalGrants = allLogs
            .filter((log: Transaction) => log.type === 'grant')
            .reduce((sum: number, log: Transaction) => sum + log.amount, 0)
          const totalDeducts = allLogs
            .filter((log: Transaction) => log.type === 'deduct')
            .reduce((sum: number, log: Transaction) => sum + log.amount, 0)

          const today = new Date().toISOString().split('T')[0]
          const todayLogs = allLogs.filter(
            (log: Transaction) => log.timestamp.split('T')[0] === today
          )
          const todayChange = todayLogs.reduce(
            (sum: number, log: Transaction) =>
              sum + (log.type === 'grant' ? log.amount : -log.amount),
            0
          )

          setStats({
            balance: parsed.moneyBalance || 0,
            totalGrants,
            totalDeducts,
            todayChange,
          })
        }
      } catch (err) {
        console.error('Failed to fetch logs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const sortedLogs = [...logs].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    }
    return Math.abs(b.amount) - Math.abs(a.amount)
  })

  if (loading) {
    return <LoadingSpinner fullscreen text="マネ履歴を読み込み中..." />
  }

  const tableColumns = [
    { header: '日時', key: 'timestamp' },
    { header: '理由', key: 'reason' },
    { header: '金額', key: 'amount' },
    { header: 'ステータス', key: 'type' },
  ]

  const tableData = sortedLogs.map((log) => ({
    timestamp: new Date(log.timestamp).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    reason: log.reason,
    amount: (
      <div className={`font-bold ${log.type === 'grant' ? 'text-green-600' : 'text-red-600'}`}>
        {log.type === 'grant' ? '+' : '-'}{log.amount.toLocaleString()}
      </div>
    ),
    type: (
      <Badge variant={log.type === 'grant' ? 'success' : 'danger'}>
        {log.type === 'grant' ? '✅ 獲得' : '❌ 減算'}
      </Badge>
    ),
  }))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ヘッダー */}
        <PageHeader icon="📜" title="マネ履歴" description="取引履歴をいつでも確認できます" />

        {/* 統計情報 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              icon="💰"
              label="現在残高"
              value={stats.balance.toLocaleString()}
              color="blue"
            />
            <StatCard
              icon="📈"
              label="今日の増減"
              value={stats.todayChange > 0 ? `+${stats.todayChange}` : stats.todayChange.toString()}
              color={stats.todayChange > 0 ? 'green' : 'orange'}
              trend={stats.todayChange > 0 ? 'up' : 'down'}
            />
            <StatCard
              icon="✅"
              label="総獲得マネ"
              value={stats.totalGrants.toLocaleString()}
              color="green"
            />
            <StatCard
              icon="❌"
              label="総減算マネ"
              value={stats.totalDeducts.toLocaleString()}
              color="orange"
            />
          </div>
        )}

        {/* 取引履歴テーブル */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <SectionTitle icon="📋" title="取引履歴" subtitle={`全 ${logs.length} 件`} />
            <div className="mt-4 sm:mt-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">日時順</option>
                <option value="amount">金額順</option>
              </select>
            </div>
          </div>

          {logs.length === 0 ? (
            <EmptyState
              icon="📭"
              title="取引がまだありません"
              description="先生からマネをもらうとここに表示されます"
            />
          ) : (
            <Table columns={tableColumns} data={tableData} />
          )}
        </Card>

        {/* 応援カード */}
        {logs.length > 0 && (
          <Card variant="gradient" className="bg-gradient-to-r from-purple-50 to-pink-50">
            <SectionTitle icon="🌟" title="頑張ってます！" />
            <p className="text-sm text-gray-600 mt-2">
              マネ履歴から成長が見えます。引き続き頑張ってください！
            </p>
          </Card>
        )}

        {/* クイックアクション */}
        <Card>
          <SectionTitle icon="🚀" title="その他" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <Link href="/app/student/dashboard">
              <Button variant="secondary" size="md" className="w-full">
                ← ダッシュボードに戻る
              </Button>
            </Link>
            <Link href="/ranking">
              <Button variant="primary" size="md" className="w-full">
                🏆 ランキングを確認
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
