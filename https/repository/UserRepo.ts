import { UserRepoInterface } from '@/https/repository-interface/UserRepoInterface'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

class UserRepo implements UserRepoInterface {
  async createUser(data: any): Promise<any> {
    return await prisma.user.create({ data })
  }

  async findUserByEmail(email: string): Promise<any | null> {
    return await prisma.user.findUnique({
      where: { email },
    })
  }

  async findUserById(id: string): Promise<any | null> {
    return await prisma.user.findUnique({ where: { id: Number(id) } })
  }

  async updateUser(userId: string, data: any): Promise<void> {
    await prisma.user.update({
      where: { id: Number(userId) },
      data,
    })
  }

  async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({ where: { id: Number(userId) } })
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compareSync(password, hashedPassword)
  }
}

export default UserRepo
