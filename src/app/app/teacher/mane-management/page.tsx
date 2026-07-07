'use client'

import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Student {
  id: string
  fullName: string
  moneyBalance: number
}

interface StudentsData {
  students: Student[]
}

export default function ManeManagementPage() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const initialStudentId = searchParams.get('studentId')

  const { data: studentsData } = useSWR<StudentsData>(
    status === 'authenticated' ? '/api/teacher/students' : null,
    fetcher
  )

  const [selectedStudentId, setSelectedStudentId] = useState(
    initialStudentId || ''
  )
  const [operationType, setOperationType] = useState<'grant' | 'deduct'>('grant')
  const [amount, setAmount] = useState('100')
  const [reason, setReason] = useState('attendance')
  const [memo, setMemo] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const selectedStudent = studentsData?.students.find(
    (s) => s.id === selectedStudentId
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      const endpoint = `/api/teacher/mane/${operationType}`
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudentId,
          amount: parseInt(amount),
          reason,
          memo,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update mane')
      }

      setMessage({
        type: 'success',
        text: `${selectedStudent?.fullName} に${
          operationType === 'grant' ? amount + 'マネを付与' : amount + 'マネを減算'
        }しました。新残高: ${data.newBalance}マネ`,
      })

      // フォームをリセット
      setAmount('100')
      setReason('attendance')
      setMemo('')

      // Refetch students data
      if (studentsData) {
        const updated = studentsData.students.map((s) =>
          s.id === selectedStudentId
            ? { ...s, moneyBalance: data.newBalance }
            : s
        )
        // Note: This won't actually update the SWR cache,
        // but the next fetch will get the updated data
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'エラーが発生しました',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* タイトル */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">💸 マネ管理</h1>
        <p className="text-gray-600 mt-2">
          生徒にマネを付与または減算します
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* メッセージ */}
        {message && (
          <div
            className={`rounded-md p-4 ${
              message.type === 'success'
                ? 'bg-green-50'
                : 'bg-red-50'
            }`}
          >
            <p
              className={`text-sm font-medium ${
                message.type === 'success'
                  ? 'text-green-800'
                  : 'text-red-800'
              }`}
            >
              {message.text}
            </p>
          </div>
        )}

        {/* 生徒選択 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            生徒を選択
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">選択してください...</option>
            {studentsData?.students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.fullName} (現在: {student.moneyBalance}マネ)
              </option>
            ))}
          </select>
        </div>

        {/* 現在のマネ残高 */}
        {selectedStudent && (
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">
              {selectedStudent.fullName} の現在のマネ
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {selectedStudent.moneyBalance.toLocaleString()}
            </p>
          </div>
        )}

        {/* 操作タイプ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            操作タイプ
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="grant"
                checked={operationType === 'grant'}
                onChange={(e) =>
                  setOperationType(e.target.value as 'grant' | 'deduct')
                }
                className="mr-2"
              />
              <span className="text-gray-700">✅ 付与する</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="deduct"
                checked={operationType === 'deduct'}
                onChange={(e) =>
                  setOperationType(e.target.value as 'grant' | 'deduct')
                }
                className="mr-2"
              />
              <span className="text-gray-700">❌ 減算する</span>
            </label>
          </div>
        </div>

        {/* マネ額 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            マネ額
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2 mt-2">
            {[50, 100, 200, 500].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val.toString())}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* 理由 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            理由
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="attendance">授業参加</option>
            <option value="homework">宿題提出</option>
            <option value="quiz">クイズ正解</option>
            <option value="behavior">良い行動</option>
            <option value="other">その他</option>
          </select>
        </div>

        {/* メモ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            メモ（任意）
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="例: 積極的な発表"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 確認文 */}
        {selectedStudent && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>確認:</strong> {selectedStudent.fullName} に
              <strong>
                {operationType === 'grant' ? '+' : '-'}{amount}マネ
              </strong>
              を{operationType === 'grant' ? '付与' : '減算'}します。
            </p>
          </div>
        )}

        {/* ボタン */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setSelectedStudentId('')
              setAmount('100')
              setReason('attendance')
              setMemo('')
              setMessage(null)
            }}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={loading || !selectedStudentId}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '処理中...' : '実行'}
          </button>
        </div>
      </form>
    </div>
  )
}
