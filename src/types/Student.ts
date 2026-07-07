import { User } from './User'

export interface Student extends User {
  role: 'student'
  classId: string
}
