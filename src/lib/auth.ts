// localStorage ベースの認証ユーティリティ
// NextAuth は使用しない（Phase 1-3 で localStorage 認証に統一）

import { User } from '@/types/User'

export async function auth(): Promise<User | null> {
  // サーバーサイドでは localStorage が利用できないため、null を返す
  // クライアントサイドで localStorage を確認してください
  return null
}
