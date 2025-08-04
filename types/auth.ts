export interface ApiResponse<T = any> {
  role: any
  lastName: string
  firstName: string
  id: string
  token: string
  success: boolean
  message?: string
  data?: T
}

export type UserRole = 'user'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isVerified: boolean
  status: 'active' | 'inactive' | 'suspended'
}

export interface AuthState {
  token: string | null
  isAuthenticated: boolean
  user: Partial<AuthUser> | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  data: any
  user?:
    | Partial<{
        role: string
        userType?: string
        email: string | null
        firstName: string | null
        lastName: string | null
        hasSellerEntity?: boolean
      }>
    | AuthUser
  token?: string
  success: boolean
  message?: string
}

export interface ResetPasswordResponse {
  success: boolean
  message: string
  errors?: Array<{ field: string; message: string[] }>
}

export interface ApiError {
  field: string
  message: string
}

export interface ApiErrorResponse {
  success: boolean
  errors: ApiError[]
  message?: string
}

export interface UseAuthOptions {
  redirectTo?: string
  requireVerified?: boolean
  requireActive?: boolean
}
