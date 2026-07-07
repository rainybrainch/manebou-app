import { User } from './User'

export interface Teacher extends User {
  role: 'teacher' | 'admin'
}
