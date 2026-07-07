export interface Transaction {
  id: string
  userId: string
  schoolId: string
  amount: number
  reason: string
  memo?: string | null
  teacherId: string
  createdAt: string
}

export interface CreateTransactionInput {
  userId: string
  schoolId: string
  amount: number
  reason: string
  memo?: string | null
  teacherId: string
}
