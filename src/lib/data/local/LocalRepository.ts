import { IRepository } from '../IRepository'
import { User } from '@/types/User'
import { Student } from '@/types/Student'
import { Teacher } from '@/types/Teacher'
import { School } from '@/types/School'
import { Class } from '@/types/Class'
import { Transaction, CreateTransactionInput } from '@/types/Transaction'
import { getDatabase } from '@/lib/localdb'

export class LocalRepository implements IRepository {
  private db = getDatabase()

  // User operations
  getUser(id: string): User | undefined {
    return this.db.users.find(u => u.id === id)
  }

  getUsersBySchool(schoolId: string): User[] {
    return this.db.users.filter(u => u.schoolId === schoolId)
  }

  getStudentsBySchool(schoolId: string): Student[] {
    return this.db.users.filter(u => u.schoolId === schoolId && u.role === 'student') as Student[]
  }

  getStudentsByClass(classId: string): Student[] {
    return this.db.users.filter(u => u.role === 'student' && (u as Student).classId === classId) as Student[]
  }

  getTeachersBySchool(schoolId: string): Teacher[] {
    return this.db.users.filter(u => u.schoolId === schoolId && (u.role === 'teacher' || u.role === 'admin')) as Teacher[]
  }

  updateUserBalance(userId: string, amount: number): User | undefined {
    const user = this.getUser(userId)
    if (!user) return undefined
    user.moneyBalance += amount
    user.updatedAt = new Date().toISOString()
    return user
  }

  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.db.users.push(newUser)
    return newUser
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.getUser(id)
    if (!user) return undefined
    Object.assign(user, updates, { updatedAt: new Date().toISOString() })
    return user
  }

  deleteUser(id: string): boolean {
    const index = this.db.users.findIndex(u => u.id === id)
    if (index === -1) return false
    this.db.users.splice(index, 1)
    return true
  }

  // Transaction operations
  getMoneyLogs(userId: string): Transaction[] {
    return this.db.transactions.filter(t => t.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  getMoneyLogsBySchool(schoolId: string): Transaction[] {
    return this.db.transactions.filter(t => t.schoolId === schoolId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  getMoneyLogsByDate(startDate: string, endDate: string): Transaction[] {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    return this.db.transactions.filter(t => {
      const time = new Date(t.createdAt).getTime()
      return time >= start && time <= end
    })
  }

  addMoneyLog(log: CreateTransactionInput): Transaction {
    const transaction: Transaction = {
      ...log,
      id: `tx-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    this.db.transactions.push(transaction)
    return transaction
  }

  // School operations
  getSchool(id: string): School | undefined {
    return this.db.schools.find(s => s.id === id)
  }

  getSchools(): School[] {
    return this.db.schools.map(school => ({
      ...school,
      ...this.getSchoolStats(school.id),
    }))
  }

  createSchool(school: Omit<School, 'id' | 'createdAt' | 'updatedAt'>): School {
    const newSchool: School = {
      ...school,
      id: `school-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.db.schools.push(newSchool)
    return newSchool
  }

  updateSchool(id: string, updates: Partial<School>): School | undefined {
    const school = this.getSchool(id)
    if (!school) return undefined
    Object.assign(school, updates, { updatedAt: new Date().toISOString() })
    return school
  }

  deleteSchool(id: string): boolean {
    const index = this.db.schools.findIndex(s => s.id === id)
    if (index === -1) return false
    this.db.schools.splice(index, 1)
    return true
  }

  getSchoolStats(schoolId: string): { studentCount: number; teacherCount: number; classCount: number } {
    return {
      studentCount: this.getStudentsBySchool(schoolId).length,
      teacherCount: this.getTeachersBySchool(schoolId).length,
      classCount: this.getClassesBySchool(schoolId).length,
    }
  }

  // Class operations
  getClass(id: string): Class | undefined {
    return this.db.classes.find(c => c.id === id)
  }

  getClassesBySchool(schoolId: string): Class[] {
    return this.db.classes.filter(c => c.schoolId === schoolId)
  }

  createClass(classData: Omit<Class, 'id' | 'createdAt' | 'updatedAt'>): Class {
    const newClass: Class = {
      ...classData,
      id: `class-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.db.classes.push(newClass)
    return newClass
  }

  updateClass(id: string, updates: Partial<Class>): Class | undefined {
    const classData = this.getClass(id)
    if (!classData) return undefined
    Object.assign(classData, updates, { updatedAt: new Date().toISOString() })
    return classData
  }

  deleteClass(id: string): boolean {
    const index = this.db.classes.findIndex(c => c.id === id)
    if (index === -1) return false
    this.db.classes.splice(index, 1)
    return true
  }

  getClassStats(classId: string): { studentCount: number } {
    return {
      studentCount: this.getStudentsByClass(classId).length,
    }
  }
}
