# 📦 デプロイ・運用ガイド

## 🚀 本番環境情報

| 項目 | 値 |
|---|---|
| **本番 URL** | https://manebou-app.vercel.app |
| **ホスティング** | Vercel |
| **リージョン** | 自動選択（最速） |
| **デプロイ方式** | Git 連携または Vercel CLI |
| **SSL/TLS** | 自動（Vercel 提供） |
| **CDN** | Vercel Edge Network |

## 🔧 デプロイ方法

### 方法 1: Vercel CLI（推奨）

#### インストール
```bash
npm install -g vercel
```

#### 認証
```bash
vercel login
# ブラウザでログイン → Vercel アカウント連携
```

#### デプロイ実行
```bash
cd /path/to/manebou-app
vercel --prod --yes --scope [your-scope]

# または（既にリンク済みの場合）
vercel --prod
```

#### 確認
```bash
# デプロイ状態確認
vercel --scope [your-scope]

# ログ確認
vercel logs
```

### 方法 2: GitHub リポジトリ連携（今後）

1. GitHub にリポジトリを作成
2. Vercel で「Import Git Repository」を選択
3. リポジトリを選択
4. 自動デプロイ設定完了
5. 以降、`git push` で自動デプロイ

### 方法 3: 手動ビルド・デプロイ

```bash
# 1. ビルド
npm run build

# 2. ビルド成果物の確認
ls -la .next/

# 3. Vercel にアップロード
vercel --prod --prebuilt
```

## ✅ デプロイ後の確認チェックリスト

### 1. ページアクセステスト
```bash
# ページが 200 OK で返却されるか確認
curl -I https://manebou-app.vercel.app/login
curl -I https://manebou-app.vercel.app/app/student/dashboard
curl -I https://manebou-app.vercel.app/api/schools
```

### 2. API テスト
```bash
# 各 API が JSON を返すか確認
curl https://manebou-app.vercel.app/api/schools
curl https://manebou-app.vercel.app/api/teachers
curl -X POST https://manebou-app.vercel.app/api/teacher/mane/grant \
  -H "Content-Type: application/json" \
  -d '{"studentId":"student-001","amount":100,"reason":"test"}'
```

### 3. ブラウザテスト
- [ ] ログインページが表示される
- [ ] デモユーザーでログインできる
- [ ] 学生ダッシュボードが表示される
- [ ] 先生ダッシュボードが表示される
- [ ] ランキングが表示される
- [ ] マネ付与・減算が動作する

### 4. パフォーマンステスト
- [ ] ページ読み込み時間が 3 秒以内
- [ ] API レスポンスが 500ms 以内
- [ ] First Contentful Paint（FCP）が 1 秒以内

## 📊 本番環境の監視

### Vercel ダッシュボード
1. https://vercel.com/dashboard にアクセス
2. 「manebou-app」プロジェクトを選択
3. **Analytics** タブで以下を確認：
   - ページビュー数
   - 平均応答時間
   - エラー率
   - 地理的分布

### ログ確認
```bash
# リアルタイムログ表示
vercel logs --follow

# エラーログのみ
vercel logs --type error
```

### アラート設定
Vercel ダッシュボード → Settings → Integrations で以下を設定：
- 200+ ステータスコードでのアラート（エラー通知）
- デプロイ失敗時の通知
- パフォーマンス低下時の通知

## 🔄 ローリングアップデート

### 安全なアップデート手順

```bash
# 1. ローカルで変更・テスト
npm run dev
npm run build
npm test  # テストがあれば実行

# 2. コミット
git add .
git commit -m "Update: feature description"
git push origin main

# 3. 本番デプロイ（自動 or 手動）
vercel --prod

# 4. 本番環境でテスト
# （上記の確認チェックリスト参照）
```

### ロールバック手順

デプロイ後に問題が発生した場合：

```bash
# 前のバージョンにロールバック
vercel --prod --clone [previous-deployment-id]

# または Vercel ダッシュボードで：
# Deployments → 前のバージョン → Redeploy
```

## 🔐 環境変数管理

### ローカル開発
`.env.local` ファイルを作成：
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=マネぼう
```

### Vercel 本番環境
```bash
# Vercel ダッシュボード → Settings → Environment Variables
# または CLI で：
vercel env add NEXT_PUBLIC_API_URL https://manebou-app.vercel.app
```

## 📈 スケーリング

### ユーザー増加対応

| ユーザー数 | 対応内容 |
|---|---|
| 〜100 | 現在の構成で十分 |
| 100-1000 | キャッシング導入検討 |
| 1000+ | データベース最適化・CDN 強化 |

### 実装順序
1. **キャッシング** – Redis キャッシュ層導入
2. **データベース** – Supabase PostgreSQL に移行
3. **API 最適化** – GraphQL 導入検討

## 🆘 トラブルシューティング

### 問題: デプロイ失敗

```bash
# 1. ログ確認
vercel logs

# 2. ローカルビルドテスト
npm run build

# 3. 依存関係確認
npm ci

# 4. キャッシュクリア
vercel env ls
rm -rf .next
npm run build
```

### 問題: ページが 404

- ルートが正しく定義されているか確認
- `app/` ディレクトリの構造を確認
- ビルドログで `✓ Compiled successfully` を確認

### 問題: API が 500 エラー

- Vercel ログでエラーメッセージ確認
- ローカルで同じ操作をテスト
- データベース接続確認（将来の実装時）

### 問題: 遅い応答時間

```bash
# 1. Vercel Analytics で確認
# Deployments → Analytics

# 2. Chrome DevTools で計測
# Network タブで各リソースの読み込み時間確認

# 3. 以下を実施
- キャッシュ戦略の見直し
- 画像・JS の最適化
- サーバーのリージョン変更検討
```

## 📝 デプロイ記録テンプレート

本番にデプロイする際、以下を記録：

```
デプロイ日時: 2026-07-08 14:30 JST
デプロイ者: [Your Name]
変更内容: [Feature/Fix Description]
関連 Commit: a66a7e1
Vercel URL: https://manebou-app.vercel.app
デプロイ時間: 45 秒
テスト結果: ✅ 合格
リスク評価: 🟢 低
ロールバック計画: なし
```

## 🚨 本番環境のセキュリティ対策

### 実装済み
- ✅ HTTPS/SSL
- ✅ CSP（Content Security Policy）設定
- ✅ CORS 制限

### 実装予定
- [ ] RATE_LIMIT 導入
- [ ] WAF（Web Application Firewall）
- [ ] DDoS 対策
- [ ] セキュリティヘッダー強化

## 📞 本番環境での問題報告

### 報告手順
1. 問題の詳細を記述
2. スクリーンショット・ビデオ撮影
3. GitHub Issues で報告（または管理者に連絡）
4. 優先度を設定（Critical/High/Medium/Low）

### 報告テンプレート
```
【タイトル】問題の簡潔な説明

【現象】何が起きたのか
【期待】何が起きるべきだったのか
【再現手順】
1. ...
2. ...
3. ...

【環境】
- ブラウザ: Chrome 120
- デバイス: Windows 11
- 時刻: 2026-07-08 14:30 JST

【スクリーンショット】
```

---

**Last Updated**: 2026-07-08  
**Version**: 1.0.0
