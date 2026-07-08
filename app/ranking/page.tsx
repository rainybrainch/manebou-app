'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface User {
  id: string
  fullName: string
  moneyBalance: number
  role: string
}

export default function RankingPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

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
        }
      } catch (err) {
        console.error('Failed to fetch ranking:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div className="p-4">読み込み中...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">🏆 マネランキング</h1>
        <p className="text-center text-gray-600 mb-8">学生・先生のマネ保有量ランキング</p>

        {users.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">ランキングデータがありません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user, idx) => (
              <div
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  idx === 0
                    ? 'bg-yellow-100 border-2 border-yellow-400'
                    : idx === 1
                    ? 'bg-gray-100 border-2 border-gray-400'
                    : idx === 2
                    ? 'bg-orange-100 border-2 border-orange-400'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold w-12 text-center">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`}
                  </div>
                  <div>
                    <p className="font-semibold">{user.fullName}</p>
                    <p className="text-sm text-gray-600">{user.role === 'student' ? '生徒' : '先生'}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">{user.moneyBalance}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/app/student/dashboard" className="text-blue-600 hover:text-blue-500">
            ← 戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
