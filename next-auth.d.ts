declare module 'next-auth' {
  import { AuthUser } from './types/user'
  interface Session {
    user: AuthUser
  }
}
