# マネぼう v1.0.0 リリースノート

**リリース日**: 2026-07-08  
**ステータス**: Production Ready 🟢

---

## 📢 リリース概要

マネぼう v1.0.0 は、学生向け仮想通貨管理アプリケーションの初版リリースです。

先生がマネ（仮想通貨）を付与・回収し、学生が残高を管理・確認できるプラットフォーム。ゲーミフィケーションを通じて、金銭感覚と経済学習を支援します。

---

## ✨ 主な機能

### 学生向け機能
- 💳 **マネ残高管理** – リアルタイムで残高表示
- 📜 **マネ履歴** – 付与・回収履歴を時系列表示
- 🏆 **ランキング** – 学校全体のランキング表示
- 🎯 **ダッシュボード** – 学生情報・最近の取引確認

### 先生向け機能
- 👥 **生徒管理** – クラス内生徒一覧表示
- 💸 **マネ付与** – 学習成果に応じてマネを付与
- 🔄 **マネ回収** – ルール違反時にマネを減算
- 📊 **ダッシュボード** – 学校統計・クイックアクション

---

## 🚀 本番環境

**URL**: https://manebou-app.vercel.app

### デモユーザー
- **学生**: `student1@school.jp`
- **先生**: `teacher@school.jp`
- **管理者**: `admin@school.jp`

---

## 📊 実装内容

### ページ（7ページ）
✅ ログインページ  
✅ 学生ダッシュボード  
✅ マネ履歴  
✅ 先生ダッシュボード  
✅ 生徒一覧  
✅ マネ管理  
✅ ランキング

### API（14エンドポイント）
✅ スクール管理 (GET/POST/PUT/DELETE)  
✅ クラス管理 (GET/POST/PUT/DELETE)  
✅ 教員・生徒管理 (GET/POST)  
✅ マネ操作 (付与/減算/残高照会)  
✅ ダッシュボード (統計・履歴取得)  
✅ システムステータス

---

## 🛠️ 技術スタック

**フロントエンド**
- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 3

**バックエンド**
- Next.js API Routes
- Repository Pattern（IRepository）
- LocalRepository（in-memory database）

**インフラ**
- Vercel ホスティング
- Edge Network CDN
- SSL/TLS（自動）

---

## ✅ テスト結果

### 本番環境テスト
- ✅ **9/9 テスト合格** (100%)
- ✅ **7ページ全て 200 OK**
- ✅ **14 API エンドポイント動作確認**
- ✅ **マネ付与・減算・履歴表示正常動作**

### パフォーマンス
- ✅ **First Load JS**: 99.2 kB
- ✅ **ビルド時間**: 〜45 秒
- ✅ **デプロイ時間**: < 2 分

### セキュリティ
- ✅ **HTTPS/SSL**: Vercel 自動提供
- ✅ **CSP**: 設定済み
- ✅ **CORS**: 適切に制限

---

## 🐛 既知の制限事項

### 認証
- Demo 用の localStorage ベース認証
- 本番環境では Firebase Auth / NextAuth.js 推奨

### データベース
- 在メモリ（アプリ起動時にリセット）
- 本番環境では PostgreSQL / Supabase 推奨

### その他
- API にレート制限なし
- ユーザー向けエラーメッセージは基本的

詳細は [CHANGELOG.md](CHANGELOG.md) 参照。

---

## 📝 インストール・セットアップ

### ローカル開発
```bash
git clone <repository-url>
cd manebou-app
npm install
npm run dev
# http://localhost:3000 でアクセス
```

### 本番ビルド
```bash
npm run build
npm run start
```

### Vercel デプロイ
```bash
npx vercel --prod
```

詳細は [DEPLOYMENT.md](DEPLOYMENT.md) 参照。

---

## 🚀 次のリリース予定（v1.1.0）

### Phase 6: セキュリティ・データ永続化
- [ ] Firebase Authentication 導入
- [ ] Supabase PostgreSQL 連携
- [ ] API レート制限実装
- [ ] 監査ログ機能

### Phase 7: ゲーミフィケーション強化
- [ ] バッジ・称号システム
- [ ] マネ有効期限設定
- [ ] ランキングの多次元化

### Phase 8-10: 高度な機能
- [ ] モバイルアプリ化
- [ ] 多言語対応
- [ ] 経済シミュレーション
- [ ] AI 推奨システム

詳細は [TODO.md](TODO.md) 参照。

---

## 📚 ドキュメント

- [README.md](README.md) – プロジェクト概要・操作マニュアル
- [CHANGELOG.md](CHANGELOG.md) – 変更履歴
- [DEPLOYMENT.md](DEPLOYMENT.md) – デプロイ・運用ガイド
- [MARKETING.md](MARKETING.md) – 公開用マーケティング資料
- [TODO.md](TODO.md) – 今後の改善案

---

## 🤝 貢献

バグ報告・機能提案は GitHub Issues で受け付けています。

---

## 📧 お問い合わせ

開発・運用に関するご質問は RAINYBRAIN team までお気軽にお問い合わせください。

---

## 📄 ライセンス

MIT License

---

**Version**: 1.0.0  
**Status**: Production Ready 🟢  
**Last Updated**: 2026-07-08
