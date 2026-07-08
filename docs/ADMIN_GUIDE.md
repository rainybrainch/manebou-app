# マネぼう 運営者ガイド

## 📋 運営者向けドキュメント

このガイドは、マネぼう管理者向けの運用手順書です。

---

## 🔧 環境設定

### 1. ローカル開発環境のセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/rainybrainch/manebou-app.git
cd manebou-app

# 依存ライブラリをインストール
npm install

# 環境変数を設定
cp .env.example .env.local
```

### 2. 環境変数

`.env.local` に以下を設定:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリが立ち上がります。

---

## 🚀 デプロイ

### Vercel へのデプロイ

1. **自動デプロイ**
   - `master` ブランチに push されると自動的に本番環境にデプロイされます
   - Vercel ダッシュボード: https://vercel.com/projects

2. **手動デプロイ**
   ```bash
   npm run build
   npx vercel --prod
   ```

3. **デプロイ状態確認**
   ```bash
   curl -I https://manebou-app.vercel.app
   ```
   → `HTTP 200 OK` が返っていればデプロイ成功

---

## 💾 バックアップ・復旧

### GitHub バックアップ

すべてのコード変更は GitHub に自動保存されます。

```bash
# ローカルの最新状態を確認
git status

# 変更を GitHub に push
git push origin master
```

### ローカルデータベース（開発環境）

LocalRepository により、メモリ上のデータが保存されます。  
本番環境ではデータベースへの移行が必要です。

---

## 🔍 監視・ログ

### Vercel ダッシュボード

- **デプロイログ**: https://vercel.com/fukuisho0603-makers-projects/manebou-app
- **エラーログ**: ダッシュボード → Analytics
- **パフォーマンス**: ダッシュボード → Monitoring

### Console ログ（ブラウザ）

本番環境で問題が発生した場合：

1. ブラウザの開発者ツール（F12）を開く
2. Console タブでエラーを確認
3. Network タブで API エラーを確認

---

## 🔐 セキュリティ

### デモユーザー認証

現在、マネぼうはデモユーザーで固定認証されています。

**本番運用に向けた実装予定:**
- ✅ OAuth / OIDC 認証
- ✅ 暗号化パスワード管理
- ✅ セッション管理
- ✅ ロールベースアクセス制御（RBAC）

### 本番環境での認証

v1.1.0 以降で実装予定です。KNOWN_ISSUES.md を参照。

---

## 📊 ユーザー管理

### ユーザー情報

```javascript
// ブラウザの localStorage に保存（デモ環境）
{
  "id": "student-001",
  "email": "student1@school.jp",
  "fullName": "田中花子",
  "role": "student", // student / teacher / admin
  "schoolId": "school-001",
  "classId": "class-1a",
  "moneyBalance": 1000
}
```

### ロール管理

| ロール | 権限 |
|--------|------|
| **student** | ダッシュボード・マネ履歴・ランキング表示 |
| **teacher** | 生徒管理・マネ付与・マネ回収 |
| **admin** | 全機能アクセス可能 |

---

## 🛠️ トラブルシューティング

### 問題: ログイン後、ダッシュボードが表示されない

**原因**: localStorage がクリアされている

**解決方法**:
1. ブラウザをリロード（Ctrl+R）
2. キャッシュをクリア（Ctrl+Shift+Delete）
3. 再度ログイン

### 問題: API エラーが表示される

**原因**: バックエンド API が応答していない

**解決方法**:
1. Vercel ダッシュボードでステータス確認
2. Console でエラーメッセージを確認
3. 管理者に連絡

---

## 📈 パフォーマンス監視

### 目標指標

| 指標 | 目標 | 現在 |
|------|------|------|
| FCP | < 1.8s | 0.4～0.8s ✅ |
| API応答 | < 500ms | < 100ms ✅ |
| Console Error | 0個 | 0個 ✅ |

### 改善アクション

パフォーマンスが低下した場合:

1. Vercel Analytics を確認
2. Network タブで遅い API を特定
3. コード最適化を実施
4. 変更を推し進める

---

## 📞 連絡先

問題が発生した場合は GitHub Issues に報告してください。

