# マネぼう バックアップ・復旧ガイド

## 💾 バックアップ体制

このドキュメントは、マネぼうのデータバックアップと復旧手順書です。

---

## 🔄 開発環境（ローカル）

### バックアップ対象

| 対象 | 保存場所 | 頻度 |
|------|---------|------|
| **ソースコード** | GitHub | 毎回コミット時 |
| **package.json** | GitHub | 毎回更新時 |
| **.env.local** | ローカルのみ | 手動 |
| **node_modules** | GitHub 対象外 | 不要（npm install で再構築） |

### GitHub バックアップ

```bash
# ローカル変更を確認
git status

# 変更をステージング
git add -A

# コミット作成
git commit -m "メッセージ"

# GitHub に push
git push origin master
```

### 環境変数バックアップ

```bash
# .env.local をバックアップ
cp .env.local .env.local.backup.$(date +%Y%m%d_%H%M%S)
```

---

## 🌐 本番環境（Vercel）

### 自動バックアップ

Vercel は以下を自動でバックアップ:

1. **ソースコード**: GitHub → Vercel（自動同期）
2. **デプロイログ**: Vercel ダッシュボード（30日間保持）
3. **環境変数**: Vercel Project Settings

### 手動バックアップ

```bash
# 環境変数をダウンロード
vercel env pull

# .env.local に保存される
# これを安全に保管
```

---

## 📊 データベース（将来実装）

本番環境では以下のバックアップが予定されています：

### 自動バックアップスケジュール

| 対象 | 頻度 | 保持期間 |
|------|------|---------|
| **日次バックアップ** | 毎日 00:00 UTC | 7日間 |
| **週次バックアップ** | 毎週日曜 00:00 UTC | 4週間 |
| **月次バックアップ** | 毎月1日 00:00 UTC | 12ヶ月 |

### バックアップストレージ

- プライマリ: AWS S3
- セカンダリ: クラウドストレージ（地理的分散）

---

## 🔧 復旧手順

### シナリオ1: ローカル開発環境の復旧

```bash
# GitHub から最新コードをクローン
git clone https://github.com/rainybrainch/manebou-app.git
cd manebou-app

# 依存ライブラリを再インストール
npm install

# 環境変数を復元
# .env.local.backup をコピー
cp .env.local.backup .env.local

# 開発サーバーを起動
npm run dev
```

### シナリオ2: 本番環境のロールバック

```bash
# 前のバージョンにロールバック
git revert <commit-hash>

# 変更を GitHub に push
git push origin master

# Vercel が自動でデプロイ
# → ロールバック完了
```

### シナリオ3: 環境変数の復旧

```bash
# Vercel から環境変数をダウンロード
vercel env pull

# 復旧確認
cat .env.local
```

---

## ✅ バックアップ確認チェックリスト

毎月末に以下を確認:

- [ ] GitHub に最新コードが push されている
- [ ] コミットログに意味のあるメッセージが記録されている
- [ ] 重要な変更に対してタグが付与されている
- [ ] Vercel デプロイログが正常終了している
- [ ] 環境変数が Vercel に保存されている
- [ ] .env.local.backup が存在する

---

## 🚨 災害時対応

### 本番環境が完全に失われた場合

1. **コードの復旧**
   ```bash
   git clone https://github.com/rainybrainch/manebou-app.git
   cd manebou-app
   npm install
   ```

2. **環境変数の復旧**
   - Vercel Project Settings から環境変数を取得
   - または .env.local.backup から復旧

3. **Vercel へのデプロイ**
   ```bash
   npm run build
   npx vercel --prod
   ```

4. **DNS 設定の確認**
   - manebou-app.vercel.app が正しく解決されるか確認

5. **動作確認**
   - ログイン → ダッシュボード表示 → マネ操作 → ランキング確認

---

## 📋 バックアップ記録

### テンプレート

```markdown
## バックアップ記録 - YYYY-MM-DD

- 実施者: [名前]
- 実施日時: [YYYY-MM-DD HH:MM:SS UTC]
- バックアップ対象: [ソースコード / 環境変数 / その他]
- バックアップサイズ: [XXX MB]
- 保存場所: [GitHub / Vercel / S3]
- 復旧テスト: [成功 / 失敗]
- 備考: [なし / 問題があれば記載]
```

---

## 🔐 バックアップセキュリティ

### 注意事項

- ❌ .env.local をコミットしない（.gitignore で除外済み）
- ❌ 認証キーをソースコードに含めない
- ✅ 環境変数は Vercel Project Settings で管理
- ✅ 定期的にアクセス権限を見直す

---

## 📞 バックアップ関連の問い合わせ

問題が発生した場合:
1. 管理者に連絡
2. GitHub Issues に報告
3. エスカレーション対応

