export type UserRole = 'user' | 'admin' | 'superAdmin'

export interface AuthUser {
  email: string | null
  firstName: string | null
  lastName: string | null
  role: UserRole
  userType: UserRole
  isVerified?: boolean
  status?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  isVerified: boolean
  userType: UserRole
  createdAt: Date
  updatedAt: Date
  permissions: string[]
}
