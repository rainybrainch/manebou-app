'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  PageHeader,
  Card,
  SectionTitle,
  LoadingSpinner,
  Input,
  Button,
  Alert,
  StatCard,
} from '../../../components/ui'

interface Student {
  id: string
  fullName: string
  moneyBalance: number
}

export default function ManeManagementPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialStudentId = searchParams.get('studentId')

  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudentId || '')
  const [operationType, setOperationType] = useState<'grant' | 'deduct'>('grant')
  const [amount, setAmount] = useState('100')
  const [reason, setReason] = useState('attendance')
  const [memo, setMemo] = useState('')
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsed = JSON.parse(userData)
    if (parsed.role !== 'teacher' && parsed.role !== 'admin') {
      router.push('/app/student/dashboard')
      return
    }
    setUser(parsed)

    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/teachers')
        const data = await res.json()
        if (data.success) {
          const allStudents = data.data.filter((u: any) => u.role === 'student')
          setStudents(allStudents)
        }
      } catch (err) {
        console.error('Failed to fetch students:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [router])

  const selectedStudent = students.find((s) => s.id === selectedStudentId)

  const handleAmountQuickSet = (val: number) => {
    setAmount(val.toString())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStudent) return

    setIsSubmitting(true)
    setMessage(null)

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
        text: `${selectedStudent.fullName} に${
          operationType === 'grant' ? amount + 'マネを付与' : amount + 'マネを減算'
        }しました。新残高: ${data.newBalance}マネ`,
      })

      // 生徒情報を更新
      setStudents((prev) =>
        prev.map((s) =>
          s.id === selectedStudentId
            ? { ...s, moneyBalance: data.newBalance }
            : s
        )
      )

      // フォームをリセット
      setAmount('100')
      setReason('attendance')
      setMemo('')
      setShowConfirmation(false)

      // 3秒後にメッセージを消す
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'エラーが発生しました',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setSelectedStudentId('')
    setAmount('100')
    setReason('attendance')
    setMemo('')
    setMessage(null)
    setShowConfirmation(false)
  }

  if (loading) {
    return <LoadingSpinner fullscreen text="マネ管理画面を読み込み中..." />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ヘッダー */}
        <PageHeader
          icon="💸"
          title="マネ付与・回収管理"
          description="生徒のマネを付与または減算します"
        />

        {/* メッセージ表示 */}
        {message && <Alert variant={message.type}>{message.text}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 生徒選択 */}
          <Card>
            <SectionTitle icon="👤" title="生徒選択" subtitle="操作対象の生徒を選択" />
            <div className="mt-4">
              <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-2">
                生徒
              </label>
              <select
                id="student-select"
                value={selectedStudentId}
                onChange={(e) => {
                  setSelectedStudentId(e.target.value)
                  setShowConfirmation(false)
                  setMessage(null)
                }}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">選択してください...</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.fullName} (現在: {student.moneyBalance}マネ)
                  </option>
                ))}
              </select>
              {students.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">登録されている生徒がいません</p>
              )}
            </div>
          </Card>

          {/* 現在残高表示 */}
          {selectedStudent && (
            <StatCard
              icon="💰"
              label={`${selectedStudent.fullName} の現在のマネ`}
              value={selectedStudent.moneyBalance.toLocaleString()}
              color="blue"
            />
          )}

          {/* 操作タイプ */}
          {selectedStudent && (
            <Card>
              <SectionTitle icon="🔄" title="操作タイプ" subtitle="付与または減算を選択" />
              <div className="mt-4 space-y-3">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="radio"
                    name="operation"
                    value="grant"
                    checked={operationType === 'grant'}
                    onChange={(e) => setOperationType(e.target.value as 'grant' | 'deduct')}
                    className="w-4 h-4 mr-3"
                    aria-label="マネを付与"
                  />
                  <div>
                    <p className="font-medium text-gray-900">✅ 付与する</p>
                    <p className="text-xs text-gray-600">マネを追加します</p>
                  </div>
                </label>

                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-red-400 hover:bg-red-50 transition">
                  <input
                    type="radio"
                    name="operation"
                    value="deduct"
                    checked={operationType === 'deduct'}
                    onChange={(e) => setOperationType(e.target.value as 'grant' | 'deduct')}
                    className="w-4 h-4 mr-3"
                    aria-label="マネを減算"
                  />
                  <div>
                    <p className="font-medium text-gray-900">❌ 減算する</p>
                    <p className="text-xs text-gray-600">マネを減らします</p>
                  </div>
                </label>
              </div>
            </Card>
          )}

          {/* マネ額 */}
          {selectedStudent && (
            <Card>
              <SectionTitle icon="💵" title="マネ額" subtitle="付与・減算する金額を入力" />
              <div className="mt-4 space-y-4">
                <Input
                  label="金額"
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  max="10000"
                  required
                  icon="💰"
                  placeholder="100"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    クイック設定
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[50, 100, 200, 500].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleAmountQuickSet(val)}
                        className={`px-3 py-2 rounded text-sm font-medium transition ${
                          amount === val.toString()
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 理由 */}
          {selectedStudent && (
            <Card>
              <SectionTitle icon="📝" title="理由" subtitle="マネの理由を選択" />
              <div className="mt-4">
                <label htmlFor="reason-select" className="block text-sm font-medium text-gray-700 mb-2">
                  理由
                </label>
                <select
                  id="reason-select"
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
            </Card>
          )}

          {/* メモ（任意） */}
          {selectedStudent && (
            <Card>
              <SectionTitle icon="📌" title="メモ（任意）" subtitle="詳細を記載" />
              <div className="mt-4">
                <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-2">
                  コメント
                </label>
                <textarea
                  id="memo"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="例: 積極的な発表をしていました"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </Card>
          )}

          {/* 確認 */}
          {selectedStudent && (
            <Card
              variant="gradient"
              className={`bg-gradient-to-r ${
                operationType === 'grant'
                  ? 'from-green-50 to-green-100'
                  : 'from-orange-50 to-orange-100'
              }`}
            >
              <SectionTitle icon="⚠️" title="実行内容確認" />
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <strong>生徒:</strong> {selectedStudent.fullName}
                </p>
                <p>
                  <strong>操作:</strong>{' '}
                  {operationType === 'grant'
                    ? `✅ ${amount}マネ を付与`
                    : `❌ ${amount}マネ を減算`}
                </p>
                <p>
                  <strong>理由:</strong> {reason}
                </p>
                <p className="pt-2 border-t">
                  <strong>実行後残高:</strong>{' '}
                  <span
                    className={`font-bold ${
                      operationType === 'grant' ? 'text-green-600' : 'text-orange-600'
                    }`}
                  >
                    {(
                      selectedStudent.moneyBalance +
                      (operationType === 'grant' ? parseInt(amount) : -parseInt(amount))
                    ).toLocaleString()}
                    マネ
                  </span>
                </p>
              </div>
            </Card>
          )}

          {/* ボタン */}
          {selectedStudent && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleReset}
                disabled={isSubmitting}
                className="flex-1"
              >
                リセット
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting || !selectedStudentId}
                loading={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? '処理中...' : '実行'}
              </Button>
            </div>
          )}
        </form>

        {/* クイックナビゲーション */}
        <Card>
          <SectionTitle icon="🚀" title="クイックナビゲーション" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <Link href="/app/teacher/dashboard">
              <Button variant="secondary" size="md" className="w-full">
                ← ダッシュボードに戻る
              </Button>
            </Link>
            <Link href="/app/teacher/students">
              <Button variant="secondary" size="md" className="w-full">
                👥 生徒一覧に戻る
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
