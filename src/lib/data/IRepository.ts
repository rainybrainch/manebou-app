import { User } from '@/types/User'
import { Student } from '@/types/Student'
import { Teacher } from '@/types/Teacher'
import { School } from '@/types/School'
import { Class } from '@/types/Class'
import { Transaction, CreateTransactionInput } from '@/types/Transaction'

export interface IRepository {
  // User operations
  getUser(id: string): User | undefined
  getUsersBySchool(schoolId: string): User[]
  getStudentsBySchool(schoolId: string): Student[]
  getStudentsByClass(classId: string): Student[]
  getTeachersBySchool(schoolId: string): Teacher[]
  updateUserBalance(userId: string, amount: number): User | undefined
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User
  updateUser(id: string, user: Partial<User>): User | undefined
  deleteUser(id: string): boolean

  // Transaction operations
  getMoneyLogs(userId: string): Transaction[]
  getMoneyLogsBySchool(schoolId: string): Transaction[]
  getMoneyLogsByDate(startDate: string, endDate: string): Transaction[]
  addMoneyLog(log: CreateTransactionInput): Transaction

  // School operations
  getSchool(id: string): School | undefined
  getSchools(): School[]
  createSchool(school: Omit<School, 'id' | 'createdAt' | 'updatedAt'>): School
  updateSchool(id: string, school: Partial<School>): School | undefined
  deleteSchool(id: string): boolean
  getSchoolStats(schoolId: string): { studentCount: number; teacherCount: number; classCount: number }

  // Class operations
  getClass(id: string): Class | undefined
  getClassesBySchool(schoolId: string): Class[]
  createClass(classData: Omit<Class, 'id' | 'createdAt' | 'updatedAt'>): Class
  updateClass(id: string, classData: Partial<Class>): Class | undefined
  deleteClass(id: string): boolean
  getClassStats(classId: string): { studentCount: number }
}
