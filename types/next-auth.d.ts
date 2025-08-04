import 'next-auth'
import { DefaultSession } from 'next-auth'
import { UserRole, AdminRole } from './auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      userType: UserRole
      role?: AdminRole
      firstName: string
      lastName: string
      hasSellerEntity?: boolean
      isVerified: boolean
      status: 'active' | 'inactive' | 'suspended'
      accessToken?: string
    } & DefaultSession['user']
    accessToken?: string
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string
    userType: UserRole
    role?: AdminRole
    firstName: string
    lastName: string
    hasSellerEntity?: boolean
    isVerified: boolean
    status: 'active' | 'inactive' | 'suspended'
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    userType: UserRole
    role?: AdminRole
    firstName: string
    lastName: string
    hasSellerEntity?: boolean
    isVerified: boolean
    status: 'active' | 'inactive' | 'suspended'
    accessToken?: string
  }
}
