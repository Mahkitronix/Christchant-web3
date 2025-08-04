import { NextApiRequest, NextApiResponse } from 'next'
import withCors from '@middleware/server/withCors'
import { validateRequest } from '@/utils/api/validation'
import { apiLoginSchema } from '@/utils/validations/zod/auth.schema'
import ServiceRepo from '@/https/repository/Service'
// import { generateToken } from '@/utils/auth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const serviceRepo = new ServiceRepo()

  try {
    const validation = validateRequest(apiLoginSchema, req.body)
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.errors.map((error) => ({
          field: error.field,
          message: error.message[0],
        })),
      })
    }

    const { email, password } = validation.data

    const user = await serviceRepo.userRepo.findUserByEmail(email)

    if (!user) {
      return res.status(401).json({
        success: false,
        errors: [
          {
            field: 'email',
            message: 'User is not registered or has been deleted.',
          },
        ],
      })
    }

    if (!user.isActivated) {
      return res.status(403).json({
        success: false,
        errors: [
          {
            field: 'email',
            message: 'User is not activated.',
          },
        ],
      })
    }

    const isValidPassword = await serviceRepo.userRepo.verifyPassword(
      password,
      user.password
    )
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        errors: [
          {
            field: 'password',
            message: 'Incorrect password',
          },
        ],
      })
    }

    res.status(200).json({
      data: {
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isVerified: user.isVerified,
          userType: user.userType,
        },
        token: 'token',
      },
      success: true,
      message: 'Login successful',
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: [
        {
          field: 'general',
          message: error instanceof Error ? error.message : 'Login failed',
        },
      ],
    })
  }
}

export default withCors(handler)
