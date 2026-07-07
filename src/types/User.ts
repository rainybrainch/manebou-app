export type UserRole = 'admin' | 'teacher' | 'student'

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  schoolId: string
  classId?: string
  moneyBalance: number
  createdAt: string
  updatedAt: string
}
