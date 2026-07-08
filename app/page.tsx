'use client'

import Link from 'next/link'
import { Button, Card } from './components/ui'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* ナビゲーション */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">💰 マネぼう</div>
          <div className="flex gap-4">
            <Link href="/login"><Button variant="primary" size="sm">ログイン</Button></Link>
          </div>
        </div>
      </nav>

      {/* ヒーロー */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">学生の金銭感覚を育てる仮想通貨管理アプリ</h1>
        <p className="text-xl text-gray-600 mb-8">ゲーミフィケーションで学習意欲向上・金銭教育を実現</p>
        <div className="flex gap-4 justify-center">
          <Link href="/demo"><Button variant="primary" size="lg">デモを試す</Button></Link>
          <Link href="#contact"><Button variant="secondary" size="lg">お問い合わせ</Button></Link>
        </div>
      </section>

      {/* 特徴 */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">マネぼうの特徴</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <p className="text-4xl mb-4">💰</p>
              <h3 className="text-xl font-bold mb-3">かんたん管理</h3>
              <p className="text-gray-600">先生がワンクリックでマネ操作。生徒が履歴・残高を確認</p>
            </Card>
            <Card>
              <p className="text-4xl mb-4">🏆</p>
              <h3 className="text-xl font-bold mb-3">ゲーム化</h3>
              <p className="text-gray-600">ランキング機能で競い合い、学習意欲向上</p>
            </Card>
            <Card>
              <p className="text-4xl mb-4">📱</p>
              <h3 className="text-xl font-bold mb-3">いつでもどこでも</h3>
              <p className="text-gray-600">スマートフォンでも快適に利用可能</p>
            </Card>
          </div>
        </div>
      </section>

      {/* メリット */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">導入のメリット</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">先生にとって</h3>
              <ul className="space-y-3">
                <li>✅ 学習成果を可視化・モチベーション向上</li>
                <li>✅ 5分で運用開始できる簡単操作</li>
                <li>✅ 金銭教育と学習支援を同時実現</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">保護者・生徒にとって</h3>
              <ul className="space-y-3">
                <li>✅ 子どもの学習成果が可視化される</li>
                <li>✅ ゲーム感覚で学習が楽しくなる</li>
                <li>✅ 金銭感覚と経済学習が自然に身につく</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">今すぐマネぼうを体験</h2>
          <p className="text-xl mb-8">デモアカウントで全機能を試すことができます</p>
          <Link href="/demo"><Button variant="primary" size="lg" className="bg-white text-blue-600">デモを試す</Button></Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p className="text-gray-400">&copy; 2026 マネぼう</p>
      </footer>
    </div>
  )
}
