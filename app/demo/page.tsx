'use client'

import Link from 'next/link'
import { Button, Card } from '../components/ui'

export default function DemoPage() {
  const demoAccounts = [
    {
      icon: '🎓',
      name: '学生用',
      email: 'student1@school.jp',
      balance: '1,000マネ',
      desc: 'ダッシュボード・マネ履歴・ランキングを体験'
    },
    {
      icon: '👨‍🏫',
      name: '先生用',
      email: 'teacher@school.jp',
      balance: '5,000マネ',
      desc: '生徒管理・マネ付与・ランキング確認を体験'
    },
    {
      icon: '🔐',
      name: '管理者用',
      email: 'admin@school.jp',
      balance: '10,000マネ',
      desc: '全機能にアクセス可能'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ナビゲーション */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">💰 マネぼう</Link>
          <Link href="/login"><Button variant="primary" size="sm">ログイン</Button></Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">マネぼうをデモで体験</h1>
        <p className="text-xl text-gray-600 mb-12">パスワード不要。以下のアカウントを選んですぐに全機能を試せます。</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoAccounts.map((account) => (
            <Card key={account.email}>
              <div className="text-5xl mb-4">{account.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{account.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{account.desc}</p>

              <div className="bg-blue-50 rounded p-4 mb-6">
                <p className="text-xs text-gray-600 mb-2">メールアドレス</p>
                <p className="font-mono text-sm">{account.email}</p>
              </div>

              <p className="text-sm text-gray-600 mb-4">初期残高: <strong>{account.balance}</strong></p>

              <Link href="/login">
                <Button variant="primary" className="w-full">
                  このアカウントでログイン
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* 操作ガイド */}
        <div className="mt-16 bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-8">デモの使い方</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-3xl mb-2">1️⃣</p>
              <h3 className="font-bold mb-2">アカウントを選ぶ</h3>
              <p className="text-gray-600">学生・先生・管理者の中から選びます</p>
            </div>
            <div>
              <p className="text-3xl mb-2">2️⃣</p>
              <h3 className="font-bold mb-2">ログインする</h3>
              <p className="text-gray-600">メールアドレスを入力してログイン（パスワード不要）</p>
            </div>
            <div>
              <p className="text-3xl mb-2">3️⃣</p>
              <h3 className="font-bold mb-2">全機能を試す</h3>
              <p className="text-gray-600">マネぼうのすべての機能を操作できます</p>
            </div>
          </div>
        </div>

        {/* 学生向けガイド */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">🎓 学生として試すこと</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>ダッシュボード</strong> – 現在のマネ残高を確認</li>
            <li>• <strong>マネ履歴</strong> – 過去のすべての取引を確認</li>
            <li>• <strong>ランキング</strong> – 学校全体のランキングを確認</li>
          </ul>
        </div>

        {/* 先生向けガイド */}
        <div className="mt-8 bg-green-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">👨‍🏫 先生として試すこと</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>生徒一覧</strong> – クラスの全生徒を確認</li>
            <li>• <strong>マネ付与</strong> – 生徒にマネを付与してみる</li>
            <li>• <strong>マネ回収</strong> – 生徒からマネを回収してみる</li>
            <li>• <strong>ランキング</strong> – 変更が即座に反映されるか確認</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">デモについてのよくある質問</h2>

          <div className="space-y-4">
            <Card>
              <h4 className="font-bold mb-2">Q: パスワードはなんですか？</h4>
              <p className="text-gray-600">デモ環境ではパスワード入力は不要です。メールアドレスだけでログインできます。</p>
            </Card>

            <Card>
              <h4 className="font-bold mb-2">Q: デモデータは他の人と共有されていますか？</h4>
              <p className="text-gray-600">はい。すべてのデモユーザーが同じデータを共有しています。そのため、マネ付与の履歴が表示されます。</p>
            </Card>

            <Card>
              <h4 className="font-bold mb-2">Q: どのくらい試すことができますか？</h4>
              <p className="text-gray-600">デモアカウントには時間制限がありません。何度でも試すことができます。</p>
            </Card>

            <Card>
              <h4 className="font-bold mb-2">Q: 本番環境へはどうログインしますか？</h4>
              <p className="text-gray-600">学校から発行される専用のメールアドレス・パスワードでログインします。お問い合わせください。</p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">学校への導入をご検討中ですか？</h2>
          <p className="mb-8">マネぼうについてのご不明な点は、お気軽にお問い合わせください。</p>
          <Link href="/contact"><Button variant="primary" size="lg" className="bg-white text-blue-600">お問い合わせ</Button></Link>
        </div>
      </div>
    </div>
  )
}
