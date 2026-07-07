import { User } from '@/types/User'
import { Student } from '@/types/Student'
import { Teacher } from '@/types/Teacher'
import { School } from '@/types/School'
import { Class } from '@/types/Class'
import { Transaction } from '@/types/Transaction'

export interface LocalDatabase {
  users: User[]
  schools: School[]
  classes: Class[]
  transactions: Transaction[]
}

let db: LocalDatabase = {
  users: [
    {
      id: 'user-admin-001',
      email: 'admin@school.jp',
      fullName: '管理者太郎',
      role: 'admin',
      schoolId: 'school-001',
      moneyBalance: 10000,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'user-teacher-001',
      email: 'teacher@school.jp',
      fullName: '先生太郎',
      role: 'teacher',
      schoolId: 'school-001',
      moneyBalance: 5000,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'user-teacher-002',
      email: 'teacher2@school.jp',
      fullName: '先生花子',
      role: 'teacher',
      schoolId: 'school-002',
      moneyBalance: 4000,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'student-001',
      email: 'student1@school.jp',
      fullName: '田中花子',
      role: 'student',
      schoolId: 'school-001',
      classId: 'class-1a',
      moneyBalance: 1000,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'student-002',
      email: 'student2@school.jp',
      fullName: '佐藤太郎',
      role: 'student',
      schoolId: 'school-001',
      classId: 'class-1a',
      moneyBalance: 1500,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'student-003',
      email: 'student3@school.jp',
      fullName: '山田次郎',
      role: 'student',
      schoolId: 'school-001',
      classId: 'class-1b',
      moneyBalance: 800,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
  ],
  schools: [
    {
      id: 'school-001',
      name: 'サンプル小学校',
      code: 'SAMPLE001',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'school-002',
      name: 'サンプル中学校',
      code: 'SAMPLE002',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
  ],
  classes: [
    {
      id: 'class-1a',
      schoolId: 'school-001',
      name: '1年A組',
      code: 'CLASS-1A',
      teacherId: 'user-teacher-001',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'class-1b',
      schoolId: 'school-001',
      name: '1年B組',
      code: 'CLASS-1B',
      teacherId: 'user-teacher-001',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'class-2a',
      schoolId: 'school-002',
      name: '2年A組',
      code: 'CLASS-2A',
      teacherId: 'user-teacher-002',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
  ],
  transactions: [
    {
      id: 'tx-001',
      userId: 'student-001',
      schoolId: 'school-001',
      amount: 100,
      reason: 'homework',
      memo: '宿題完了',
      teacherId: 'user-teacher-001',
      createdAt: '2026-07-01T10:00:00Z',
    },
    {
      id: 'tx-002',
      userId: 'student-002',
      schoolId: 'school-001',
      amount: -50,
      reason: 'penalty',
      memo: '遅刻',
      teacherId: 'user-teacher-001',
      createdAt: '2026-07-02T14:30:00Z',
    },
    {
      id: 'tx-003',
      userId: 'student-003',
      schoolId: 'school-001',
      amount: 200,
      reason: 'achievement',
      memo: 'テスト100点',
      teacherId: 'user-teacher-001',
      createdAt: '2026-07-03T09:15:00Z',
    },
  ],
}

export function getDatabase(): LocalDatabase {
  return db
}

export function resetDatabase(): void {
  // Reset to initial state
  db.users = db.users.slice(0, 6)
  db.schools = db.schools.slice(0, 2)
  db.classes = db.classes.slice(0, 3)
  db.transactions = db.transactions.slice(0, 3)
}
