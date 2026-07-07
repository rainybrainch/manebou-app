export interface Class {
  id: string
  schoolId: string
  name: string
  code: string
  teacherId?: string
  createdAt: string
  updatedAt: string
  studentCount?: number
  teacherName?: string
}

export interface CreateClassInput {
  schoolId: string
  name: string
  code: string
  teacherId?: string
}
