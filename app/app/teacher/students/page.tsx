'use client'

import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Student {
  id: string
  fullName: string
  email: string
  moneyBalance: number
}

interface StudentsData {
  students: Student[]
  total: number
}

export default function StudentsPage() {
  const { data: session, status } = useSession()
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, error } = useSWR<StudentsData>(
    status === 'authenticated' ? '/api/teacher/students' : null,
    fetcher
  )

  const filteredStudents = data?.students.filter((student) =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm font-medium text-red-800">
          データの読み込みに失敗しました
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* タイトル */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">👥 生徒一覧</h1>
        <p className="text-gray-600 mt-2">
          合計 {data.total} 人の生徒
        </p>
      </div>

      {/* 検索バー */}
      <div>
        <input
          type="text"
          placeholder="名前またはメールアドレスで検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 生徒リスト */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">生徒が見つかりません</p>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* 名前 */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    👤 {student.fullName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {student.email}
                  </p>
                </div>

                {/* マネ残高 */}
                <div className="bg-blue-50 rounded p-3">
                  <p className="text-xs text-blue-600 font-medium">
                    💰 マネ残高
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {student.moneyBalance.toLocaleString()}
                  </p>
                </div>

                {/* アクションボタン */}
                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/app/teacher/students/${student.id}`}
                    className="flex-1 py-2 px-3 bg-gray-100 text-gray-900 rounded hover:bg-gray-200 text-sm font-medium text-center"
                  >
                    詳細
                  </Link>
                  <Link
                    href={`/app/teacher/mane-management?studentId=${student.id}`}
                    className="flex-1 py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium text-center"
                  >
                    マネ管理
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
