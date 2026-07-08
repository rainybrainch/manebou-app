'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Transaction {
  id: string
  userId: string
  amount: number
  reason: string
  type: 'grant' | 'deduct'
  teacherId?: string
  timestamp: string
}

export default function StudentManePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [logs, setLogs] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsed = JSON.parse(userData)
    setUser(parsed)

    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/student/dashboard?userId=${parsed.id}`)
        const data = await res.json()
        if (data.success) {
          setLogs(data.data.logs)
        }
      } catch (err) {
        console.error('Failed to fetch logs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [router])

  if (loading) return <div className="p-4">読み込み中...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">💰 マネ履歴</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">最近のマネ取引</h2>
        {logs.length === 0 ? (
          <p className="text-gray-500">履歴はありません</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{log.reason}</p>
                  <p className="text-sm text-gray-500">{log.timestamp}</p>
                </div>
                <div className={`text-xl font-bold ${log.type === 'grant' ? 'text-green-600' : 'text-red-600'}`}>
                  {log.type === 'grant' ? '+' : '-'}{log.amount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
