export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export const validateAmount = (amount: number): void => {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new ValidationError('金額は正の整数である必要があります')
  }
  if (amount > 1000000) {
    throw new ValidationError('金額が大きすぎます')
  }
}

export const validateUserId = (userId: string): void => {
  if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
    throw new ValidationError('ユーザーIDが無効です')
  }
}

export const validateReason = (reason: string): void => {
  if (!reason || typeof reason !== 'string' || reason.trim().length === 0) {
    throw new ValidationError('理由を入力してください')
  }
  if (reason.length > 100) {
    throw new ValidationError('理由は100文字以下である必要があります')
  }
}

export const validateBalance = (balance: number, amount: number): void => {
  if (balance - amount < 0) {
    throw new ValidationError('残高不足です')
  }
}

export const validateUserExists = (user: unknown): void => {
  if (!user) {
    throw new ValidationError('ユーザーが見つかりません')
  }
}

export const validateEmail = (email: string): void => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new ValidationError('メールアドレスの形式が無効です')
  }
}

export const validateFullName = (fullName: string): void => {
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
    throw new ValidationError('名前を入力してください')
  }
  if (fullName.length > 100) {
    throw new ValidationError('名前は100文字以下である必要があります')
  }
}

export const validateSchoolId = (schoolId: string): void => {
  if (!schoolId || typeof schoolId !== 'string' || schoolId.trim().length === 0) {
    throw new ValidationError('学校IDが無効です')
  }
}

export const validateSchoolName = (name: string): void => {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new ValidationError('学校名を入力してください')
  }
  if (name.length > 100) {
    throw new ValidationError('学校名は100文字以下である必要があります')
  }
}

export const validateSchoolCode = (code: string): void => {
  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    throw new ValidationError('学校コードを入力してください')
  }
  if (code.length > 20) {
    throw new ValidationError('学校コードは20文字以下である必要があります')
  }
}

export const validateClassName = (name: string): void => {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new ValidationError('クラス名を入力してください')
  }
  if (name.length > 50) {
    throw new ValidationError('クラス名は50文字以下である必要があります')
  }
}

export const validateClassCode = (code: string): void => {
  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    throw new ValidationError('クラスコードを入力してください')
  }
  if (code.length > 20) {
    throw new ValidationError('クラスコードは20文字以下である必要があります')
  }
}

export const validateUserRole = (role: unknown): void => {
  if (!['admin', 'teacher', 'student'].includes(String(role))) {
    throw new ValidationError('無効なユーザーロールです')
  }
}

export const validatePermission = (userRole: string, requiredRole: string[]): void => {
  if (!requiredRole.includes(userRole)) {
    throw new ValidationError('この操作を実行する権限がありません')
  }
}
