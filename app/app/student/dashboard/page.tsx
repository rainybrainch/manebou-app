'use client'

import { auth } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface DashboardData {
  moneyBalance: number
  recentLogs: Array<{
    id: string
    amount: number
    reason: string
    createdAt: string
  }>
}

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const { data, isLoading, error } = useSWR<DashboardData>(
    status === 'authenticated' ? '/api/student/dashboard' : null,
    fetcher
  )

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6 max-w-md mx-auto">
        <div className="flex items-start">
          <div className="text-red-600 text-xl mr-3">⚠️</div>
          <div>
            <p className="font-semibold text-red-900">
              エラー
            </p>
            <p className="text-sm text-red-700 mt-1">
              データの読み込みに失敗しました。ページをリロードしてください。
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* ウェルカムセクション */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900">
          こんにちは、👋
        </h1>
        <p className="text-gray-600 mt-2">
          {session?.user?.email}
        </p>
      </div>

      {/* マネ残高 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
        <p className="text-sm font-medium opacity-90">💰 現在のマネ</p>
        <h2 className="text-4xl font-bold mt-2">
          {data.moneyBalance.toLocaleString()}
        </h2>
        <p className="text-sm mt-2 opacity-75">マネ</p>
      </div>

      {/* 最近のアクティビティ */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">
            📜 最近のアクティビティ
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {data.recentLogs.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              アクティビティはまだありません
            </div>
          ) : (
            data.recentLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {log.reason}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(log.createdAt).toLocaleString('ja-JP')}
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
              </div>
            ))
          )}
        </div>
        {data.recentLogs.length > 0 && (
          <div className="p-4 bg-gray-50 text-center border-t border-gray-200">
            <Link
              href="/app/student/mane"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              すべての履歴を見る →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
