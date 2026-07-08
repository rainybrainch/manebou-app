'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  PageHeader,
  Card,
  Badge,
  LoadingSpinner,
  EmptyState,
  Button,
} from '../components/ui'

interface User {
  id: string
  fullName: string
  moneyBalance: number
  role: string
}

export default function RankingPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/teachers')
        const data = await res.json()
        if (data.success) {
          const sorted = data.data
            .filter((u: User) => u.role === 'student' || u.role === 'teacher')
            .sort((a: User, b: User) => b.moneyBalance - a.moneyBalance)
          setUsers(sorted)
        } else {
          setError('ランキングの読み込みに失敗しました')
        }
      } catch (err) {
        console.error('Failed to fetch ranking:', err)
        setError('データを取得できません')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner fullscreen text="ランキングを読み込み中..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <PageHeader icon="🏆" title="マネランキング" description="学生・先生のマネ保有量ランキング" />

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            ❌ {error}
          </div>
        )}

        {users.length === 0 ? (
          <Card>
            <EmptyState icon="📭" title="ランキングデータがありません" description="まだマネを保有しているユーザーがいません" />
          </Card>
        ) : (
          <div className="space-y-4">
            {/* TOP 3 カード表示 */}
            {users.slice(0, 3).map((user, idx) => {
              const medals = ['🥇', '🥈', '🥉']
              const colors = ['from-yellow-50 to-yellow-100', 'from-gray-50 to-gray-100', 'from-orange-50 to-orange-100']

              return (
                <Card
                  key={user.id}
                  variant="gradient"
                  className={`bg-gradient-to-r ${colors[idx]} hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{medals[idx]}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{user.fullName}</h3>
                        <Badge variant={user.role === 'student' ? 'info' : 'warning'}>
                          {user.role === 'student' ? '🎓 生徒' : '👨‍🏫 先生'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-green-600">{user.moneyBalance.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 mt-1">マネ</p>
                    </div>
                  </div>
                </Card>
              )
            })}

            {/* 4位以降のリスト */}
            {users.length > 3 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">4位以下</h2>
                <div className="space-y-2">
                  {users.slice(3).map((user, idx) => (
                    <Card key={user.id} padding="sm" className="hover:bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-bold text-gray-500 w-8 text-center">{idx + 4}</div>
                          <div>
                            <p className="font-medium text-gray-900">{user.fullName}</p>
                            <Badge variant={user.role === 'student' ? 'info' : 'warning'}>
                              {user.role === 'student' ? '生徒' : '先生'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-green-600">{user.moneyBalance.toLocaleString()}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 戻るボタン */}
        <div className="mt-8 text-center">
          <Link href="/app/student/dashboard">
            <Button variant="secondary" size="md">
              ← 戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
