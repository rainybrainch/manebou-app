# マネぼう バグ報告テンプレート

## 🐛 バグ報告について

マネぼうのバグを発見された場合、このテンプレートを使用して報告してください。

**報告先**: https://github.com/rainybrainch/manebou-app/issues

---

## 📝 バグ報告フォーマット

### タイトル

```
【優先度】【ページ】簡潔なバグ説明

例:
🔴 【学生ダッシュボード】ログイン後にエラーが表示される
🟡 【マネ付与】成功メッセージが重複して表示される
```

### 本文

```markdown
## 【発生日】
2026-07-08 14:30 UTC

## 【ユーザーロール】
☑ 学生 / ☐ 先生 / ☐ 管理者 / ☐ その他

## 【デバイス・環境】
- OS: Windows 11 / macOS 13 / iOS / Android
- ブラウザ: Chrome 最新版 / Safari 最新版 / Firefox 最新版
- URL: [問題が発生したページ]
  例: https://manebou-app.vercel.app/app/student/dashboard

## 【再現手順】

1. [ステップ1]
2. [ステップ2]
3. [ステップ3]
4. [ステップ4（問題が発生）]

### 例:
1. 学生アカウント（student1@school.jp）でログイン
2. ダッシュボードが表示される
3. 「マネ履歴」ボタンをクリック
4. ❌ エラーメッセージが表示される

## 【期待動作】

アプリが通常通り動作すること。
例: マネ履歴ページが正常に表示されるべき

## 【実際の動作】

実際に起こっている問題を詳しく説明してください。
例: "Error: Cannot read property 'role' of undefined" というメッセージが表示される

## 【重要度】

☑ 🔴 Critical（アプリがクラッシュ・全く使えない）
☐ 🟠 High（主要機能が動作しない）
☐ 🟡 Medium（一部動作がおかしい）
☐ 🟢 Low（UI のみの問題・軽微）

## 【スクリーンショット】

[あれば添付]

ブラウザの開発者ツール（F12）で撮影してください。

## 【Console エラー】

ブラウザの開発者ツール → Console タブでエラーメッセージがあれば、
全文をコピー＆ペーストしてください。

例:
```
TypeError: Cannot read property 'role' of undefined
    at studentDashboard (app/app/student/dashboard/page.tsx:44:15)
    at processRequest (node_modules/next/dist/server/lib/utils.ts:...)
```

## 【Network エラー】

ブラウザの開発者ツール → Network タブで赤色（失敗）の API リクエストがあれば、
クリックしてレスポンスを確認してください。

例:
```
GET /api/student/dashboard
Status: 500 Internal Server Error
Response: {"error": "Database connection failed"}
```

## 【試したこと】

既に試した対応策があれば記載してください。

例:
- ☑ ブラウザをリロードした（改善なし）
- ☑ キャッシュをクリアした（改善なし）
- ☑ 別のブラウザで試した（同じ問題が発生）

## 【対応状況】

*このセクションは管理者が入力します*

- 受け取り日: 
- 優先度: 
- 担当者: @username
- 対応期限: 
- 対応状況: 対応中 / 対応完了 / 見送り
- 対応内容: 
- リリース版: v1.0.1 / v1.1.0 / その他

---

## 📋 チェックリスト

報告する前に確認してください：

- [ ] 既出のバグでないか確認した（Issues を検索）
- [ ] 再現手順を正確に記載した
- [ ] スクリーンショットまたはビデオを添付した
- [ ] Console エラーがあれば記載した
- [ ] 環境情報（OS・ブラウザ）を記載した
- [ ] 重要度を選択した
- [ ] 敬語で丁寧に記載した

---

## 📞 バグ報告の例

### 例1: Critical

```markdown
## 【発生日】
2026-07-08 15:00 UTC

## 【ユーザーロール】
☑ 学生

## 【デバイス・環境】
- OS: Windows 11
- ブラウザ: Chrome 最新版
- URL: https://manebou-app.vercel.app/login

## 【再現手順】
1. ログインページにアクセス
2. 学生用メールアドレス（student1@school.jp）を入力
3. ログインボタンをクリック
4. ❌ ページが真っ白になり、何も表示されない

## 【期待動作】
ダッシュボードが表示される

## 【実際の動作】
ページが真っ白で、操作不可

## 【重要度】
☑ 🔴 Critical

## 【Console エラー】
Error: Cannot find module '@/lib/data/repository'
```

### 例2: Low

```markdown
## 【発生日】
2026-07-08 16:30 UTC

## 【ユーザーロール】
☐ 学生 ☑ 先生

## 【デバイス・環境】
- OS: macOS 13
- ブラウザ: Safari 最新版
- URL: https://manebou-app.vercel.app/app/teacher/students

## 【再現手順】
1. 先生アカウントでログイン
2. 生徒一覧ページを開く
3. 検索欄に「田」と入力
4. 検索結果の名前の右端が少し切れる

## 【期待動作】
全 名前が正常に表示される

## 【実際の動作】
名前の最後の1文字が右端で切れて表示されない

## 【重要度】
☐ 🔴 Critical
☐ 🟠 High
☐ 🟡 Medium
☑ 🟢 Low

## 【スクリーンショット】
[添付]
```

---

## ✅ 報告後

- GitHub が自動でラベル・優先度を追加します
- 24 時間以内に「受け取り確認」コメントが付きます
- 進捗は GitHub Issue で確認できます

---

## 📞 報告ができない場合

GitHub アカウントがない場合は、以下の方法でご連絡ください：

- メール: [サポートメール]
- チャット: [チャットURL]

