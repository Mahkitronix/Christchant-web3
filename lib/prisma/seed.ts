import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create a super-user
  const superAdmin = await prisma.user.create({
    data: {
      firstName: 'Super',
      lastName: 'Admin',
      username: 'superadmin',
      email: 'superadmin@christchant.com',
      password: await bcrypt.hash('james123', 10),
      isActivated: true,
      userType: 'superAdmin',
    } as any,
  })

  // Create a regular user
  const user = await prisma.user.create({
    data: {
      firstName: 'Gwapito',
      lastName: 'Dev',
      username: 'devgwapito',
      email: 'devgwapito@gmail.com',
      password: await bcrypt.hash('james123', 10),
      isActivated: true,
      userType: 'user',
    } as any,
  })

  console.log({ superAdmin, user })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
