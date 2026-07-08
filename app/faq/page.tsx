'use client'

import Link from 'next/link'
import { Button, Card } from '../components/ui'
import { useState } from 'react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { category: '保護者向け', q: 'マネぼうとは何ですか？', a: '生徒がマネ（仮想通貨）を管理し、金銭感覚と経済学習を身につけるアプリです。先生が学習成果に応じてマネを付与・回収します。' },
    { category: '保護者向け', q: '子どもの個人情報は安全ですか？', a: 'はい。暗号化通信・セキュアなデータベース・定期的なセキュリティテストで保護しています。' },
    { category: '保護者向け', q: 'マネは実際の金銭に変わりますか？', a: 'いいえ。マネはあくまで教育用の仮想通貨です。実際の金銭に変換されることはありません。' },
    { category: '保護者向け', q: '子どもの学習成果は確認できますか？', a: 'デモ版ではログイン状況のみ確認可能です。本番版では詳細なレポート機能を予定しています。' },
    { category: '先生向け', q: 'セットアップには何が必要ですか？', a: 'インターネット環境があれば十分です。セットアップサポートは無料で行います。' },
    { category: '先生向け', q: '複数クラスに対応していますか？', a: 'v1.0 は 1 クラス単位です。複数クラス対応は v1.1.0 以降で予定しています。' },
    { category: '先生向け', q: '生徒数に制限はありますか？', a: 'いいえ。制限はありません。何人でも使用できます。' },
    { category: '先生向け', q: 'スマートフォンでも操作できますか？', a: 'はい。iOS・Android・PC すべてで快適に利用できます。' },
    { category: '生徒向け', q: 'ランキングはどう決まりますか？', a: 'マネの保有額が多い順にランキングが決まります。毎日更新されます。' },
    { category: '生徒向け', q: 'マネはどうやったら増えますか？', a: '先生が学習成果や良い行動に対してマネを付与します。授業参加・宿題提出・クイズ正解などがマネ付与の対象になります。' },
    { category: 'その他', q: '料金はいくらですか？', a: 'v1.0 はベータ版として無料です。本運用時の料金については、お問い合わせください。' },
    { category: 'その他', q: '導入にはどのくらいの期間がかかりますか？', a: 'セットアップから利用開始まで約 1 時間です。データ移行等がある場合は相談させていただきます。' }
  ]

  const categories = ['保護者向け', '先生向け', '生徒向け', 'その他']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ナビゲーション */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">💰 マネぼう</Link>
          <Link href="/login"><Button variant="primary" size="sm">ログイン</Button></Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">よくある質問</h1>
        <p className="text-gray-600 mb-12">マネぼうについてよくいただく質問をまとめました。</p>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category}</h2>
            <div className="space-y-3">
              {faqs.filter(faq => faq.category === category).map((faq, idx) => (
                <Card
                  key={idx}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-lg">Q: {faq.q}</h3>
                    <span className="text-2xl">{openIndex === idx ? '−' : '+'}</span>
                  </div>
                  {openIndex === idx && <p className="text-gray-600 mt-4">A: {faq.a}</p>}
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">ご不明な点はお気軽に</h2>
          <p className="text-gray-600 mb-6">上記に記載されていない質問がある場合は、お問い合わせください。</p>
          <Link href="/contact"><Button variant="primary" size="lg">お問い合わせフォーム</Button></Link>
        </div>
      </div>
    </div>
  )
}
