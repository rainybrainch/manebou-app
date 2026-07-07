export interface School {
  id: string
  name: string
  code: string
  createdAt: string
  updatedAt: string
  studentCount?: number
  teacherCount?: number
  classCount?: number
  totalMoneyFlow?: number
}

export interface CreateSchoolInput {
  name: string
  code: string
}
