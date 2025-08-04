export interface UserRepoInterface {
  createUser(data: any): Promise<any>
  findUserByEmail(email: string): Promise<any | null>
  findUserById(id: string): Promise<any | null>
  updateUser(userId: string, data: any): Promise<void>
  deleteUser(userId: string): Promise<void>
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>
}
