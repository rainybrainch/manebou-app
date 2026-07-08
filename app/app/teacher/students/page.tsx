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
  Input,
  Badge,
  Button,
  Table,
  Alert,
} from '../../../components/ui'

interface Student {
  id: string
  fullName: string
  email: string
  moneyBalance: number
}

export default function StudentsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

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
        } else {
          setError('生徒データの読み込みに失敗しました')
        }
      } catch (err) {
        console.error('Failed to fetch students:', err)
        setError('データを取得できません')
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [router])

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner fullscreen text="生徒一覧を読み込み中..." />
  }

  const tableColumns = [
    { header: '名前', key: 'fullName' },
    { header: 'メール', key: 'email' },
    { header: 'マネ残高', key: 'moneyBalance' },
    { header: 'アクション', key: 'actions' },
  ]

  const tableData = filteredStudents.map((student) => ({
    fullName: (
      <div className="flex items-center gap-2">
        <span className="text-lg">👤</span>
        <span className="font-medium text-gray-900">{student.fullName}</span>
      </div>
    ),
    email: <span className="text-sm text-gray-600">{student.email}</span>,
    moneyBalance: (
      <div className="font-bold text-blue-600">{student.moneyBalance.toLocaleString()}</div>
    ),
    actions: (
      <div className="flex gap-2">
        <Link href={`/app/teacher/mane-management?studentId=${student.id}`}>
          <Button variant="primary" size="sm">
            💸 マネ管理
          </Button>
        </Link>
      </div>
    ),
  }))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ヘッダー */}
        <PageHeader
          icon="👥"
          title="生徒一覧"
          description={`全 ${students.length} 人の生徒を管理`}
        />

        {error && <Alert variant="error">{error}</Alert>}

        {/* 検索バー */}
        <Card>
          <SectionTitle icon="🔍" title="検索" subtitle="生徒を検索してマネを管理" />
          <div className="mt-4">
            <Input
              label="名前またはメールアドレス"
              type="text"
              placeholder="例: 田中花子 または student@school.jp"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon="🔍"
            />
          </div>
        </Card>

        {/* 生徒テーブル */}
        <Card>
          <div className="mb-6">
            <SectionTitle
              icon="📊"
              title="生徒リスト"
              subtitle={`検索結果: ${filteredStudents.length} 人`}
            />
          </div>

          {filteredStudents.length === 0 ? (
            <EmptyState
              icon="👤"
              title={searchQuery ? '検索結果がありません' : '生徒がまだ登録されていません'}
              description={
                searchQuery
                  ? '別のキーワードで検索してください'
                  : '生徒が追加されるまでお待ちください'
              }
            />
          ) : (
            <Table columns={tableColumns} data={tableData} />
          )}
        </Card>

        {/* 統計情報 */}
        {students.length > 0 && (
          <Card variant="gradient" className="bg-gradient-to-r from-blue-50 to-green-50">
            <SectionTitle icon="📈" title="統計情報" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <p className="text-gray-600">生徒数</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{students.length}</p>
              </div>
              <div>
                <p className="text-gray-600">平均マネ残高</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {Math.round(
                    students.reduce((sum, s) => sum + s.moneyBalance, 0) / students.length
                  ).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">総マネ保有量</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {students.reduce((sum, s) => sum + s.moneyBalance, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* クイックアクション */}
        <Card>
          <SectionTitle icon="🚀" title="クイックアクション" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <Link href="/app/teacher/dashboard">
              <Button variant="secondary" size="md" className="w-full">
                ← ダッシュボードに戻る
              </Button>
            </Link>
            <Link href="/app/teacher/mane-management">
              <Button variant="primary" size="md" className="w-full">
                💸 マネ付与・回収
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
