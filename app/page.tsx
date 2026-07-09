'use client'

import Link from 'next/link'
import { Button, Card } from './components/ui'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ナビゲーション */}
      <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">💰 マネぼう</div>
          <div className="flex gap-3">
            <Link href="/demo"><Button variant="secondary" size="sm">デモ</Button></Link>
            <Link href="/login"><Button variant="primary" size="sm">ログイン</Button></Link>
          </div>
        </div>
      </nav>

      {/* ヒーロー - 全面改修 */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 lg:pt-28 pb-16 sm:pb-24 lg:pb-32">
        {/* 背景: グラデーション + パターン */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-amber-50 to-green-50">
          {/* 装飾パターン - 子どもが親しみやすいデザイン */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -left-4 top-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute right-20 -bottom-8 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* コンテンツ */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 左側: テキスト */}
            <div className="space-y-6 sm:space-y-8">
              {/* タグ */}
              <div className="inline-block">
                <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  ✨ 子ども向け金融教育ゲーム
                </span>
              </div>

              {/* メインコピー */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  遊びながら学ぶ。<br />
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    未来のお金の力。
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-lg">
                  マネぼうは、子どもがお金の使い方・貯め方・考え方を<br className="hidden sm:block" />
                  ゲーム感覚で身につける金融教育アプリです。
                </p>
              </div>

              {/* メリット箇条書き（親向け訴求） */}
              <div className="space-y-3 pt-4 border-t-2 border-amber-200">
                <p className="text-sm font-semibold text-gray-600">親・先生が選ぶ理由</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>学習意欲が自然に高まる</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>金銭感覚が実践を通じて身につく</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>先生は事務作業が 50% 削減される</span>
                  </li>
                </ul>
              </div>

              {/* CTA - 2つの導線 */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/demo" className="flex-1 sm:flex-none">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    🚀 3分で無料デモを試す
                  </Button>
                </Link>
                <Link href="#contact" className="flex-1 sm:flex-none">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  >
                    📄 先生・保護者向け資料
                  </Button>
                </Link>
              </div>

              {/* 信頼感バッジ */}
              <div className="pt-4 text-xs sm:text-sm text-gray-500">
                <p>✓ 全国 5 校で導入済み・導入検討 30+ 校</p>
              </div>
            </div>

            {/* 右側: マネぼう君 */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full h-96">
                {/* 背景装飾 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl opacity-30"></div>

                {/* 光の玉装飾 */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"></div>
                <div className="absolute bottom-20 left-10 w-16 h-16 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                {/* マネぼう君 SVG */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/images/manebou-kun-default.svg"
                    alt="マネぼう君"
                    className="w-80 h-80 animate-float drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
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
